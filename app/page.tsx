"use client"

import { useState, useEffect } from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { getQuestions, validateAnswer } from "@/app/actions"

export default function QuizBoxes() {
  interface Question {
    id: number;
    question: string;
  }

  interface Box {
    id: number;
    questions: Question[];
  }

  const [boxes, setBoxes] = useState<Box[]>([])
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{ [key: string]: string }>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("answers") || "{}")
    }
    return {}
  })
  const [feedback, setFeedback] = useState<{ [key: string]: boolean | null }>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("feedback") || "{}")
    }
    return {}
  })
  const [unlockedBoxes, setUnlockedBoxes] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("unlockedBoxes") || "[]")
    }
    return []
  })

  useEffect(() => {
    getQuestions().then(data => setBoxes(data))
  }, [])

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback))
  }, [feedback])

  useEffect(() => {
    localStorage.setItem("unlockedBoxes", JSON.stringify(unlockedBoxes))
  }, [unlockedBoxes])

  const handleBoxSelect = (boxId: number) => {
    if (selectedBox === null || isBoxCompleted(selectedBox) || isMCQBox(selectedBox)) {
      setSelectedBox(boxId)
    }
  }

  const handleAnswerChange = (boxId: number, questionId: number, value: string) => {
    const key = `${boxId}-${questionId}`
    setAnswers({ ...answers, [key]: value })
  }

  const handleSubmit = async (boxId: number, questionId: number) => {
    const key = `${boxId}-${questionId}`
    const userAnswer = answers[key]

    const { isCorrect } = await validateAnswer(boxId, questionId, userAnswer)
    const newFeedback = { ...feedback, [key]: isCorrect }
    setFeedback(newFeedback)

    if (isCorrect || isMCQBox(boxId)) {
      if (!unlockedBoxes.includes(boxId)) {
        setUnlockedBoxes([...unlockedBoxes, boxId])
      }
    }
  }

  const isBoxCompleted = (boxId: number) => {
    return feedback[`${boxId}-1`] === true
  }

  const isMCQBox = (boxId: number) => {
    return boxId >= 6 && boxId <= 10
  }

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Phantom Hunt</h1>
        <p className="text-center mb-8 text-gray-700">
          Unlock the mysteries of the phantom realm. Each box contains clues - answer correctly to progress on your hunt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {boxes.map((box) => {
            const isSelected = selectedBox === box.id
            const isUnlocked = unlockedBoxes.includes(box.id) || selectedBox === box.id || selectedBox === null
            const isCompleted = isBoxCompleted(box.id)

            return (
              <Card
                key={box.id}
                className={`relative p-6 border-2 transition-all duration-300 cursor-pointer h-full
                  ${isSelected ? "border-black shadow-lg col-span-full" : "border-gray-200"}
                  ${!isUnlocked && !isCompleted && selectedBox !== null ? "opacity-50" : ""}
                  ${isCompleted ? "bg-gray-50" : "bg-white"}
                `}
                onClick={() => handleBoxSelect(box.id)}
              >
                {!isUnlocked && !isCompleted && selectedBox !== null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm z-10">
                    <Lock className="w-10 h-10 text-black opacity-70" />
                  </div>
                )}

                <h2 className="text-xl font-semibold mb-4 text-black">Box {box.id}</h2>

                {isSelected && (
                  <div className="space-y-6">
                    {box.id === 7 && (
                      <>
                        <p className="font-medium text-gray-800">You are investigating a suspicious transaction on a blockchain. The following details are provided:</p>
                        <Image
                          src="/images/q7.png"
                          alt="Suspicious Transaction"
                          width={600}
                          height={300}
                          className="object-contain"
                        />
                      </>
                    )}
                    {box.questions.map((question) => {
                      const answerKey = `${box.id}-${question.id}`
                      return (
                        <div key={question.id} className="space-y-2">
                          <p className="font-medium text-gray-800">{question.question}</p>
                          {box.id === 4 && (
                            <Image
                              src="/images/q2_4.png"
                              alt="Smart Contract"
                              width={600}
                              height={300}
                              className="object-contain"
                            />
                          )}
                          <div className="flex space-x-2">
                            <Input
                              value={answers[answerKey] || ""}
                              onChange={(e) => handleAnswerChange(box.id, question.id, e.target.value)}
                              placeholder="Your answer"
                              className="border-gray-300"
                              disabled={false}
                            />
                            <Button
                              onClick={() => handleSubmit(box.id, question.id)}
                              variant="outline"
                              className="border-black text-black hover:bg-black hover:text-white"
                              disabled={false}
                            >
                              Submit
                            </Button>
                            {feedback[answerKey] === false && <p className="text-red-500 text-sm">Wrong answer</p>}
                            {feedback[answerKey] === true && <p className="text-green-600 text-sm">Correct!</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {!isSelected && (
                  <div className="h-32 flex items-center justify-center">
                    <p className="text-gray-500">{isCompleted ? "Mystery Solved" : "Investigate"}</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex justify-center items-center space-x-12">
          <div className="relative">
            <Image
              src="/images/c3-logo.png"
              alt="Crypto Collaborative Cell Logo"
              width={130}
              height={130}
              className="object-contain"
            />
          </div>
          <div className="relative">
            <Image src="/images/salus-logo.png" alt="Salus Logo" width={135} height={135} className="object-contain" />
          </div>
          <div className="relative">
            <Image
              src="/images/cybersmart-logo.png"
              alt="Cybersmart Logo"
              width={135}
              height={110}
              className="object-contain"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}