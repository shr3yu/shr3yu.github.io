import React, { useState, useEffect, useRef } from 'react'
import StartMenu from './StartMenu'
import './HomeBar.css'

function HomeBar({ windows = [], activeWindowId, onWindowClick }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showStartMenu, setShowStartMenu] = useState(false)
  const taskbarRef = useRef(null)
  const startButtonRef = useRef(null)
  const [tabWidth, setTabWidth] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const calculateTabWidth = () => {
      if (taskbarRef.current && windows.length > 0) {
        const taskbarWidth = taskbarRef.current.offsetWidth
        const startButtonWidth = 120 // Approximate start button width
        const systemTrayWidth = 100 // Approximate system tray width
        const availableWidth = taskbarWidth - startButtonWidth - systemTrayWidth - 20 // padding
        const maxTabWidth = 200
        const minTabWidth = 60 // Reduced minimum to allow more windows
        const calculatedWidth = Math.max(minTabWidth, Math.min(maxTabWidth, availableWidth / windows.length))
        setTabWidth(calculatedWidth)
      }
    }

    calculateTabWidth()
    window.addEventListener('resize', calculateTabWidth)
    return () => window.removeEventListener('resize', calculateTabWidth)
  }, [windows.length])

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

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu)
  }

  return (
    <div className="homebar">
      <button 
        ref={startButtonRef}
        className={`start-button ${showStartMenu ? 'active' : ''}`}
        onClick={handleStartClick}
      >
        <img src="/windows.png" alt="Windows" className="windows-logo" />
        <span className="start-text">Start</span>
      </button>
      {showStartMenu && (
        <StartMenu 
          onClose={() => setShowStartMenu(false)}
          startButtonRef={startButtonRef}
        />
      )}
      <div className="taskbar-middle" ref={taskbarRef}>
        {windows.map((window) => {
          const isActive = window.id === activeWindowId
          return (
            <button
              key={window.id}
              className={`taskbar-button ${isActive ? 'active' : ''}`}
              onClick={() => onWindowClick && onWindowClick(window.id)}
              style={{ width: tabWidth ? `${tabWidth}px` : 'auto' }}
            >
              <img src={window.icon || '/notepad.png'} alt={window.title} className="taskbar-icon" />
              <span className={`taskbar-text ${isActive ? 'active' : ''}`}>{window.title}</span>
            </button>
          )
        })}
      </div>
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
