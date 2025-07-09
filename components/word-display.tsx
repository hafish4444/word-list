"use client"

import type { VocabularyWord } from "@/types/vocabulary"

interface WordDisplayProps {
  word: VocabularyWord
}

export function WordDisplay({ word }: WordDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl p-6 text-center mb-5 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
      <div className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-2xl text-xs font-semibold mb-3 uppercase tracking-wide">
        Word #{word["No."]}
      </div>
      <h2 className="text-4xl font-bold text-slate-800 tracking-tight">{word.Word}</h2>
    </div>
  )
}
