import React from 'react'
import './WindowsIcon.css'

function WindowsIcon({ icon, title, onIconClick }) {
  return (
    <div className="windows-icon" onClick={onIconClick}>
      <img src={icon} alt={title} className="icon-image" />
      <span className="icon-title">{title}</span>
    </div>
  )
}

export default WindowsIcon

