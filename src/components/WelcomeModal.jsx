import React from 'react'
import './WelcomeModal.css'

function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <img src="/welcome_popup.png" alt="Welcome" className="modal-background" />
        <div className="modal-content">
          <p className="modal-text">
            Inspired by the Windows 98 aesthetic, this site showcases my technical experience in software development, embedded systems, and QA analysis.
          </p>
          <p className="modal-text">
            Explore the desktop to learn more about my projects, internships, and extracurriculars. I highlight my technical contributions, key takeaways, problem-solving approach, and the impact of my work. 
          </p>
          <p className="modal-text">
            Explore to see what else this site has in store—and to return home, click the Start button and shut down the computer.
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
