"use client"

import type { VocabularyWord } from "@/types/vocabulary"

interface WordDisplayProps {
  word: VocabularyWord
  isWordPassed?: boolean
}

export function WordDisplay({ word, isWordPassed = false }: WordDisplayProps) {
  return (
    <div
      className={`bg-gradient-to-br border-2 rounded-2xl p-6 text-center mb-5 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg ${
        isWordPassed
          ? "from-emerald-50 to-green-50 border-emerald-300 hover:border-emerald-400"
          : "from-slate-50 to-slate-100 border-slate-200 hover:border-indigo-300"
      }`}
    >
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-2xl text-xs font-semibold mb-3 uppercase tracking-wide ${
          isWordPassed ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white"
        }`}
      >
        {isWordPassed && <span>✅</span>}
        <span>Word #{word["No."]}</span>
        {isWordPassed && <span className="text-emerald-200 text-xs">(Learned)</span>}
      </div>
      <h2 className="text-4xl font-bold text-slate-800 tracking-tight">{word.Word}</h2>
      {isWordPassed && (
        <div className="mt-2 text-sm text-emerald-600 font-medium">🎉 You've learned this word before!</div>
      )}
    </div>
  )
}
