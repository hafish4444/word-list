"use client"

import { Timer } from "./timer"

interface ProgressBarProps {
  currentQuestion: number
  totalQuestions: number
  score: number
  timer: number
}

export function ProgressBar({ currentQuestion, totalQuestions, score, timer }: ProgressBarProps) {
  return (
    <div className="bg-slate-50 rounded-xl p-3 mb-5 grid grid-cols-3 items-center gap-4 border border-slate-200">
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
  )
}
