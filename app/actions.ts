"use server"

// Store questions and answers securely on the server
const boxesData = [
  {
    id: 1,
    questions: [
      { 
        id: 1, 
        question: `You come across a mysterious website that asks for a 6-digit password. Each digit is entered one by one, and the system provides feedback in the form of beep sounds. Analyze the response and find out the flag. [https://tinyurl.com/question-2-1]`, 
        answer: "ctf{21}" 
      },
    ],
  },
  {
    id: 2,
    questions: [
      { 
        id: 1, 
        question: `You are given access to a crypto portfolio website. The website requires a username and password to view the portfolio. Your task is to bypass the login mechanism and retrieve the flag hidden in the portfolio. [https://tinyurl.com/phantomhunt2-2]
CREDENTIALS:
Username: DRAKE
Password: 1224`, 
        answer: "CTF{30000}" 
      },
    ],
  },
  {
    id: 3,
    questions: [
      { 
        id: 1, 
        question: "You are given a Transaction Hash. Open The Transaction, Analyze, and find out the flag.  0x2aff7f77ec9d5bf378f1fafacfe65b6b01786feb2b854a6a988d1d694a1601d8", 
        answer: "CTF{0.000062448454110648 ETH}" 
      },
    ],
  },
  {
    id: 4,
    questions: [
      { 
        id: 1, 
        question: "You are analyzing a smart contract deployed on the Ethereum blockchain. The contract is designed to manage a decentralized voting system. Below is a snippet of the contract's Solidity code. Identify the vulnerability in the addProposal function.", 
        answer: "CTF{Name_of_Vulnerability}" 
      },
    ],
  },
  {
    id: 5,
    questions: [
      { 
        id: 1, 
        question: "A phantom locked the system and hide the code in the form of logical circuit code. The phantom has given four circuits, and each circuit gives a number, after which the lock can be unlocked. The code is in the form of PQRS.", 
        answer: "ctf{A * 6}" 
      },
    ],
  },
  {
    id: 6,
    questions: [
      { 
        id: 1, 
        question: "The phantom has locked the system, to unlock it solve the circuit and find the desired password: After receiving the equation substitute the provided values in the equation -", 
        answer: "ctf{3066}" 
      },
    ],
  },
  {
    id: 7,
    questions: [
      { 
        id: 1, 
        question: "What is the most likely purpose of this transaction?A legitimate transfer of funds between two users  OR  A money laundering attempt  OR  A smart contract interaction  OR  A mining reward payout", 
        answer: "A money laundering attempt" 
      },
      { 
        id: 2, 
        question: "What additional information would you need to confirm your hypothesis?\nThe private key of the sender  OR  The transaction history of the receiver address  OR  The smart contract code (if any) involved in the transaction  OR  The IP address of the sender", 
        answer: "The transaction history of the receiver address" 
      },
      { 
        id: 3, 
        question: "If this transaction is part of a money laundering scheme, what steps would you take to trace the funds further? Analyze the receiver address's future transactions  OR  Check if the receiver address interacts with known mixing services  OR  Look for patterns in the transaction amounts and timestamps  OR  All of the above", 
        answer: "All of the above" 
      },
      { 
        id: 4, 
        question: "What is the significance of the block height and timestamp in this investigation? They help determine the transaction's position in the blockchain  OR  They provide context about when and where the transaction occurred  OR  They can be used to identify the mining pool responsible for the block  OR  All of the above", 
        answer: "All of the above" 
      },
    ],
  },
  {
    id: 8,
    questions: [
      { id: 1, question: "Scenario: Your company is implementing multi-factor authentication (MFA) to enhance security. One department is resistant, arguing that passwords alone should be sufficient. What is the best way to justify the importance of MFA?\nA. MFA adds an extra layer of security by requiring a second form of authentication, reducing the impact of compromised passwords.\nB. MFA makes logging in faster and more convenient for employees.\nC. MFA completely eliminates the risk of phishing attacks.\nD. MFA is only useful in highly regulated industries, so it may not be necessary for the company.", answer: "A" },
    ],
  },
  {
    id: 9,
    questions: [
      { id: 1, question: "You receive an email from your bank, urgently asking you to reset your password due to suspicious activity. The email includes a link that appears legitimate. What is the best way to verify its authenticity?\nA. Click the link and check the website's URL after logging in.\nB. Hover over the link to see the destination URL and compare it with the official website.\nC. Call the number provided in the email to confirm.\nD. Immediately delete the email without checking.", answer: "B" },
    ],
  },
  {
    id: 10,
    questions: [
      { id: 1, question: "A hacker wants to bypass multi-factor authentication (MFA) for an online account. Which method is most likely to succeed?\nA. Brute force attack on the user's password.\nB. SIM swapping to intercept authentication codes.\nC. Social engineering to convince support staff to reset MFA.\nD. Stealing cookies from a user’s session.", answer: "B,C" },
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