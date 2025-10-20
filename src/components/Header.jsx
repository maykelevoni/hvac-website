import React from 'react'

function Header({ currentPage, setCurrentPage, openEstimateModal }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>🌬️ Mafair HVAC</h1>
            <p className="tagline">Installation - Service</p>
          </div>
          <div className="header-contact">
            <a href="tel:9083612183" className="header-phone">📞 (908) 361-2183</a>
            <a href="tel:9087088495" className="header-phone">📞 (908) 708-8495</a>
          </div>
          <nav className="nav">
            <button
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
            <button
              className={`nav-link ${currentPage === 'service' ? 'active' : ''}`}
              onClick={openEstimateModal}
            >
              Get Free Estimate
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
