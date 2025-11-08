import React, { useState, useRef, useEffect } from 'react'
import './NotepadPopup.css'

function NotepadPopup({ id, title, content, onClose, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [textContent, setTextContent] = useState(content || '')
  const windowRef = useRef(null)

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
    }
  }

  return (
    <div
      ref={windowRef}
      className="notepad-popup"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <img src="/notepad_popup.png" alt="Notepad" className="notepad-background" />
      <div className="notepad-title-bar" onMouseDown={handleTitleBarMouseDown}>
        <span className="notepad-title">{title}</span>
      </div>
      <textarea
        className="notepad-content"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder=""
      />
      <button className="notepad-close-x" onClick={onClose} aria-label="Close">
      </button>
    </div>
  )
}

export default NotepadPopup

