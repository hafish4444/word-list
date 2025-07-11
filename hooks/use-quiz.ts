"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { VocabularyWord, QuizState } from "@/types/vocabulary"

interface WordResult {
  word: VocabularyWord
  passed: boolean | null // null = not answered, true = pass, false = fail
}

interface SnackbarState {
  isVisible: boolean
  message: string
  type: "success" | "error" | "info"
}

interface PassedWordsStorage {
  [wordId: string]: {
    word: string
    passedAt: string // ISO date string
    passCount: number
  }
}

export function useQuiz(vocabularyData: VocabularyWord[]) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    timer: 30,
    isAnswerShown: false,
    isCompleted: false,
  })

  const [shuffledData, setShuffledData] = useState<VocabularyWord[]>([])
  const [results, setResults] = useState<WordResult[]>([])
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isVisible: false,
    message: "",
    type: "success",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isExampleShown, setIsExampleShown] = useState(false)
  const [passedWords, setPassedWords] = useState<PassedWordsStorage>({})
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Local storage key
  const STORAGE_KEY = "vocabulary-quiz-passed-words"

  // Load passed words from local storage
  const loadPassedWords = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as PassedWordsStorage
        setPassedWords(parsed)
        return parsed
      }
    } catch (error) {
      console.error("Error loading passed words from localStorage:", error)
    }
    return {}
  }, [])

  // Save passed words to local storage
  const savePassedWords = useCallback((words: PassedWordsStorage) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(words))
    } catch (error) {
      console.error("Error saving passed words to localStorage:", error)
    }
  }, [])

  // Check if a word has been passed before
  const isWordPassed = useCallback(
    (word: VocabularyWord) => {
      const wordKey = `${word["No."]}-${word.Word.toLowerCase()}`
      return passedWords[wordKey] !== undefined
    },
    [passedWords],
  )

  // Add word to passed list
  const addPassedWord = useCallback(
    (word: VocabularyWord) => {
      const wordKey = `${word["No."]}-${word.Word.toLowerCase()}`
      const newPassedWords = {
        ...passedWords,
        [wordKey]: {
          word: word.Word,
          passedAt: new Date().toISOString(),
          passCount: (passedWords[wordKey]?.passCount || 0) + 1,
        },
      }
      setPassedWords(newPassedWords)
      savePassedWords(newPassedWords)
    },
    [passedWords, savePassedWords],
  )

  // Clear all passed words (reset progress)
  const clearPassedWords = useCallback(() => {
    setPassedWords({})
    try {
      localStorage.removeItem(STORAGE_KEY)
      showSnackbar("🗑️ Progress reset - All passed words cleared", "info")
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }, [])

  // Calculate score from results array
  const calculateScore = useCallback((resultsArray: WordResult[]) => {
    return resultsArray.filter((result) => result.passed === true).length
  }, [])

  // Show snackbar
  const showSnackbar = useCallback((message: string, type: "success" | "error" | "info") => {
    setSnackbar({
      isVisible: true,
      message,
      type,
    })
  }, [])

  // Hide snackbar
  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      isVisible: false,
    }))
  }, [])

  // Initialize quiz
  const initQuiz = useCallback(() => {
    const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5)
    setShuffledData(shuffled)
    const initialResults = shuffled.map((word) => ({ word, passed: null }))
    setResults(initialResults)
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      timer: 30,
      isAnswerShown: false,
      isCompleted: false,
    })
    setIsProcessing(false)
    setIsExampleShown(false)
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

    setQuizState((prev) => ({ ...prev, timer: 30 }))
    setIsExampleShown(false)

    timerIntervalRef.current = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timer <= 1) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
          }
          // When timer reaches 0, show full answer automatically
          return { ...prev, timer: 0, isAnswerShown: true }
        } else if (prev.timer === 21) {
          // Show example when timer reaches 20 (after 10 seconds)
          setIsExampleShown(true)
        }
        return { ...prev, timer: prev.timer - 1 }
      })
    }, 1000)
  }, [clearTimer])

  // Show answer (full answer)
  const showAnswer = useCallback(() => {
    setQuizState((prev) => {
      if (prev.isAnswerShown) return prev

      clearTimer()

      return {
        ...prev,
        isAnswerShown: true,
      }
    })
    setIsExampleShown(true) // Also show example when showing full answer
  }, [clearTimer])

  // Undo (Previous question) with score recalculation and notification
  const undoQuestion = useCallback(() => {
    setIsProcessing(false)
    setIsExampleShown(false)
    setQuizState((prev) => {
      if (prev.currentQuestionIndex > 0) {
        clearTimer()

        // Get the previous question's result to show in notification
        const previousIndex = prev.currentQuestionIndex - 1
        const previousResult = results[previousIndex]

        // Recalculate score based on current results
        const newScore = calculateScore(results)

        // Show undo notification with score info
        let undoMessage = "🔄 Undone to previous question"
        if (previousResult?.passed === true) {
          undoMessage = `🔄 Undone - Score adjusted to ${newScore}`
        } else if (previousResult?.passed === false) {
          undoMessage = `🔄 Undone - Score remains ${newScore}`
        }

        showSnackbar(undoMessage, "info")

        return {
          ...prev,
          currentQuestionIndex: previousIndex,
          isAnswerShown: false,
          timer: 30,
          score: newScore, // Update score based on actual results
        }
      }
      return prev
    })
  }, [clearTimer, calculateScore, results, showSnackbar])

  // Mark as pass and auto-advance
  const markPass = useCallback(() => {
    if (isProcessing) return

    setIsProcessing(true)

    const currentWord = shuffledData[quizState.currentQuestionIndex]

    // Add to passed words in localStorage
    addPassedWord(currentWord)

    setResults((prev) => {
      const newResults = [...prev]
      newResults[quizState.currentQuestionIndex] = {
        ...newResults[quizState.currentQuestionIndex],
        passed: true,
      }

      // Update score immediately based on new results
      const newScore = calculateScore(newResults)
      setQuizState((prevState) => ({
        ...prevState,
        score: newScore,
      }))

      return newResults
    })

    // Check if this word was passed before
    const wasPassedBefore = isWordPassed(currentWord)
    const message = wasPassedBefore
      ? "✅ Marked as Pass (Previously learned!)"
      : "✅ Marked as Pass (New word learned!)"

    showSnackbar(message, "success")

    // Auto-advance to next question
    setTimeout(() => {
      setIsExampleShown(false)
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
            timer: 30,
          }
        }
      })
      setIsProcessing(false)
    }, 1000)
  }, [
    quizState.currentQuestionIndex,
    shuffledData,
    clearTimer,
    showSnackbar,
    isProcessing,
    calculateScore,
    addPassedWord,
    isWordPassed,
  ])

  // Mark as fail and auto-advance
  const markFail = useCallback(() => {
    if (isProcessing) return

    setIsProcessing(true)

    setResults((prev) => {
      const newResults = [...prev]
      newResults[quizState.currentQuestionIndex] = {
        ...newResults[quizState.currentQuestionIndex],
        passed: false,
      }

      // Update score immediately based on new results
      const newScore = calculateScore(newResults)
      setQuizState((prevState) => ({
        ...prevState,
        score: newScore,
      }))

      return newResults
    })

    showSnackbar("❌ Marked as Fail", "error")

    // Auto-advance to next question
    setTimeout(() => {
      setIsExampleShown(false)
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
            timer: 30,
          }
        }
      })
      setIsProcessing(false)
    }, 1000)
  }, [quizState.currentQuestionIndex, shuffledData.length, clearTimer, showSnackbar, isProcessing, calculateScore])

  // Load passed words on mount
  useEffect(() => {
    loadPassedWords()
  }, [loadPassedWords])

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

  // Get stats about passed words
  const getPassedWordsStats = useCallback(() => {
    const totalPassed = Object.keys(passedWords).length
    const totalWords = vocabularyData.length
    return { totalPassed, totalWords, percentage: Math.round((totalPassed / totalWords) * 100) }
  }, [passedWords, vocabularyData.length])

  return {
    quizState,
    currentWord,
    currentResult,
    totalQuestions: shuffledData.length,
    results,
    snackbar,
    isProcessing,
    isExampleShown,
    passedWords,
    isWordPassed: currentWord ? isWordPassed(currentWord) : false,
    getPassedWordsStats,
    clearPassedWords,
    showAnswer,
    undoQuestion,
    markPass,
    markFail,
    initQuiz,
    hideSnackbar,
  }
}
