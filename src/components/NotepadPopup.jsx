import React, { useState, useRef, useEffect } from 'react'
import './NotepadPopup.css'

function NotepadPopup({ id, title, content, onClose, initialPosition, isActive, onActivate, onExpand, onContentChange }) {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [textContent, setTextContent] = useState(content || '')
  // Untitled notepads should be editable by default
  const [isEditable, setIsEditable] = useState(title === 'Untitled - Notepad')
  const windowRef = useRef(null)

  // Sync textContent with content prop when it changes
  useEffect(() => {
    setTextContent(content || '')
  }, [content])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
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
      if (onActivate) {
        onActivate(id)
      }
    }
  }

  const handleClick = (e) => {
    // Don't activate if clicking on title bar, close button, or expand button
    if (e.target.closest('.notepad-title-bar') || 
        e.target.closest('.notepad-close-x') ||
        e.target.closest('.notepad-expand')) {
      return
    }
    if (onActivate) {
      onActivate(id)
    }
  }

  return (
    <div
      ref={windowRef}
      className="notepad-popup"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isActive ? 2501 : 2500
      }}
      onClick={handleClick}
    >
      <img src="/notepad_popup.png" alt="Notepad" className="notepad-background" />
      <div className="notepad-title-bar" onMouseDown={handleTitleBarMouseDown}>
        <span className="notepad-title">{title}</span>
      </div>
      <button className="notepad-expand" onClick={(e) => { e.stopPropagation(); if (onExpand) onExpand(id); }} aria-label="Expand">
      </button>
      {isEditable ? (
        <textarea
          className="notepad-content"
          value={textContent.replace(/<[^>]*>/g, '')}
          onChange={(e) => {
            const newContent = e.target.value
            setTextContent(newContent)
            if (onContentChange) {
              onContentChange(newContent)
            }
          }}
          placeholder=""
          onBlur={() => {
            // Only auto-close edit mode for documents (not untitled notepads)
            if (title !== 'Untitled - Notepad') {
              setIsEditable(false)
            }
          }}
          autoFocus={title === 'Untitled - Notepad'}
        />
      ) : (
        <div
          className="notepad-content notepad-content-display"
          dangerouslySetInnerHTML={{ __html: textContent }}
          onDoubleClick={() => setIsEditable(true)}
        />
      )}
      <button className="notepad-close-x" onClick={onClose} aria-label="Close">
      </button>
    </div>
  )
}

export default NotepadPopup

