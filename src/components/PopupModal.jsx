import React, { useState, useRef, useEffect } from 'react'
import './PopupModal.css'

function PopupModal({ popupImage, onClose, documents = [], onDocumentClick, id, isActive, onActivate, initialPosition, onPositionChange }) {
  const calculateCenteredPosition = () => {
    // Popup max-width is 800px, scaled by 1.2 = 960px actual width
    // Estimate height as ~600px, scaled = 720px
    const scaledWidth = 800 * 1.2
    const scaledHeight = 600 * 1.2
    const centerX = (window.innerWidth / 2) - (scaledWidth / 2)
    const centerY = (window.innerHeight / 2) - (scaledHeight / 2) + 50 // Move down by 50px
    return { x: Math.max(0, centerX), y: Math.max(0, centerY) }
  }

  const [position, setPosition] = useState(() => {
    if (initialPosition) {
      return initialPosition
    }
    return calculateCenteredPosition()
  })
  
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition)
    }
  }, [initialPosition])
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        }
        setPosition(newPosition)
        if (onPositionChange) {
          onPositionChange(newPosition)
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleTitleBarMouseDown = (e) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
      setIsDragging(true)
      if (onActivate && id) {
        onActivate(id)
      }
    }
  }

  const handleWindowClick = (e) => {
    // Only activate if clicking on the window, not documents
    if (e.target.closest('.popup-document-container')) {
      return
    }
    if (onActivate && id) {
      onActivate(id)
    }
  }

  return (
    <div 
      className="popup-overlay"
      style={{ 
        zIndex: isActive ? 2600 : 2000, // Active popups above notepads (2500), inactive below
        background: 'transparent',
        pointerEvents: 'none',
        display: 'block'
      }}
    >
      <div 
        ref={windowRef}
        className="popup-window" 
        onClick={handleWindowClick}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          position: 'fixed',
          pointerEvents: 'auto'
        }}
      >
        <div className="popup-title-bar" onMouseDown={handleTitleBarMouseDown}></div>
        <img src={popupImage} alt="Popup" className="popup-background" />
        {documents.map((doc, index) => (
          <div
            key={index}
            className="popup-document-container"
            style={{
              position: 'absolute',
              left: `${doc.position.x}px`,
              top: `${doc.position.y}px`,
              zIndex: 10
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (onDocumentClick) {
                onDocumentClick(doc)
              }
            }}
          >
            <img
              src="/document.png"
              alt={doc.name}
              className="popup-document"
            />
            <span className="popup-document-title">{doc.name}</span>
          </div>
        ))}
        <button className="popup-close-x" onClick={onClose} aria-label="Close">
        </button>
      </div>
    </div>
  )
}

export default PopupModal

