"use client"

import { Info } from "lucide-react"

export function InfoIcon() {
  return (
    <div className="relative group">
      <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center cursor-help transition-all duration-200 hover:shadow-lg backdrop-blur-sm">
        <Info className="w-4 h-4 text-white" />
      </div>

      {/* Tooltip - positioned absolutely relative to icon */}
      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[100]">
        <div className="text-center">
          <div className="font-semibold mb-1">Keyboard Shortcuts</div>
          <div className="space-y-0.5 text-left">
            <div>Space - Show Answer</div>
            <div>← Undo Previous</div>
            <div>F Fail | P Pass</div>
          </div>
        </div>
        {/* Tooltip arrow pointing up to icon */}
        <div className="absolute -top-1 right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
      </div>
    </div>
  )
}
