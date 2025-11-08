import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  const [typingText, setTypingText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()
  
  const message = 'Click computer to power on'
  
  const handleComputerClick = () => {
    navigate('/bootingup')
  }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typingText.length < message.length) {
          setTypingText(message.substring(0, typingText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (typingText.length > 0) {
          setTypingText(message.substring(0, typingText.length - 1))
        } else {
          setIsDeleting(false)
        }
      }
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [typingText, isDeleting, message])
  
  return (
    <div className="landing-container" style={{
      backgroundImage: 'url(/paper_texture.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}> 
      <div className="title-container" style={{
        position: 'absolute',
        top: '10%',
        left: '8%',
        zIndex: 10
      }}>
        <div className="title-201" style={{
          fontSize: '225px',
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 900,
          color: '#800000',
          lineHeight: 1,
          marginBottom: 0
        }}>
          201
        </div>
        <div className="title-portfolio" style={{
          fontSize: '100px',
          fontFamily: "'ITC Benguiat', 'Benguiat', serif",
          fontWeight: 900,
          fontStyle: 'italic',
          color: '#1a1a2e',
          lineHeight: 1,
          marginTop: '-35px'
        }}>
          PORTFOLIO
        </div>
        
        {/* Console output section */}
        <div className="console-output" style={{
          marginTop: '50px',
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: '16px',
          color: '#1a1a2e',
          maxWidth: '600px',
          lineHeight: 1.8
        }}>
          <div style={{ color: '#800000' }}>{'>'} <span style={{ color: '#1a1a2e' }}>Shreya Pawar Mamidi</span></div>
          <div style={{ color: '#800000', marginTop: '8px' }}>{'>'} <span style={{ color: '#1a1a2e' }}>Computer Engineering @ University of Waterloo</span></div>
          <div style={{ color: '#800000', marginTop: '8px' }}>{'>'} <span style={{ color: '#1a1a2e' }}>Eager to develop future sustainable technologies</span></div>
          <div style={{ color: '#800000', marginTop: '8px' }}>{'>'} <span style={{ color: '#1a1a2e' }}>Always Tinkering! </span></div>
          <div className="typing-line" style={{ color: '#800000', marginTop: '8px' }}>
            {'>'} <span className="typing-text" style={{ color: '#1a1a2e' }}>{typingText}</span><span className="cursor">_</span>
          </div>
        </div>
      </div>
      
      {/* Computer setup on the right */}
      <div 
        className="computer-container"
        style={{
          position: 'absolute',
          right: '10%',
          top: '15%',
          zIndex: 5
        }}
      >
          <img 
            src="/computer.png" 
            alt="Retro computer setup" 
            className="computer-setup"
            onClick={handleComputerClick}
            style={{
              width: '525px',
              height: 'auto',
              maxWidth: '45vw',
              position: 'relative',
              zIndex: 3,
              cursor: 'pointer'
            }}
          />
        
        {/* Voltmeter on monitor */}
        <img 
          src="/voltmeter.png" 
          alt="Voltmeter" 
          className="name-tag"
          style={{
            position: 'absolute',
            top: '12px',
            right: '30px',
            width: '165px',
            height: 'auto',
            zIndex: 10,
            transform: 'rotate(8deg)',
            transformOrigin: 'center'
          }}
        />
        
        {/* Star on keyboard */}
        <img 
          src="/star.png" 
          alt="Star decoration" 
          className="star-img"
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '80px',
            width: '100px',
            height: 'auto',
            transform: 'rotate(-8deg)',
            zIndex: 10
          }}
        />
        
        {/* Retro car behind computer */}
        <img 
          src="/retrocar.png" 
          alt="Retro car" 
          className="books-img"
          style={{
            position: 'absolute',
            right: '-100px',
            bottom: '85px',
            width: '300px',
            height: 'auto',
            zIndex: 1,
            transform: 'rotate(10deg)',
            maxWidth: '25vw',
          }}
        />
        
        {/* Vinyl record */}
        <img 
          src="/vinyl.png" 
          alt="Vinyl record" 
          className="vinyl-img"
          style={{
            position: 'absolute',
            right: '390px',
            top: '220px',
            width: '205px',
            height: 'auto',
            zIndex: 1,
            maxWidth: '18vw'
          }}
        />
        </div>
    </div>
  )
}

export default LandingPage

