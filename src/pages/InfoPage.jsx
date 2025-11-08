import React, { useEffect, useState } from 'react'
import HomeBar from '../components/HomeBar'
import WelcomeModal from '../components/WelcomeModal'
import WindowsIcon from '../components/WindowsIcon'
import PopupModal from '../components/PopupModal'
import NotepadPopup from '../components/NotepadPopup'
import './InfoPage.css'

function InfoPage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const [showProjectsPopup, setShowProjectsPopup] = useState(false)
  const [showInternshipPopup, setShowInternshipPopup] = useState(false)
  const [notepads, setNotepads] = useState([])
  const [nextNotepadId, setNextNotepadId] = useState(1)

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

  const handleInternshipClick = () => {
    setShowInternshipPopup(true)
  }

  const handleCloseInternshipPopup = () => {
    setShowInternshipPopup(false)
  }

  const handleNotepadClick = () => {
    if (notepads.length < 6) {
      const newId = nextNotepadId
      const position = {
        x: 100 + (notepads.length * 30),
        y: 100 + (notepads.length * 30)
      }
      setNotepads([...notepads, {
        id: newId,
        title: 'Untitled - Notepad',
        content: '',
        position: position
      }])
      setNextNotepadId(newId + 1)
    }
  }

  const handleDocumentClick = (doc) => {
    if (notepads.length < 6) {
      const newId = nextNotepadId
      const position = {
        x: 100 + (notepads.length * 30),
        y: 100 + (notepads.length * 30)
      }
      setNotepads([...notepads, {
        id: newId,
        title: `${doc.name} - Notepad`,
        content: doc.content || '',
        position: position
      }])
      setNextNotepadId(newId + 1)
    }
  }

  const handleCloseNotepad = (id) => {
    setNotepads(notepads.filter(notepad => notepad.id !== id))
  }

  // Define documents for projects and internships
  // Positions account for text space below icons (icon height 48px + margin 4px + text ~15px = ~67px total)
  const projectsDocuments = [
    { name: 'Project1', content: 'Project 1 details...', position: { x: 300, y: 150 } },
    { name: 'Project2', content: 'Project 2 details...', position: { x: 400, y: 150 } },
    { name: 'Project3', content: 'Project 3 details...', position: { x: 500, y: 150 } }
  ]

  const internshipsDocuments = [
    { name: 'Internship1', content: 'Internship 1 details...', position: { x: 300, y: 150 } },
    { name: 'Internship2', content: 'Internship 2 details...', position: { x: 400, y: 150 } }
  ]

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
        <WindowsIcon 
          icon="/internship.png"
          title="Internships"
          onIconClick={handleInternshipClick}
        />
        <WindowsIcon 
          icon="/notepad.png"
          title="Notepad"
          onIconClick={handleNotepadClick}
        />
      </div>

      <HomeBar />
      {showWelcomeModal && <WelcomeModal onClose={handleCloseModal} />}
      {showProjectsPopup && (
        <PopupModal 
          popupImage="/projects_popup.png" 
          onClose={handleCloseProjectsPopup}
          documents={projectsDocuments}
          onDocumentClick={handleDocumentClick}
        />
      )}
      {showInternshipPopup && (
        <PopupModal 
          popupImage="/internship_popup.png" 
          onClose={handleCloseInternshipPopup}
          documents={internshipsDocuments}
          onDocumentClick={handleDocumentClick}
        />
      )}
      {notepads.map(notepad => (
        <NotepadPopup
          key={notepad.id}
          id={notepad.id}
          title={notepad.title}
          content={notepad.content}
          onClose={() => handleCloseNotepad(notepad.id)}
          initialPosition={notepad.position}
        />
      ))}
    </div>
  )
}

export default InfoPage

