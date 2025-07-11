"use client"

import { useEffect } from "react"
import type { VocabularyWord } from "@/types/vocabulary"
import { useQuiz } from "@/hooks/use-quiz"
import { ProgressBar } from "./progress-bar"
import { WordDisplay } from "./word-display"
import { AnswerPanel } from "./answer-panel"
import { QuizControls } from "./quiz-controls"
import { CompletionScreen } from "./completion-screen"
import { Snackbar } from "./snackbar"

interface QuizProps {
  vocabularyData: VocabularyWord[]
}

export function Quiz({ vocabularyData }: QuizProps) {
  const {
    quizState,
    currentWord,
    totalQuestions,
    snackbar,
    isProcessing,
    isExampleShown,
    showAnswer,
    undoQuestion,
    markPass,
    markFail,
    initQuiz,
    hideSnackbar,
  } = useQuiz(vocabularyData)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable keyboard shortcuts when processing
      if (isProcessing) return

      if (e.code === "Space" && !quizState.isAnswerShown && !quizState.isCompleted) {
        e.preventDefault()
        showAnswer()
      } else if (e.code === "ArrowLeft" && (quizState.isAnswerShown || isExampleShown) && !quizState.isCompleted) {
        e.preventDefault()
        if (quizState.currentQuestionIndex > 0) {
          undoQuestion()
        }
      } else if (e.code === "KeyF" && (quizState.isAnswerShown || isExampleShown) && !quizState.isCompleted) {
        e.preventDefault()
        markFail()
      } else if (e.code === "KeyP" && (quizState.isAnswerShown || isExampleShown) && !quizState.isCompleted) {
        e.preventDefault()
        markPass()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [quizState, isExampleShown, showAnswer, undoQuestion, markPass, markFail, isProcessing])

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
    <>
      <div className="space-y-5">
        <ProgressBar
          currentQuestion={quizState.currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          score={quizState.score}
          timer={quizState.timer}
        />

        <WordDisplay word={currentWord} />

        <AnswerPanel word={currentWord} isVisible={quizState.isAnswerShown} isExampleShown={isExampleShown} />

        <QuizControls
          isAnswerShown={quizState.isAnswerShown || isExampleShown}
          isFirstQuestion={quizState.currentQuestionIndex === 0}
          isLastQuestion={quizState.currentQuestionIndex >= totalQuestions - 1}
          isProcessing={isProcessing}
          timer={quizState.timer}
          onShowAnswer={showAnswer}
          onUndoQuestion={undoQuestion}
          onMarkFail={markFail}
          onMarkPass={markPass}
          onRestart={initQuiz}
        />
      </div>

      {/* Snackbar for Pass/Fail/Undo notifications */}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={hideSnackbar}
        duration={2000}
      />
    </>
  )
}
