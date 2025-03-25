"use server"

// Store questions and answers securely on the server
const boxesData = [
  {
    id: 1,
    questions: [
      { id: 1, question: "Decrypt this cryptic message to find the flag:\nPGS{EBG13_VF_NALN_GNXRE}", answer: "CTF{ROT13_IS_ANY_TAKER}" },
    ],
  },
  {
    id: 2,
    questions: [
      { id: 1, question: "Compile the code, Analyze the output, Retrieve the Flag.\n\n<!DOCTYPE html> <html> <head> <title>Programming Language</title> <style> body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0; } .div-container { background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; } h1 { margin-bottom: 20px; } </style> </head> <body> <div class=\"div-container\"> <h1>The Programming Language.</h1> </div> </body> </html>", answer: "CTF{html}" },
    ],
  },
  {
    id: 3,
    questions: [
      { id: 1, question: "Identify the wrong Image.\nThe URL below takes you to a new site. Analyze the codes on the website and find out the incorrect programming language. Identify the correct name of the language and answer", answer: "CTF{javascript}" },
    ],
  },
  {
    id: 4,
    questions: [
      { id: 1, question: "Minimize the following boolean function using algebraic manipulation\n\nF=ABC’D’+ABC’D+AB’C’D+ABCD+AB’CD+ABCD’+AB’CD’", answer: "F=A(B+C)+AB′D" },
    ],
  },
  {
    id: 5,
    questions: [
      { id: 1, question: "What is the minimal form of the Karnaugh map shown below? Assume that X denotes a don’t care term.\n\n![Karnaugh Map](https://example.com/karnaugh-map.png)", answer: "F=B′D′+B′C′" },
    ],
  },
]

// Get questions without answers for client-side rendering
export async function getQuestions() {
  return boxesData.map((box) => ({
    id: box.id,
    questions: box.questions.map((q) => ({
      id: q.id,
      question: q.question,
      // Note: answer is not included
    })),
  }))
}

// Validate an answer on the server
export async function validateAnswer(boxId: number, questionId: number, userAnswer: string) {
  const box = boxesData.find((b) => b.id === boxId)
  const question = box?.questions.find((q) => q.id === questionId)

  if (!question) {
    return { isCorrect: false, error: "Question not found" }
  }

  const isCorrect = userAnswer.toLowerCase().trim() === question.answer.toLowerCase()
  return { isCorrect }
}