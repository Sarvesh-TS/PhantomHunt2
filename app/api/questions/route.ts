import { NextRequest, NextResponse } from 'next/server';

const boxes = [
  {
    id: 1,
    questions: [
      { id: 1, question: "What is 2 + 3?", answer: "5" },
      { id: 2, question: "What is the capital of France?", answer: "paris" },
    ],
  },
  {
    id: 2,
    questions: [
      { id: 1, question: "What is 5 × 5?", answer: "25" },
      { id: 2, question: "Which planet is known as the Red Planet?", answer: "mars" },
    ],
  },
  {
    id: 3,
    questions: [
      { id: 1, question: "What is 10 ÷ 2?", answer: "5" },
      { id: 2, question: "Who painted the Mona Lisa?", answer: "leonardo da vinci" },
    ],
  },
  {
    id: 4,
    questions: [
      { id: 1, question: "What is 7 × 8?", answer: "56" },
      { id: 2, question: "What is the largest ocean on Earth?", answer: "pacific" },
    ],
  },
  {
    id: 5,
    questions: [
      { id: 1, question: "What is 12 - 7?", answer: "5" },
      { id: 2, question: "What is the chemical symbol for gold?", answer: "au" },
    ],
  },
  {
    id: 6,
    questions: [
      { id: 1, question: "What is 3 × 9?", answer: "27" },
      { id: 2, question: "Which element has the symbol 'O'?", answer: "oxygen" },
    ],
  },
  {
    id: 7,
    questions: [
      { id: 1, question: "What is 18 ÷ 3?", answer: "6" },
      { id: 2, question: "Who wrote 'Romeo and Juliet'?", answer: "shakespeare" },
    ],
  },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(boxes);
}