import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StartMenu.css'

function StartMenu({ onClose, startButtonRef }) {
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [isShuttingDown, setIsShuttingDown] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          startButtonRef?.current && !startButtonRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, startButtonRef])

  const handleShutDown = () => {
    setIsShuttingDown(true)
    setTimeout(() => {
      navigate('/shuttingdown')
    }, 300) // Delay for shadow effect
  }

  return (
    <div ref={menuRef} className="start-menu">
      <img src="/start_menu.jpg" alt="Start Menu" className="start-menu-background" />
      <div className="start-menu-content">
        <button 
          className={`shutdown-button ${isShuttingDown ? 'shadow-effect' : ''}`}
          onClick={handleShutDown}
        />
      </div>
    </div>
  )
}

export default StartMenu

