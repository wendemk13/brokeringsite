import React, { useState } from 'react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          <h1>Bet<span>Gebeya</span></h1>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i><h1 style={{color:"red"}}>bar</h1>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a href="#" className="active moblink">Home</a>
        <a href="#" className='moblink'>Properties</a>
        <a href="#" className='moblink'>Cars</a>
        <a href="#" className='moblink'>Agents</a>
        <a href="#" className='moblink'>About</a>
        <a href="#" className='moblink'>Contact</a>
      </nav>

      {/* User Actions */}
      <div className={`user-actions ${menuOpen ? 'active' : ''}`}>
        <a href="#" className="btn btn-chatbot" id="chatbot-button">
          <i className="fas fa-robot"></i> Support
        </a>
        <i className="fas fa-search search-toggle"></i>
        <a href="#" className="btn btn-outline">Login</a>
        <a href="#" className="btn btn-primary">Register</a>
      </div>
    </header>
  );
}

export default Header;
