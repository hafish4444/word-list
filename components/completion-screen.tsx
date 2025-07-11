"use client"

interface CompletionScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  passedWordsStats?: {
    totalPassed: number
    totalWords: number
    percentage: number
  }
  onClearProgress?: () => void
}

export function CompletionScreen({
  score,
  totalQuestions,
  onRestart,
  passedWordsStats,
  onClearProgress,
}: CompletionScreenProps) {
  return (
    <div className="text-center py-12 animate-in slide-in-from-bottom-8 duration-500">
      <div className="text-6xl mb-6 animate-bounce">🎉</div>
      <h2 className="text-3xl font-bold text-emerald-600 mb-4">Congratulations!</h2>
      <p className="text-xl text-slate-600 mb-4">
        You completed <span className="text-indigo-600 font-bold">{score}</span> out of{" "}
        <span className="text-indigo-600 font-bold">{totalQuestions}</span> words
      </p>

      {/* Overall progress stats */}
      {passedWordsStats && passedWordsStats.totalPassed > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">📚 Your Learning Progress</h3>
          <p className="text-emerald-700">
            You've learned <span className="font-bold">{passedWordsStats.totalPassed}</span> out of{" "}
            <span className="font-bold">{passedWordsStats.totalWords}</span> total words
          </p>
          <div className="mt-2">
            <div className="bg-emerald-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${passedWordsStats.percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-emerald-600 mt-1 font-semibold">{passedWordsStats.percentage}% Complete</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-base font-semibold shadow-md hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          Start New Quiz
        </button>

        {onClearProgress && passedWordsStats && passedWordsStats.totalPassed > 0 && (
          <button
            onClick={onClearProgress}
            className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-200 hover:text-slate-800 hover:transform hover:-translate-y-0.5 transition-all duration-200"
          >
            🗑️ Reset Progress
          </button>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        <p>💡 Tip: Your progress is automatically saved!</p>
        <p>Press Ctrl+R during quiz to reset progress</p>
      </div>
    </div>
  )
}
