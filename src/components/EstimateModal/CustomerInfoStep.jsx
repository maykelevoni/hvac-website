import React, { useState, useEffect } from 'react'

function CustomerInfoStep({ estimateData, updateEstimateData, onNext, onPrev }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (estimateData.customerInfo) {
      setCustomerInfo(estimateData.customerInfo)
    }
  }, [estimateData.customerInfo])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\(\)]+$/
    const digitsOnly = phone.replace(/\D/g, '')
    return phoneRegex.test(phone) && digitsOnly.length >= 10
  }

  const validateForm = () => {
    const newErrors = {}

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (customerInfo.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Check if form is complete and valid for auto-advance
    setTimeout(() => {
      const updatedInfo = { ...customerInfo, [field]: value }
      const isValid = checkFormAutoSubmit(updatedInfo)
      if (isValid) {
        handleSubmit({ preventDefault: () => {} })
      }
    }, 100)
  }

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return value
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    handleInputChange('phone', formatted)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      updateEstimateData({ customerInfo })
      onNext()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = customerInfo.name.trim() && 
                     customerInfo.email.trim() && 
                     customerInfo.phone.trim() &&
                     !errors.name && 
                     !errors.email && 
                     !errors.phone

  const checkFormAutoSubmit = (info) => {
    // Check if all fields are filled
    if (!info.name.trim() || !info.email.trim() || !info.phone.trim()) {
      return false
    }
    
    // Validate email
    if (!validateEmail(info.email)) {
      return false
    }
    
    // Validate phone
    if (!validatePhone(info.phone)) {
      return false
    }
    
    // Validate name
    if (info.name.trim().length < 2) {
      return false
    }
    
    return true
  }

  return (
    <div className="customer-info-step">
      <div className="step-header">
        <h3>Your Contact Information</h3>
        <p>Provide your details so we can send you the estimate and contact you about your service</p>
      </div>

      <form onSubmit={handleSubmit} className="customer-info-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            value={customerInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            value={customerInfo.phone}
            onChange={handlePhoneChange}
            placeholder="(555) 123-4567"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="privacy-notice">
          <div className="privacy-icon">🔒</div>
          <div className="privacy-text">
            <h4>Your Privacy Matters</h4>
            <p>We respect your privacy and will never share your information. Your details are used solely to:</p>
            <ul>
              <li>Send your personalized estimate</li>
              <li>Coordinate service scheduling</li>
              <li>Provide important updates about your HVAC system</li>
            </ul>
          </div>
        </div>

        <div className="service-summary">
          <h4>Service Summary</h4>
          {estimateData.service && estimateData.service.service && (
            <div className="summary-content">
              <div className="summary-item">
                <span className="label">Problem:</span>
                <span className="value">{estimateData.problem}</span>
              </div>
              <div className="summary-item">
                <span className="label">Recommended Service:</span>
                <span className="value">{estimateData.service.service.service}</span>
              </div>
              <div className="summary-item">
                <span className="label">Urgency:</span>
                <span className="value">{estimateData.service.urgency}</span>
              </div>
            </div>
          )}
        </div>

        <div className="step-actions">
          <button type="button" className="step-button secondary" onClick={onPrev}>
            ← Back
          </button>
          <button 
            type="submit" 
            className="step-button primary"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Get My Estimate →'}
          </button>
        </div>
        <div className="auto-submit-notice">
          <p>📝 All fields will auto-submit when completed</p>
        </div>
      </form>
    </div>
  )
}

export default CustomerInfoStep
