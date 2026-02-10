import { useState, useEffect } from 'react'

export default function TypeWriter({ text, speed = 25, delay = 0, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      onComplete?.()
      return
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, started, text, speed, onComplete])

  const done = displayed.length >= text.length

  return (
    <span className={!done ? 'typing-cursor' : ''}>
      {displayed}
    </span>
  )
}
