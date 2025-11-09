import React, { useEffect, useState } from 'react'
import HomeBar from '../components/HomeBar'
import WelcomeModal from '../components/WelcomeModal'
import WindowsIcon from '../components/WindowsIcon'
import PopupModal from '../components/PopupModal'
import NotepadPopup from '../components/NotepadPopup'
import { loadMarkdownFile, getDocumentName } from '../utils/markdownLoader'
import './InfoPage.css'

// Configuration: List of markdown files in each folder
// Add new markdown files here as you create them
const PROJECTS_FILES = ['Robo-Car', 'Charge-Simulation', 'MNIST']
const EXPERIENCE_FILES = ['Ford', 'Genesys', 'PillarToPost']

function InfoPage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const [showProjectsPopup, setShowProjectsPopup] = useState(false)
  const [showInternshipPopup, setShowInternshipPopup] = useState(false)
  const [notepads, setNotepads] = useState([])
  const [nextNotepadId, setNextNotepadId] = useState(1)
  const [projectsDocuments, setProjectsDocuments] = useState([])
  const [internshipsDocuments, setInternshipsDocuments] = useState([])
  const [activeWindowId, setActiveWindowId] = useState(null)
  const [projectsPopupPosition, setProjectsPopupPosition] = useState(null)
  const [internshipsPopupPosition, setInternshipsPopupPosition] = useState(null)

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

  // Load projects documents
  useEffect(() => {
    const loadProjects = async () => {
      const documents = await Promise.all(
        PROJECTS_FILES.map(async (filename, index) => {
          const name = getDocumentName(filename)
          const startX = 300
          const spacing = 100
          return {
            filename,
            name,
            folder: 'projects',
            content: '', // Will be loaded when clicked
            position: { x: startX + (index * spacing), y: 150 }
          }
        })
      )
      setProjectsDocuments(documents)
    }
    loadProjects()
  }, [])

  // Load experience documents
  useEffect(() => {
    const loadExperience = async () => {
      const documents = await Promise.all(
        EXPERIENCE_FILES.map(async (filename, index) => {
          const name = getDocumentName(filename)
          const startX = 300
          const spacing = 100
          return {
            filename,
            name,
            folder: 'experience',
            content: '', // Will be loaded when clicked
            position: { x: startX + (index * spacing), y: 150 }
          }
        })
      )
      setInternshipsDocuments(documents)
    }
    loadExperience()
  }, [])

  const handleCloseModal = () => {
    setShowWelcomeModal(false)
  }

  const handleProjectsClick = () => {
    if (!projectsPopupPosition) {
      // Center on screen - account for scale (800px * 1.2 = 960px width, ~600px * 1.2 = 720px height)
      const scaledWidth = 800 * 1.2
      const scaledHeight = 600 * 1.2
      const centerX = (window.innerWidth / 2) - (scaledWidth / 2)
      const centerY = (window.innerHeight / 2) - (scaledHeight / 2) + 50 // Move down by 50px
      setProjectsPopupPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
    }
    setShowProjectsPopup(true)
    setActiveWindowId('projects')
  }

  const handleCloseProjectsPopup = () => {
    setShowProjectsPopup(false)
    if (activeWindowId === 'projects') {
      setActiveWindowId(null)
    }
  }

  const handleResumeClick = () => {
    window.open('/resume_2B.pdf', '_blank')
  }

  const handleInternshipClick = () => {
    if (!internshipsPopupPosition) {
      // Center on screen - account for scale (800px * 1.2 = 960px width, ~600px * 1.2 = 720px height)
      const scaledWidth = 800 * 1.2
      const scaledHeight = 600 * 1.2
      const centerX = (window.innerWidth / 2) - (scaledWidth / 2)
      const centerY = (window.innerHeight / 2) - (scaledHeight / 2) + 50 // Move down by 50px
      setInternshipsPopupPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
    }
    setShowInternshipPopup(true)
    setActiveWindowId('internships')
  }

  const handleCloseInternshipPopup = () => {
    setShowInternshipPopup(false)
    if (activeWindowId === 'internships') {
      setActiveWindowId(null)
    }
  }

  const handleNotepadClick = () => {
    const newId = nextNotepadId
    const position = {
      x: 100 + (notepads.length * 30),
      y: 100 + (notepads.length * 30)
    }
    const newNotepad = {
      id: newId,
      title: 'Untitled - Notepad',
      content: '',
      position: position
    }
    setNotepads([...notepads, newNotepad])
    setActiveWindowId(newId)
    setNextNotepadId(newId + 1)
  }

  const handleContactClick = () => {
    window.location.href = 'mailto:shreyapawarmamidi@gmail.com'
  }

  const handleGithubClick = () => {
    window.open('https://github.com/shr3yu', '_blank')
  }

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/shreya-pawar-mamidi-b27672283', '_blank')
  }

  const handleDocumentClick = async (doc) => {
    const newId = nextNotepadId
    const position = {
      x: 100 + (notepads.length * 30),
      y: 100 + (notepads.length * 30)
    }
    
    // Load markdown content from the document's folder
    const content = await loadMarkdownFile(doc.folder, doc.filename)
    
    const newNotepad = {
      id: newId,
      title: `${doc.name} - Notepad`,
      content: content,
      position: position
    }
    setNotepads([...notepads, newNotepad])
    setActiveWindowId(newId)
    setNextNotepadId(newId + 1)
  }

  const handleCloseNotepad = (id) => {
    setNotepads(notepads.filter(notepad => notepad.id !== id))
    if (activeWindowId === id) {
      setActiveWindowId(null)
    }
  }

  const handleWindowClick = (windowId) => {
    setActiveWindowId(windowId)
  }

  // Build windows array for taskbar
  const windows = []
  if (showProjectsPopup) {
    windows.push({ id: 'projects', title: 'Projects', icon: '/projects.png' })
  }
  if (showInternshipPopup) {
    windows.push({ id: 'internships', title: 'Internships', icon: '/internship.png' })
  }
  notepads.forEach(notepad => {
    windows.push({ id: notepad.id, title: notepad.title, icon: '/notepad.png' })
  })

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
      <div className="desktop-icons-container" style={{
        padding: '20px',
        gap: '40px'
      }}>
        <div className="desktop-icons" style={{
          gap: '20px'
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
          <WindowsIcon 
            icon="/email.png"
            title="Contact"
            onIconClick={handleContactClick}
          />
        </div>
        <div className="desktop-icons" style={{
          gap: '20px'
        }}>
          <WindowsIcon 
            icon="/github.png"
            title="Github"
            onIconClick={handleGithubClick}
          />
          <WindowsIcon 
            icon="/linkedin.png"
            title="LinkedIn"
            onIconClick={handleLinkedInClick}
          />
        </div>
      </div>

      <HomeBar 
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleWindowClick}
      />
      {showWelcomeModal && <WelcomeModal onClose={handleCloseModal} />}
      {showProjectsPopup && (
        <PopupModal 
          id="projects"
          popupImage="/projects_popup.png" 
          onClose={handleCloseProjectsPopup}
          documents={projectsDocuments}
          onDocumentClick={handleDocumentClick}
          isActive={activeWindowId === 'projects'}
          onActivate={handleWindowClick}
          initialPosition={projectsPopupPosition}
          onPositionChange={setProjectsPopupPosition}
        />
      )}
      {showInternshipPopup && (
        <PopupModal 
          id="internships"
          popupImage="/internship_popup.png" 
          onClose={handleCloseInternshipPopup}
          documents={internshipsDocuments}
          onDocumentClick={handleDocumentClick}
          isActive={activeWindowId === 'internships'}
          onActivate={handleWindowClick}
          initialPosition={internshipsPopupPosition}
          onPositionChange={setInternshipsPopupPosition}
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
          isActive={activeWindowId === notepad.id}
          onActivate={handleWindowClick}
        />
      ))}
    </div>
  )
}

export default InfoPage

