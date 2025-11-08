import React from 'react'
import './WelcomeModal.css'

function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <img src="/welcome_popup.png" alt="Welcome" className="modal-background" />
        <div className="modal-content">
          <p className="modal-text">
            Welcome to my portfolio! Explore my projects, skills, and experiences. 
            Click around to discover more about my work in computer engineering and 
            my passion for developing sustainable technologies.
          </p>
          <button className="modal-close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal
