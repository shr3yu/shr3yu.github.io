import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ShuttingDownPage.css'

const shutdownMessages = [
  'C:\\WINDOWS>exit',
  '',
  'Shutting down Windows...',
  '',
  '',
  'Please wait while your computer shuts down.',
  '',
  '',
  'Saving your settings...',
  '',
  'Closing network connections...',
  '',
  'Writing system cache to disk...',
  '',
  '',
  'Windows is shutting down...',
  '',
  '',
  'It is now safe to turn off your computer.'
]

function ShuttingDownPage() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [showCursor, setShowCursor] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Calculate delay per line to complete in ~4 seconds
    const totalTime = 4000 // 4 seconds
    const delayPerLine = Math.floor(totalTime / shutdownMessages.length)

    let currentIndex = 0
    let intervalId = null

    const showNextLine = () => {
      if (currentIndex < shutdownMessages.length) {
        setDisplayedLines(prev => [...prev, shutdownMessages[currentIndex]])
        currentIndex++
      } else {
        if (intervalId) {
          clearInterval(intervalId)
        }
        // Wait a bit after last line, then navigate to landing page
        setTimeout(() => {
          navigate('/')
        }, 500)
      }
    }

    // Show first line immediately
    showNextLine()

    // Then show remaining lines at intervals
    intervalId = setInterval(showNextLine, delayPerLine)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [navigate])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="shuttingdown-container">
      <div className="shutdown-console">
        {displayedLines.map((line, index) => (
          <div key={index} className="shutdown-line">
            {line || '\u00A0'}
          </div>
        ))}
        {showCursor && <span className="shutdown-cursor">_</span>}
      </div>
    </div>
  )
}

export default ShuttingDownPage

