import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

//   {
//       "category": "Geography",
//       "type": "multiple",
//       "difficulty": "hard",
//       "question": "What is the name of one of the Neo-Aramaic languages spoken by the Jewish population from Northwestern Iraq?",
//       "correct_answer": "Lishana Deni",
//       "incorrect_answers": [
//           "Hulaul&aacute;",
//           "Lishan Didan",
//           "Chaldean Neo-Aramaic"
//       ],
//       "options": [
//           "Hulaul&aacute;",
//           "Lishan Didan",
//           "Lishana Deni",
//           "Chaldean Neo-Aramaic"
//       ]
//   },
//   {
//       "category": "Entertainment: Video Games",
//       "type": "multiple",
//       "difficulty": "medium",
//       "question": "What was the first interactive movie video game?",
//       "correct_answer": "Astron Belt",
//       "incorrect_answers": [
//           "Dragon&#039;s Lair",
//           "Cube Quest",
//           "M.A.C.H. 3"
//       ],
//       "options": [
//           "Cube Quest",
//           "M.A.C.H. 3",
//           "Astron Belt",
//           "Dragon&#039;s Lair"
//       ]
//   },
//   {
//       "category": "Entertainment: Video Games",
//       "type": "multiple",
//       "difficulty": "medium",
//       "question": "In Need For Speed: Most Wanted (2005), how many people are there to defeat on the blacklist?",
//       "correct_answer": "15",
//       "incorrect_answers": [
//           "5",
//           "10",
//           "20"
//       ],
//       "options": [
//           "10",
//           "20",
//           "5",
//           "15"
//       ]
//   },
//   {
//       "category": "Entertainment: Video Games",
//       "type": "multiple",
//       "difficulty": "hard",
//       "question": "What is the 4th boss in the 1997 video game &quot;Crash Bandicoot 2: Cortex Strikes Back&quot;?",
//       "correct_answer": "Dr. N. Gin",
//       "incorrect_answers": [
//           "Dr. Neo Cortex",
//           "Komodo Brothers",
//           "Tiny Tiger"
//       ],
//       "options": [
//           "Dr. Neo Cortex",
//           "Tiny Tiger",
//           "Komodo Brothers",
//           "Dr. N. Gin"
//       ]
//   },
//   {
//       "category": "Entertainment: Cartoon & Animations",
//       "type": "multiple",
//       "difficulty": "easy",
//       "question": "In The Simpsons, which war did Seymour Skinner serve in the USA Army as a Green Beret?",
//       "correct_answer": "Vietnam War",
//       "incorrect_answers": [
//           "World War 2",
//           "World War 1",
//           "Cold War"
//       ],
//       "options": [
//           "Vietnam War",
//           "World War 2",
//           "Cold War",
//           "World War 1"
//       ]
//   }
// ];
export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch quiz questions");
    }

    const data = await response.json();

    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error) {
    // Handle the error gracefully
    console.error("Error fetching quiz questions:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};
