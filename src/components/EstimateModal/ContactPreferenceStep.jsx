import React, { useState } from 'react'

function ContactPreferenceStep({ estimateData, updateEstimateData, onNext, onPrev, addUserMessage, addBotMessage }) {
  const [contactPreference, setContactPreference] = useState(estimateData.contactPreference || '')

  const handlePreferenceSelect = (preference) => {
    setContactPreference(preference)
    updateEstimateData({ contactPreference: preference })

    // Add user message to chat
    if (addUserMessage) {
      const preferenceText = preference === 'phone' ? '📞 Call Me' :
                             preference === 'email' ? '✉️ Email Me' :
                             '⏰ We\'ll Contact You'
      addUserMessage(preferenceText)
    }

    // Auto-advance after selection
    setTimeout(() => {
      onNext()
    }, 300)
  }

  const getPhoneNumber = () => {
    return estimateData.customerInfo?.phone || '(908) 361-2183'
  }

  const getEmailAddress = () => {
    return estimateData.customerInfo?.email || 'Mafairhvac@gmail.com'
  }

  return (
    <div className="contact-preference-step">
      <div className="step-header">
        <h3>How would you like us to contact you?</h3>
        <p>Choose your preferred contact method for follow-up</p>
      </div>

      <div className="contact-preference-options">
        <button
          className={`preference-option ${contactPreference === 'phone' ? 'selected' : ''}`}
          onClick={() => handlePreferenceSelect('phone')}
        >
          <div className="preference-icon">📞</div>
          <div className="preference-content">
            <h4>Call Me</h4>
            <p>We'll call you directly at your phone number</p>
            <a 
              href={`tel:${getPhoneNumber().replace(/\D/g, '')}`} 
              className="contact-link"
              onClick={(e) => e.stopPropagation()}
            >
              {getPhoneNumber()}
            </a>
          </div>
        </button>

        <button
          className={`preference-option ${contactPreference === 'email' ? 'selected' : ''}`}
          onClick={() => handlePreferenceSelect('email')}
        >
          <div className="preference-icon">✉️</div>
          <div className="preference-content">
            <h4>Email Me</h4>
            <p>We'll send you an email with your estimate details</p>
            <a 
              href={`mailto:${getEmailAddress()}`} 
              className="contact-link"
              onClick={(e) => e.stopPropagation()}
            >
              {getEmailAddress()}
            </a>
          </div>
        </button>

        <button
          className={`preference-option ${contactPreference === 'wait' ? 'selected' : ''}`}
          onClick={() => handlePreferenceSelect('wait')}
        >
          <div className="preference-icon">⏰</div>
          <div className="preference-content">
            <h4>We'll Contact You</h4>
            <p>We'll reach out to you soon using your preferred method</p>
            <span className="contact-message">We'll be in touch soon!</span>
          </div>
        </button>
      </div>

      <div className="step-actions">
        <button type="button" className="step-button secondary" onClick={onPrev}>
          ← Back
        </button>
      </div>
    </div>
  )
}

export default ContactPreferenceStep




