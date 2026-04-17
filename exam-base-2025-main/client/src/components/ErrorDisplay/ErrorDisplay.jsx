import './ErrorDisplay.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// selectors
const userErrorSelector = state => state.user.error
const projectErrorSelector = state => state.project.error
const taskErrorSelector = state => state.task?.error
const userSuggestionErrorSelector = state => state.userSuggestion?.error

const ErrorDisplay = () => {
  const userError = useSelector(userErrorSelector)
  const projectError = useSelector(projectErrorSelector)
  const taskError = useSelector(taskErrorSelector)
  const userSuggestionError = useSelector(userSuggestionErrorSelector)

  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  // whenever any slice reports an error, show it
  useEffect(() => {
    const error =
      userError ||
      projectError ||
      taskError ||
      userSuggestionError

    if (error) {
      // make sure we display a string, not an object
      console.log("error.statusText:", error.statusText, error.message)
      console.log("error:", error, error.message)
      const err_msg = error.statusText ? error.statusText : error.message
      const text = typeof err_msg === 'string' ? err_msg : 'An error occurred' //not sure if statusText or message covers all the cases
      setMessage(text)
    }
  }, [userError, projectError, taskError, userSuggestionError])

  // auto-hide after 5s
  useEffect(() => {
    if (!message) {
      return
    }

    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setMessage('')
    }, 5000)

    return () => clearTimeout(timer)
  }, [message])

  return (
    <div className={'error-display' + (isVisible && message ? ' visible' : '')}>
      <div>Error: {message}</div>
    </div>
  )
}

export default ErrorDisplay
