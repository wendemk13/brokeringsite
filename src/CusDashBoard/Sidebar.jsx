import React from 'react';

function Sidebar({ darkMode, toggleDarkMode }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">🏠</span>
        <span>BrokerPro</span>
      </div>
      <a href="#" className="nav-item active">
        <i>📊</i>
        <span>Dashboard</span>
      </a>
      <a href="#" className="nav-item">
        <i>🚗</i>
        <span>Listings</span>
      </a>
      <a href="#" className="nav-item">
        <i>💬</i>
        <span>Messages</span>
      </a>
      <a href="#" className="nav-item">
        <i>📈</i>
        <span>Analytics</span>
      </a>
      <a href="#" className="nav-item">
        <i>⚙️</i>
        <span>Settings</span>
      </a>
      
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌓'}
      </button>
    </div>
  );
}

export default Sidebar;