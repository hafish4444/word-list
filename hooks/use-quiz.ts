"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { VocabularyWord, QuizState } from "@/types/vocabulary"

interface WordResult {
  word: VocabularyWord
  passed: boolean | null // null = not answered, true = pass, false = fail
}

export function useQuiz(vocabularyData: VocabularyWord[]) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    timer: 10,
    isAnswerShown: false,
    isCompleted: false,
  })

  const [shuffledData, setShuffledData] = useState<VocabularyWord[]>([])
  const [results, setResults] = useState<WordResult[]>([])
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize quiz
  const initQuiz = useCallback(() => {
    const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5)
    setShuffledData(shuffled)
    setResults(shuffled.map((word) => ({ word, passed: null })))
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
      }
    })
  }, [clearTimer])

  // Mark as pass
  const markPass = useCallback(() => {
    setResults((prev) => {
      const newResults = [...prev]
      newResults[quizState.currentQuestionIndex] = {
        ...newResults[quizState.currentQuestionIndex],
        passed: true,
      }
      return newResults
    })

    setQuizState((prev) => ({
      ...prev,
      score: prev.score + 1,
    }))
  }, [quizState.currentQuestionIndex])

  // Mark as fail
  const markFail = useCallback(() => {
    setResults((prev) => {
      const newResults = [...prev]
      newResults[quizState.currentQuestionIndex] = {
        ...newResults[quizState.currentQuestionIndex],
        passed: false,
      }
      return newResults
    })
  }, [quizState.currentQuestionIndex])

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

  // Previous question
  const previousQuestion = useCallback(() => {
    setQuizState((prev) => {
      if (prev.currentQuestionIndex > 0) {
        clearTimer()
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
          isAnswerShown: false,
          timer: 10,
        }
      }
      return prev
    })
  }, [clearTimer])

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
  const currentResult = results[quizState.currentQuestionIndex]

  return {
    quizState,
    currentWord,
    currentResult,
    totalQuestions: shuffledData.length,
    results,
    showAnswer,
    nextQuestion,
    previousQuestion,
    markPass,
    markFail,
    initQuiz,
  }
}
