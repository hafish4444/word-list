"use client"

import { useEffect } from "react"
import type { VocabularyWord } from "@/types/vocabulary"
import { useQuiz } from "@/hooks/use-quiz"
import { ProgressBar } from "./progress-bar"
import { WordDisplay } from "./word-display"
import { AnswerPanel } from "./answer-panel"
import { QuizControls } from "./quiz-controls"
import { CompletionScreen } from "./completion-screen"

interface QuizProps {
  vocabularyData: VocabularyWord[]
}

export function Quiz({ vocabularyData }: QuizProps) {
  const { quizState, currentWord, totalQuestions, showAnswer, nextQuestion, initQuiz } = useQuiz(vocabularyData)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        showAnswer()
      } else if (e.code === "Enter" && quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        if (quizState.currentQuestionIndex < totalQuestions - 1) {
          nextQuestion()
        } else {
          initQuiz()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [quizState, showAnswer, nextQuestion, initQuiz, totalQuestions])

  if (quizState.isCompleted) {
    return <CompletionScreen score={quizState.score} totalQuestions={totalQuestions} onRestart={initQuiz} />
  }

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <ProgressBar
        currentQuestion={quizState.currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        score={quizState.score}
        timer={quizState.timer}
      />

      <WordDisplay word={currentWord} />

      <AnswerPanel word={currentWord} isVisible={quizState.isAnswerShown} />

      <QuizControls
        isAnswerShown={quizState.isAnswerShown}
        isLastQuestion={quizState.currentQuestionIndex >= totalQuestions - 1}
        onShowAnswer={showAnswer}
        onNextQuestion={nextQuestion}
        onRestart={initQuiz}
      />
    </div>
  )
}
