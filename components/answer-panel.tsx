"use client"

import type { VocabularyWord } from "@/types/vocabulary"

interface AnswerPanelProps {
  word: VocabularyWord
  isVisible: boolean
  isExampleShown: boolean // New prop for example visibility
}

export function AnswerPanel({ word, isVisible, isExampleShown }: AnswerPanelProps) {
  return (
    <div
      className={`
        transition-all duration-400 mb-5
        ${isVisible || isExampleShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}
    >
      <div className="space-y-3">
        {/* Example Card - shows when isExampleShown is true */}
        {isExampleShown && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>📝</span>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Example Usage</div>
            </div>
            <div className="text-sm leading-relaxed text-slate-800 italic">{word["Example Sentence"]}</div>
          </div>
        )}

        {/* Definition Card - only shows when full answer is visible */}
        {isVisible && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 border-l-4 border-l-emerald-500 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>💡</span>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Definition</div>
            </div>
            <div className="text-sm leading-relaxed text-slate-800">{word["Meaning (EN)"]}</div>
          </div>
        )}

        {/* Translations Row - only shows when full answer is visible */}
        {isVisible && (
          <div className="grid grid-cols-2 gap-3">
            {/* Thai Card */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 border-l-4 border-l-red-600 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>🇹🇭</span>
                <div className="text-xs font-semibold text-red-800 uppercase tracking-wide">Thai</div>
              </div>
              <div className="text-base font-semibold text-slate-800">{word.Thai}</div>
            </div>

            {/* Japanese Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 border-l-4 border-l-blue-600 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>🇯🇵</span>
                <div className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Japanese</div>
              </div>
              <div className="text-base font-semibold text-slate-800">{word.Japanese}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
