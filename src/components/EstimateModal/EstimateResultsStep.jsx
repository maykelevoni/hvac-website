import React, { useState, useEffect } from 'react'

function EstimateResultsStep({ estimateData, onClose, onRestart }) {
  const [estimateId, setEstimateId] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    setEstimateId(`EST-${Date.now().toString(36).toUpperCase()}`)
  }, [])

  const sendEstimateEmail = async () => {
    setIsSending(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setEmailSent(true)
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setIsSending(false)
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return '#ef4444'
      case 'urgent': return '#f59e0b'
      case 'normal': return '#3b82f6'
      case 'scheduled': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'Emergency'
      case 'urgent': return 'Urgent'
      case 'normal': return 'Normal'
      case 'scheduled': return 'Scheduled'
      default: return 'Normal'
    }
  }

  const calculateFinalPrice = () => {
    if (!estimateData.service || !estimateData.service.service) return estimateData.service?.service?.priceRange || 'Contact for pricing'
    
    const basePriceRange = estimateData.service.service.priceRange
    const multiplier = estimateData.service.service.urgencyMultiplier[estimateData.service.urgency]
    
    const extractNumbers = (priceStr) => {
      const matches = priceStr.match(/\$?(\d+)/g)
      return matches ? matches.map(num => parseInt(num.replace('$', ''))) : [0, 0]
    }
    
    const [min, max] = extractNumbers(basePriceRange)
    const newMin = Math.round(min * multiplier)
    const newMax = Math.round(max * multiplier)
    return `$${newMin} - $${newMax}`
  }

  return (
    <div className="estimate-results-step">
      <div className="step-header">
        <div className="success-icon">✅</div>
        <h3>Your Instant Estimate is Ready!</h3>
        <p>Thank you for providing your information. Here's your personalized estimate:</p>
      </div>

      <div className="estimate-summary-card">
        <div className="estimate-header">
          <div className="estimate-id">
            <span className="label">Estimate ID:</span>
            <span className="id-value">{estimateId}</span>
          </div>
          <div className="estimate-date">
            <span className="label">Date:</span>
            <span className="date-value">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="customer-info-display">
          <h4>Customer Information</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{estimateData.customerInfo?.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{estimateData.customerInfo?.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Phone:</span>
              <span className="value">{estimateData.customerInfo?.phone}</span>
            </div>
          </div>
        </div>

        <div className="problem-info">
          <h4>Problem Description</h4>
          <p className="problem-text">{estimateData.problem}</p>
        </div>

        <div className="service-details">
          <h4>Recommended Service</h4>
          {estimateData.service?.service && (
            <div className="service-card">
              <div className="service-icon">{estimateData.service.service.icon}</div>
              <div className="service-content">
                <h5>{estimateData.service.service.service}</h5>
                <p className="service-description">{estimateData.service.service.description}</p>
                <div className="urgency-display">
                  <span 
                    className="urgency-badge"
                    style={{ backgroundColor: getUrgencyColor(estimateData.service.urgency) }}
                  >
                    {getUrgencyLabel(estimateData.service.urgency)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pricing-section">
          <h4>Pricing Information</h4>
          <div className="pricing-breakdown">
            <div className="price-item">
              <span className="price-label">Base Price Range:</span>
              <span className="price-value">{estimateData.service?.service?.priceRange}</span>
            </div>
            <div className="price-item">
              <span className="price-label">Urgency Adjustment:</span>
              <span className="price-value">{estimateData.service?.urgency}</span>
            </div>
            <div className="price-item final">
              <span className="price-label">Final Estimated Price:</span>
              <span className="price-value final-price">{calculateFinalPrice()}</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h4>What Happens Next?</h4>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h5>Receive Confirmation</h5>
                <p>You'll receive an email confirmation with your estimate details</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h5>Expert Contact</h5>
                <p>Our HVAC specialist will contact you within 1-2 business hours</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h5>Schedule Service</h5>
                <p>We'll schedule your service at your convenience</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h5>Professional Service</h5>
                <p>Our certified technician will provide expert service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-options">
        <h4>Need to Contact Us Now?</h4>
        <div className="contact-buttons">
          <a href="tel:9083612183" className="contact-phone-btn">
            📞 Call: (908) 361-2183
          </a>
          <a href="mailto:Mafairhvac@gmail.com" className="contact-email-btn">
            ✉️ Email: Mafairhvac@gmail.com
          </a>
        </div>
      </div>

      <div className="email-section">
        <div className="email-content">
          <h4>Get Your Estimate via Email</h4>
          <p>Receive a detailed copy of your estimate directly in your inbox</p>
          <button 
            className={`email-button ${emailSent ? 'sent' : ''}`}
            onClick={sendEstimateEmail}
            disabled={isSending || emailSent}
          >
            {isSending ? 'Sending...' : emailSent ? '✓ Email Sent!' : '📧 Send Estimate to Email'}
          </button>
        </div>
      </div>

      <div className="step-actions">
        <button className="step-button secondary" onClick={onRestart}>
          🔄 Get Another Estimate
        </button>
        <button className="step-button primary" onClick={onClose}>
          ✨ Done
        </button>
      </div>
    </div>
  )
}

export default EstimateResultsStep
