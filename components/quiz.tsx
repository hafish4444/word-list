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
  const {
    quizState,
    currentWord,
    currentResult,
    totalQuestions,
    showAnswer,
    nextQuestion,
    previousQuestion,
    markPass,
    markFail,
    initQuiz,
  } = useQuiz(vocabularyData)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        showAnswer()
      } else if (e.code === "ArrowRight" && quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        if (quizState.currentQuestionIndex < totalQuestions - 1) {
          nextQuestion()
        }
      } else if (e.code === "ArrowLeft" && quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        if (quizState.currentQuestionIndex > 0) {
          previousQuestion()
        }
      } else if (e.code === "KeyF" && quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        markFail()
      } else if (e.code === "KeyP" && quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        markPass()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [quizState, showAnswer, nextQuestion, previousQuestion, markPass, markFail, totalQuestions])

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

      {/* Show current result status */}
      {quizState.isAnswerShown && currentResult?.passed !== null && (
        <div className="text-center">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              currentResult.passed ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
            }`}
          >
            {currentResult.passed ? "✅ Marked as Pass" : "❌ Marked as Fail"}
          </span>
        </div>
      )}

      <QuizControls
        isAnswerShown={quizState.isAnswerShown}
        isFirstQuestion={quizState.currentQuestionIndex === 0}
        isLastQuestion={quizState.currentQuestionIndex >= totalQuestions - 1}
        onShowAnswer={showAnswer}
        onNextQuestion={nextQuestion}
        onPreviousQuestion={previousQuestion}
        onMarkFail={markFail}
        onMarkPass={markPass}
        onRestart={initQuiz}
      />

      {/* Keyboard shortcuts hint */}
      {quizState.isAnswerShown && (
        <div className="text-center text-xs text-slate-500 mt-4">
          <p>Keyboard shortcuts: ← Previous | → Next | F Fail | P Pass</p>
        </div>
      )}
    </div>
  )
}
