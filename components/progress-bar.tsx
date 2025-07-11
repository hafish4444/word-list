"use client"

import { Timer } from "./timer"

interface ProgressBarProps {
  currentQuestion: number
  totalQuestions: number
  score: number
  timer: number
  passedWordsStats?: {
    totalPassed: number
    totalWords: number
    percentage: number
  }
}

export function ProgressBar({ currentQuestion, totalQuestions, score, timer, passedWordsStats }: ProgressBarProps) {
  return (
    <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-200">
      {/* Main progress row */}
      <div className="grid grid-cols-3 items-center gap-4 mb-2">
        <div className="text-sm font-medium text-slate-600">
          Question <span className="text-indigo-600 font-semibold">{currentQuestion}</span> of {totalQuestions}
        </div>

        <div className="flex justify-center">
          <Timer timer={timer} />
        </div>

        <div className="text-right text-sm font-medium text-slate-600">
          Score: <span className="text-emerald-600 font-semibold text-base">{score}</span>
        </div>
      </div>

      {/* Overall progress stats */}
      {passedWordsStats && passedWordsStats.totalPassed > 0 && (
        <div className="border-t border-slate-200 pt-2 mt-2">
          <div className="text-center text-xs text-slate-500">
            📚 Overall Progress: <span className="font-semibold text-emerald-600">{passedWordsStats.totalPassed}</span>/
            {passedWordsStats.totalWords} words learned
            <span className="ml-1 text-emerald-600">({passedWordsStats.percentage}%)</span>
          </div>
        </div>
      )}
    </div>
  )
}
