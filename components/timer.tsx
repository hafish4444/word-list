"use client"

interface TimerProps {
  timer: number
}

export function Timer({ timer }: TimerProps) {
  const isWarning = timer <= 10
  const isExample = timer <= 20 && timer > 10

  return (
    <div
      className={`
        w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold 
        shadow-md transition-all duration-300
        ${
          isWarning
            ? "bg-gradient-to-br from-red-500 to-red-300 animate-pulse scale-105"
            : isExample
              ? "bg-gradient-to-br from-amber-500 to-amber-300"
              : "bg-gradient-to-br from-blue-500 to-blue-300"
        }
      `}
    >
      {timer}
    </div>
  )
}
