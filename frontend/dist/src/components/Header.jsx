import React from 'react';

export default function Header({ setActiveTab }) {
  return (
    <header className="top-header">
      <div className="header-title-area">
        <h1>Health Insurance Pre-Authorisation Desk</h1>
        <p>AI-powered coverage recommendation with evidence from policy documents</p>
      </div>
      <div className="header-nav">
        <div className="status-badge">
          <div className="status-dot"></div>
          System Healthy
        </div>
        <span className="nav-link" onClick={() => setActiveTab('dashboard')}>
          🏠 Dashboard
        </span>
        <span className="nav-link" onClick={() => setActiveTab('monitoring')}>
          📊 Monitoring
        </span>
        <a className="nav-link" href="http://localhost:8000/docs" target="_blank" rel="noreferrer">
          📖 API Docs
        </a>
        <span className="nav-link" onClick={() => setActiveTab('settings')}>
          ⚙️
        </span>
      </div>
    </header>
  );
}
