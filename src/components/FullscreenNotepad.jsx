import React, { useState, useEffect } from 'react'
import './FullscreenNotepad.css'

function FullscreenNotepad({ title, content, onClose, onMinimize, onContentChange, isEditable }) {
  const [textContent, setTextContent] = useState(content || '')
  const editable = isEditable || title === 'Untitled - Notepad'

  useEffect(() => {
    setTextContent(content || '')
  }, [content])

  const handleTextChange = (e) => {
    const newContent = e.target.value
    setTextContent(newContent)
    if (onContentChange) {
      onContentChange(newContent)
    }
  }

  return (
    <div className="fullscreen-notepad-overlay">
      <div className="fullscreen-notepad-window">
        <div className="fullscreen-notepad-title-bar">
          <div className="fullscreen-notepad-title-content">
            <img src="/notepad.png" alt="Notepad" className="fullscreen-notepad-icon" />
            <span className="fullscreen-notepad-title-text">{title}</span>
          </div>
          <div className="fullscreen-notepad-controls">
            <button className="fullscreen-notepad-minimize" onClick={onMinimize} aria-label="Minimize">
              <span>−</span>
            </button>
            <button className="fullscreen-notepad-close" onClick={onClose} aria-label="Close">
              <span>×</span>
            </button>
          </div>
        </div>
        <div className="fullscreen-notepad-menu-bar">
          <span>File</span>
          <span>Edit</span>
          <span>Search</span>
          <span>Help</span>
        </div>
        <div className="fullscreen-notepad-content">
          {editable ? (
            <textarea
              className="fullscreen-notepad-content-editable"
              value={textContent.replace(/<[^>]*>/g, '')}
              onChange={handleTextChange}
              placeholder=""
              autoFocus
            />
          ) : (
            <div
              className="fullscreen-notepad-content-display"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FullscreenNotepad

