"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { VocabularyWord, QuizState } from "@/types/vocabulary"

export function useQuiz(vocabularyData: VocabularyWord[]) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    timer: 10,
    isAnswerShown: false,
    isCompleted: false,
  })

  const [shuffledData, setShuffledData] = useState<VocabularyWord[]>([])
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize quiz
  const initQuiz = useCallback(() => {
    const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5)
    setShuffledData(shuffled)
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      timer: 10,
      isAnswerShown: false,
      isCompleted: false,
    })
  }, [vocabularyData])

  // Clear timer function
  const clearTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }, [])

  // Start timer
  const startTimer = useCallback(() => {
    clearTimer()

    setQuizState((prev) => ({ ...prev, timer: 10 }))

    timerIntervalRef.current = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timer <= 1) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
          }
          return { ...prev, timer: 0, isAnswerShown: true }
        }
        return { ...prev, timer: prev.timer - 1 }
      })
    }, 1000)
  }, [clearTimer])

  // Show answer
  const showAnswer = useCallback(() => {
    setQuizState((prev) => {
      if (prev.isAnswerShown) return prev

      clearTimer()

      return {
        ...prev,
        isAnswerShown: true,
        score: prev.timer > 0 ? prev.score + 1 : prev.score,
      }
    })
  }, [clearTimer])

  // Next question
  const nextQuestion = useCallback(() => {
    setQuizState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1

      if (nextIndex >= shuffledData.length) {
        clearTimer()
        return { ...prev, isCompleted: true }
      } else {
        return {
          ...prev,
          currentQuestionIndex: nextIndex,
          isAnswerShown: false,
          timer: 10,
        }
      }
    })
  }, [shuffledData.length, clearTimer])

  // Initialize on mount
  useEffect(() => {
    if (vocabularyData.length > 0) {
      initQuiz()
    }
  }, [vocabularyData.length, initQuiz])

  // Start timer when question changes and answer is not shown
  useEffect(() => {
    if (!quizState.isAnswerShown && !quizState.isCompleted && shuffledData.length > 0) {
      startTimer()
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      clearTimer()
    }
  }, [quizState.currentQuestionIndex, quizState.isCompleted, shuffledData.length, startTimer, clearTimer])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [clearTimer])

  const currentWord = shuffledData[quizState.currentQuestionIndex]

  return {
    quizState,
    currentWord,
    totalQuestions: shuffledData.length,
    showAnswer,
    nextQuestion,
    initQuiz,
  }
}
