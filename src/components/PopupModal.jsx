import React from 'react'
import './PopupModal.css'

function PopupModal({ popupImage, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-window" onClick={(e) => e.stopPropagation()}>
        <img src={popupImage} alt="Popup" className="popup-background" />
        <button className="popup-close-x" onClick={onClose} aria-label="Close">
        </button>
      </div>
    </div>
  )
}

export default PopupModal

