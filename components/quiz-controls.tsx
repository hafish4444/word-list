"use client"

interface QuizControlsProps {
  isAnswerShown: boolean
  isFirstQuestion: boolean
  isLastQuestion: boolean
  onShowAnswer: () => void
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  onMarkFail: () => void
  onMarkPass: () => void
  onRestart: () => void
}

export function QuizControls({
  isAnswerShown,
  isFirstQuestion,
  isLastQuestion,
  onShowAnswer,
  onNextQuestion,
  onPreviousQuestion,
  onMarkFail,
  onMarkPass,
  onRestart,
}: QuizControlsProps) {
  if (!isAnswerShown) {
    // Before showing answer - only show "Show Answer" button
    return (
      <div className="flex justify-center">
        <button
          onClick={onShowAnswer}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          Show Answer
        </button>
      </div>
    )
  }

  if (isLastQuestion) {
    // Last question - show Previous, Fail/Pass, and Restart
    return (
      <div className="flex items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          onClick={onPreviousQuestion}
          disabled={isFirstQuestion}
          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-24 ${
            isFirstQuestion
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-800 hover:transform hover:-translate-y-0.5"
          }`}
        >
          ← Previous
        </button>

        {/* Center Fail/Pass Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onMarkFail}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            ❌ Fail
          </button>
          <button
            onClick={onMarkPass}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            ✅ Pass
          </button>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="px-4 py-3 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-200 hover:text-slate-800 hover:transform hover:-translate-y-0.5 transition-all duration-200 min-w-24"
        >
          🔄 Restart
        </button>
      </div>
    )
  }

  // Regular question - show Previous, Fail/Pass, and Next
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Previous Button */}
      <button
        onClick={onPreviousQuestion}
        disabled={isFirstQuestion}
        className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-24 ${
          isFirstQuestion
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-800 hover:transform hover:-translate-y-0.5"
        }`}
      >
        ← Previous
      </button>

      {/* Center Fail/Pass Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onMarkFail}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          ❌ Fail
        </button>
        <button
          onClick={onMarkPass}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          ✅ Pass
        </button>
      </div>

      {/* Next Button */}
      <button
        onClick={onNextQuestion}
        className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 min-w-24 relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
        Next →
      </button>
    </div>
  )
}
