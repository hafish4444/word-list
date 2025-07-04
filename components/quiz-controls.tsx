"use client"

interface QuizControlsProps {
  isAnswerShown: boolean
  isLastQuestion: boolean
  onShowAnswer: () => void
  onNextQuestion: () => void
  onRestart: () => void
}

export function QuizControls({
  isAnswerShown,
  isLastQuestion,
  onShowAnswer,
  onNextQuestion,
  onRestart,
}: QuizControlsProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {!isAnswerShown && (
        <button
          onClick={onShowAnswer}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 min-w-28 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          Show Answer
        </button>
      )}

      {isAnswerShown && !isLastQuestion && (
        <button
          onClick={onNextQuestion}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-sm font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 min-w-28 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          Next Word →
        </button>
      )}

      {isAnswerShown && isLastQuestion && (
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-200 hover:text-slate-800 hover:transform hover:-translate-y-0.5 transition-all duration-200 min-w-28"
        >
          Restart Quiz
        </button>
      )}
    </div>
  )
}
