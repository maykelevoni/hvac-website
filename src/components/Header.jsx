import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BUSINESS_INFO } from '../config/business'

function Header({ openEstimateModal }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header-professional">
      <div className="container">
        <div className="header-layout">
          {/* Logo Section */}
          <Link to="/" className="brand">
            <div className="brand-logo">🌬️</div>
            <div className="brand-text">
              <div className="brand-name">{BUSINESS_INFO.name}</div>
              <div className="brand-tagline">Licensed HVAC Contractors</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link
              to="/"
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={`nav-item ${location.pathname === '/pricing' ? 'active' : ''}`}
            >
              Services & Pricing
            </Link>
            <button
              className="cta-button-header primary"
              onClick={openEstimateModal}
            >
              💬 Chat for Estimate
            </button>
            <a href={`tel:${BUSINESS_INFO.phone.primary}`} className="cta-button-header secondary">
              📞 Call Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="nav-mobile">
            <Link
              to="/"
              className={`nav-item-mobile ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={`nav-item-mobile ${location.pathname === '/pricing' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services & Pricing
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone.primary}`} className="nav-item-mobile">
              Call: {BUSINESS_INFO.phone.primaryFormatted}
            </a>
            <button
              className="cta-button-mobile"
              onClick={() => {
                setMobileMenuOpen(false)
                openEstimateModal()
              }}
            >
              Get Free Estimate
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
