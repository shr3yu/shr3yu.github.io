import React, { useEffect, useState } from 'react'
import HomeBar from '../components/HomeBar'
import WelcomeModal from '../components/WelcomeModal'
import WindowsIcon from '../components/WindowsIcon'
import PopupModal from '../components/PopupModal'
import './InfoPage.css'

function InfoPage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const [showProjectsPopup, setShowProjectsPopup] = useState(false)

  useEffect(() => {
    // Set custom cursor on body and html when component mounts
    const setCursor = () => {
      const cursorStyle = 'url(/mouse.png) 0 0, auto'
      document.body.style.cursor = cursorStyle
      document.documentElement.style.cursor = cursorStyle
    }
    
    setCursor()
    
    // Cleanup: restore default cursor when component unmounts
    return () => {
      document.body.style.cursor = 'auto'
      document.documentElement.style.cursor = 'auto'
    }
  }, [])

  const handleCloseModal = () => {
    setShowWelcomeModal(false)
  }

  const handleProjectsClick = () => {
    setShowProjectsPopup(true)
  }

  const handleCloseProjectsPopup = () => {
    setShowProjectsPopup(false)
  }

  const handleResumeClick = () => {
    window.open('/resume_2B.pdf', '_blank')
  }

  return (
    <div className="info-page-container" style={{
      backgroundColor: '#008081',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      paddingBottom: '38px',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'auto',
      cursor: 'url(/mouse.png), auto'
    }}>
      <div className="desktop-icons" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '10px'
      }}>
        <WindowsIcon 
          icon="/projects.png"
          title="Projects"
          onIconClick={handleProjectsClick}
        />
        <WindowsIcon 
          icon="/resume.png"
          title="Resume"
          onIconClick={handleResumeClick}
        />
      </div>

      <HomeBar />
      {showWelcomeModal && <WelcomeModal onClose={handleCloseModal} />}
      {showProjectsPopup && <PopupModal popupImage="/projects_popup.png" onClose={handleCloseProjectsPopup} />}
    </div>
  )
}

export default InfoPage

