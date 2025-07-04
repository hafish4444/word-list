export interface VocabularyWord {
  "No.": number
  Word: string
  "Meaning (EN)": string
  "Example Sentence": string
  Thai: string
  Japanese: string
}

export interface QuizState {
  currentQuestionIndex: number
  score: number
  timer: number
  isAnswerShown: boolean
  isCompleted: boolean
}
