import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './BootingupPage.css'

const bootMessages = [
  'Starting Windows 98...',
  '',
  'HIMEM is testing extended memory...done.',
  '',
  'C:\\>SETUP',
  '',
  'Loading Windows 98...',
  '',
  'Initializing device drivers...',
  '',
  'MS-DOS Compatibility mode active.',
  '',
  'The diagnostic tools were successfully loaded to drive D.',
  '',
  'MSCDEX Version 2.25',
  'Copyright (C) Microsoft Corp. 1986-1995. All rights reserved.',
  '',
  'Drive E: = Driver MSCD001 unit 0',
  '',
  'Preparing to start your computer.',
  'This may take a few minutes. Please wait...',
  '',
  'C:\\>WIN'
]

function BootingupPage() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [showCursor, setShowCursor] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Calculate delay per line to complete in ~5 seconds
    const totalTime = 5000 // 5 seconds
    const delayPerLine = Math.floor(totalTime / bootMessages.length)

    let currentIndex = 0
    let intervalId = null

    const showNextLine = () => {
      if (currentIndex < bootMessages.length) {
        setDisplayedLines(prev => [...prev, bootMessages[currentIndex]])
        currentIndex++
      } else {
        if (intervalId) {
          clearInterval(intervalId)
        }
        // Wait a bit after last line, then navigate to info page
        setTimeout(() => {
          navigate('/info')
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
    <div className="bootingup-container">
      <div className="boot-console">
        {displayedLines.map((line, index) => (
          <div key={index} className="boot-line">
            {line || '\u00A0'}
          </div>
        ))}
        {showCursor && <span className="boot-cursor">_</span>}
      </div>
    </div>
  )
}

export default BootingupPage

