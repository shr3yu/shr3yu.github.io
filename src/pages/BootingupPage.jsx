import React, { useState, useEffect, useRef } from 'react'
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

const errorMessages = [
  '⚠ SYSTEM COMPATIBILITY CHECK FAILED',
  '',
  'Device Type: Mobile/Tablet Detected',
  '',
  'Required: Desktop Computer',
  '',
  'This experience requires a desktop environment',
  '',
  'for optimal performance.',
  '',
  'Please reopen this page on a desktop computer.',
  '',
  '',
  'Press any key to return...'
]

// Function to detect mobile/tablet devices
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  
  // Check for touch capability
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  // Comprehensive mobile/tablet regex patterns
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i
  
  // Check for iPad specifically (including newer iPads that might identify as Mac)
  // Newer iPads running iPadOS 13+ report as MacIntel in the user agent
  const isIPad = /iPad/i.test(userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 && !window.MSStream)
  
  // Check for Android tablets (Android without "Mobile" in user agent usually means tablet)
  const isAndroidTablet = /android/i.test(userAgent) && !/mobile/i.test(userAgent)
  
  // Check screen dimensions (tablets typically have smaller screens than desktops)
  // Most tablets are <= 1366px wide, but we'll be more conservative
  const screenWidth = window.innerWidth || window.screen.width
  const screenHeight = window.innerHeight || window.screen.height
  const isTabletSize = (screenWidth <= 1366 && screenHeight <= 1024) || 
                       (screenWidth <= 1024 && screenHeight <= 1366)
  
  // Consider it mobile/tablet if:
  // 1. Matches mobile regex (includes ipad, android, etc.)
  // 2. Is specifically an iPad (including newer ones that report as Mac)
  // 3. Is an Android tablet
  // 4. Has touch screen AND reasonable tablet size (to avoid catching large touch monitors)
  return mobileRegex.test(userAgent) || 
         isIPad || 
         isAndroidTablet || 
         (hasTouchScreen && isTabletSize && screenWidth <= 1366)
}

function BootingupPage() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [showCursor, setShowCursor] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [errorComplete, setErrorComplete] = useState(false)
  const hasNavigatedRef = useRef(false)
  const navigate = useNavigate()

  // Check if device is mobile/tablet on mount
  useEffect(() => {
    const mobile = isMobileDevice()
    setIsMobile(mobile)
  }, [])

  // Handle keypress/touch/click to return to landing page (for mobile error screen)
  useEffect(() => {
    if (isMobile && errorComplete) {
      // Reset navigation flag when effect runs
      hasNavigatedRef.current = false

      const handleInteraction = (e) => {
        // Prevent default behavior and stop propagation
        if (e) {
          e.preventDefault()
          e.stopPropagation()
        }
        
        // Only navigate once using ref to track across all handlers
        if (!hasNavigatedRef.current) {
          hasNavigatedRef.current = true
          navigate('/')
        }
      }

      // Support keyboard events
      window.addEventListener('keydown', handleInteraction, { once: true })
      
      // For touch devices, use touchstart and prevent click from also firing
      window.addEventListener('touchstart', handleInteraction, { once: true, passive: false })
      
      // For mouse clicks (desktop)
      window.addEventListener('click', handleInteraction, { once: true })

      return () => {
        window.removeEventListener('keydown', handleInteraction)
        window.removeEventListener('touchstart', handleInteraction)
        window.removeEventListener('click', handleInteraction)
      }
    }
  }, [isMobile, errorComplete, navigate])

  // Error message sequence (for mobile devices)
  useEffect(() => {
    if (!isMobile) return

    // Calculate delay per line to complete in ~3 seconds
    const totalTime = 3000 // 3 seconds
    const delayPerLine = Math.floor(totalTime / errorMessages.length)

    let currentIndex = 0
    let intervalId = null

    const showNextLine = () => {
      if (currentIndex < errorMessages.length) {
        setDisplayedLines(prev => [...prev, errorMessages[currentIndex]])
        currentIndex++
      } else {
        if (intervalId) {
          clearInterval(intervalId)
        }
        // Mark error message as complete so navigation can be enabled
        setErrorComplete(true)
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
  }, [isMobile])

  // Normal boot sequence (only if not mobile)
  useEffect(() => {
    if (isMobile) return // Don't run boot sequence on mobile

    // Calculate delay per line to complete in ~4 seconds
    const totalTime = 4000 // 4 seconds
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
  }, [navigate, isMobile])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Render mobile error screen or normal boot screen
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

