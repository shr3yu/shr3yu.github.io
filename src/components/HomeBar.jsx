import React, { useState, useEffect } from 'react'
import './HomeBar.css'

function HomeBar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="homebar">
      <button className="start-button">
        <img src="/windows.png" alt="Windows" className="windows-logo" />
        <span className="start-text">Start</span>
      </button>
      <div className="taskbar-middle"></div>
      <div className="system-tray">
        <div className="date-time">
          <span className="date">{formatDate(currentTime)}</span>
          <span className="time">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  )
}

export default HomeBar
