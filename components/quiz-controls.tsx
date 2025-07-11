"use client"

import { ChevronLeft } from "lucide-react"

interface QuizControlsProps {
  isAnswerShown: boolean
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isProcessing: boolean
  timer: number // Add timer prop
  onShowAnswer: () => void
  onUndoQuestion: () => void
  onMarkFail: () => void
  onMarkPass: () => void
  onRestart: () => void
}

export function QuizControls({
  isAnswerShown,
  isFirstQuestion,
  isLastQuestion,
  isProcessing,
  timer, // Add timer prop
  onShowAnswer,
  onUndoQuestion,
  onMarkFail,
  onMarkPass,
  onRestart,
}: QuizControlsProps) {
  // Get current timer phase
  const getTimerPhase = (timer: number) => {
    if (timer >= 11) return "show-answer" // 30-11 seconds: Show "Show Answer" button
    if (timer >= 1) return "fail-pass" // 10-1 seconds: Show "Fail"/"Pass" buttons
    return "auto-answer" // 0 seconds: Auto-show full answer
  }

  const timerPhase = getTimerPhase(timer)

  if (!isAnswerShown && timerPhase === "show-answer") {
    // Phase 1: 30-11 seconds - show only Undo and Show Answer
    return (
      <div className="flex items-center justify-between gap-3">
        {/* Undo Button */}
        <button
          onClick={onUndoQuestion}
          disabled={isFirstQuestion}
          aria-label="Undo to previous question"
          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-12 flex items-center gap-2 ${
            isFirstQuestion
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800 hover:transform hover:-translate-y-0.5 hover:shadow-md"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center Show Answer Button */}
        <button
          onClick={onShowAnswer}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          Show Answer
        </button>

        {/* Spacer to maintain layout */}
        <div className="min-w-12"></div>
      </div>
    )
  }

  if (!isAnswerShown && timerPhase === "fail-pass") {
    // Phase 2: 10-1 seconds - show Undo, Fail, and Pass buttons
    return (
      <div className="flex items-center justify-between gap-3">
        {/* Undo Button */}
        <button
          onClick={onUndoQuestion}
          disabled={isFirstQuestion || isProcessing}
          aria-label="Undo to previous question"
          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-12 flex items-center gap-2 ${
            isFirstQuestion || isProcessing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800 hover:transform hover:-translate-y-0.5 hover:shadow-md"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center Fail/Pass Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onMarkFail}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 relative overflow-hidden group ${
              isProcessing
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            }`}
          >
            {!isProcessing && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            )}
            ❌ Fail
          </button>
          <button
            onClick={onMarkPass}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 relative overflow-hidden group ${
              isProcessing
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            }`}
          >
            {!isProcessing && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            )}
            ✅ Pass
          </button>
        </div>

        {/* Spacer to maintain layout */}
        <div className="min-w-12"></div>
      </div>
    )
  }

  // Rest of the existing logic for when answer is shown...
  if (isLastQuestion) {
    // Last question - show Undo, Fail/Pass, and Restart
    return (
      <div className="flex items-center justify-between gap-3">
        {/* Undo Button */}
        <button
          onClick={onUndoQuestion}
          disabled={isFirstQuestion || isProcessing}
          aria-label="Undo to previous question"
          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-12 flex items-center gap-2 ${
            isFirstQuestion || isProcessing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800 hover:transform hover:-translate-y-0.5 hover:shadow-md"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center Fail/Pass Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onMarkFail}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 relative overflow-hidden group ${
              isProcessing
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            }`}
          >
            {!isProcessing && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            )}
            ❌ Fail
          </button>
          <button
            onClick={onMarkPass}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 relative overflow-hidden group ${
              isProcessing
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            }`}
          >
            {!isProcessing && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            )}
            ✅ Pass
          </button>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          disabled={isProcessing}
          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-24 ${
            isProcessing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-800 hover:transform hover:-translate-y-0.5"
          }`}
        >
          🔄 Restart
        </button>
      </div>
    )
  }

  // Regular question after showing answer - show Undo and Fail/Pass
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Undo Button */}
      <button
        onClick={onUndoQuestion}
        disabled={isFirstQuestion || isProcessing}
        aria-label="Undo to previous question"
        className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-12 flex items-center gap-2 ${
          isFirstQuestion || isProcessing
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800 hover:transform hover:-translate-y-0.5 hover:shadow-md"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Center Fail/Pass Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onMarkFail}
          disabled={isProcessing}
          className={`px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 relative overflow-hidden group ${
            isProcessing
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:transform hover:-translate-y-0.5 hover:shadow-lg"
          }`}
        >
          {!isProcessing && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          )}
          ❌ Fail
        </button>
        <button
          onClick={onMarkPass}
          disabled={isProcessing}
          className={`px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 relative overflow-hidden group ${
            isProcessing
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:transform hover:-translate-y-0.5 hover:shadow-lg"
          }`}
        >
          {!isProcessing && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          )}
          ✅ Pass
        </button>
      </div>

      {/* Spacer to maintain layout */}
      <div className="min-w-12"></div>
    </div>
  )
}
