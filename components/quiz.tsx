"use client"

import { useEffect } from "react"
import { Info } from "lucide-react"
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

// Info Icon Component that can be used separately
function InfoIcon() {
  return (
    <div className="relative group">
      <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center cursor-help transition-all duration-200 hover:shadow-lg backdrop-blur-sm">
        <Info className="w-4 h-4 text-white" />
      </div>

      {/* Tooltip - positioned absolutely relative to icon */}
      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[100]">
        <div className="text-center">
          <div className="font-semibold mb-1">Keyboard Shortcuts</div>
          <div className="space-y-0.5 text-left">
            <div>Space - Show Answer</div>
            <div>← Undo Previous</div>
            <div>F Fail | P Pass</div>
          </div>
        </div>
        {/* Tooltip arrow pointing up to icon */}
        <div className="absolute -top-1 right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
      </div>
    </div>
  )
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

// Attach InfoIcon as a static property for external use
Quiz.InfoIcon = InfoIcon
