import React from 'react'
import Gallery from '../components/Gallery'
import { BUSINESS_INFO } from '../config/business'
import { Link } from 'react-router-dom'

function Home({ openEstimateModal }) {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Professional HVAC Services in {BUSINESS_INFO.location.state}</h1>
            <p className="hero-description">
              Expert installation, repair & maintenance for all heating and cooling systems.
              Licensed, insured, and trusted by homeowners across New Jersey.
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={openEstimateModal}>
                💬 Chat with Us - Get Instant Estimate
              </button>
              <a href={`tel:${BUSINESS_INFO.phone.primary}`} className="cta-button secondary">
                📞 {BUSINESS_INFO.phone.primaryFormatted} - {BUSINESS_INFO.phone.primaryName}
              </a>
              <a href={`tel:${BUSINESS_INFO.phone.secondary}`} className="cta-button secondary">
                📞 {BUSINESS_INFO.phone.secondaryFormatted} - {BUSINESS_INFO.phone.secondaryName}
              </a>
            </div>
            <div className="hero-features">
              <span>✓ Licensed & Insured</span>
              <span>✓ Same-Day Service</span>
              <span>✓ Transparent Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="services-quick">
        <div className="container">
          <h2>What We Do</h2>
          <p className="section-subtitle">Comprehensive HVAC solutions for your home or business</p>
          <div className="services-grid-compact">
            <div className="service-item">
              <div className="service-icon">❄️</div>
              <h3>AC Installation</h3>
              <p>Central AC, Mini Splits & Ductless Systems</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🔥</div>
              <h3>Heating Systems</h3>
              <p>Furnaces, Boilers & Heat Pumps</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🔧</div>
              <h3>Repair & Service</h3>
              <p>All Makes & Models - Fast Response</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🏢</div>
              <h3>Commercial HVAC</h3>
              <p>Rooftop Units & Large Systems</p>
            </div>
          </div>
          <div className="cta-center">
            <Link to="/pricing" className="cta-button secondary">
              View All Services & Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Contact CTA */}
      <section className="contact-banner">
        <div className="container">
          <div className="contact-content">
            <h2>📞 Need HVAC Service Today?</h2>
            <p>Get in touch with our team for fast, reliable service</p>
            <div className="contact-buttons">
              <button className="cta-button primary" onClick={openEstimateModal}>
                💬 Start Chat for Free Estimate
              </button>
              <a href={`tel:${BUSINESS_INFO.phone.primary}`} className="contact-phone">
                📞 {BUSINESS_INFO.phone.primaryFormatted}
              </a>
            </div>
            <p className="contact-email">
              Or email us: <a href={`mailto:${BUSINESS_INFO.email.primary}`}>{BUSINESS_INFO.email.primary}</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
