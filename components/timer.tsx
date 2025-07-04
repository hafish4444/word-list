"use client"

interface TimerProps {
  timer: number
}

export function Timer({ timer }: TimerProps) {
  const isWarning = timer <= 3

  return (
    <div
      className={`
        w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-300 
        flex items-center justify-center text-white text-base font-bold 
        shadow-md transition-all duration-300
        ${isWarning ? "animate-pulse scale-105" : ""}
      `}
    >
      {timer}
    </div>
  )
}
