"use client"

interface CompletionScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export function CompletionScreen({ score, totalQuestions, onRestart }: CompletionScreenProps) {
  return (
    <div className="text-center py-12 animate-in slide-in-from-bottom-8 duration-500">
      <div className="text-6xl mb-6 animate-bounce">🎉</div>
      <h2 className="text-3xl font-bold text-emerald-600 mb-4">Congratulations!</h2>
      <p className="text-xl text-slate-600 mb-8">
        You completed <span className="text-indigo-600 font-bold">{score}</span> out of{" "}
        <span className="text-indigo-600 font-bold">{totalQuestions}</span> words
      </p>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-base font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
        Start New Quiz
      </button>
    </div>
  )
}
