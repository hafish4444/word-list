"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Info } from "lucide-react"

interface SnackbarProps {
  message: string
  type: "success" | "error" | "info"
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Snackbar({ message, type, isVisible, onClose, duration = 3000 }: SnackbarProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300) // Wait for exit animation

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, duration])

  if (!shouldRender) return null

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />
      case "error":
        return <XCircle className="w-5 h-5" />
      case "info":
        return <Info className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-emerald-500"
      case "error":
        return "bg-red-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-[9999]
        px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-white
        transition-all duration-300 ease-in-out
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${getBackgroundColor()}
      `}
    >
      {getIcon()}
      <span className="font-medium text-sm">{message}</span>
    </div>
  )
}
