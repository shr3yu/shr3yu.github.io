import React from 'react'
import './PopupModal.css'

function PopupModal({ popupImage, onClose, documents = [], onDocumentClick }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-window" onClick={(e) => e.stopPropagation()}>
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

