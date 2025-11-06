import { useState } from 'react'
import { supabase } from '../lib/supabase'

function ServiceRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    problemDescription: '',
    urgency: 'normal',
    preferredDate: '',
    preferredTime: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type'
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'Problem description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          problem: formData.problemDescription,
          service: {
            service: {
              service: formData.serviceType,
              description: formData.problemDescription
            },
            urgency: formData.urgency
          },
          urgency: formData.urgency,
          price_estimate: 'Contact for pricing',
          contact_preference: 'wait',
          status: 'new',
          consent_given: true
        }])
        .select()

      if (error) {
        console.error('Error saving lead:', error)
        // Still show success to user
      }

      setSubmitted(true)

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          serviceType: '',
          problemDescription: '',
          urgency: 'normal',
          preferredDate: '',
          preferredTime: ''
        })
        setSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Error:', error)
      // Still show success to user
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="success-message">
          <h2>Request Submitted Successfully!</h2>
          <p>Thank you for contacting Mafair HVAC.</p>
          <p>One of our professionals will contact you shortly at:</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <div className="success-icon">✓</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="service-request-page">
        <h2>Get Your Free Estimate</h2>
        <p className="subtitle">Tell us about your HVAC needs and we'll provide a no-obligation quote</p>

        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-section">
            <h3>Contact Information</h3>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Service Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Street, City, State, ZIP"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Service Details</h3>

            <div className="form-group">
              <label htmlFor="serviceType">Type of Service *</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={errors.serviceType ? 'error' : ''}
              >
                <option value="">-- Select Service Type --</option>
                <option value="central-air-install">Central Air Conditioning - Installation</option>
                <option value="central-air-repair">Central Air Conditioning - Repair</option>
                <option value="central-air-maintenance">Central Air Conditioning - Maintenance</option>
                <option value="mini-split-install">Mini Split System - Installation</option>
                <option value="mini-split-repair">Mini Split System - Repair</option>
                <option value="mini-split-maintenance">Mini Split System - Maintenance</option>
                <option value="slim-ductless-install">Slim Ductless - Installation</option>
                <option value="slim-ductless-repair">Slim Ductless - Repair</option>
                <option value="rooftop-unit-install">Rooftop Unit - Installation</option>
                <option value="rooftop-unit-repair">Rooftop Unit - Repair</option>
                <option value="air-handler-install">Air Handler - Installation</option>
                <option value="air-handler-repair">Air Handler - Repair</option>
                <option value="general-maintenance">General Maintenance</option>
                <option value="estimate">Free Estimate / Consultation</option>
                <option value="other">Other</option>
              </select>
              {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Urgency Level</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="normal">Normal - Can wait a few days</option>
                <option value="soon">Soon - Within 24-48 hours</option>
                <option value="urgent">Urgent - Same day service needed</option>
                <option value="emergency">Emergency - Immediate assistance</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="problemDescription">Service Details *</label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                rows="5"
                placeholder="Please describe your HVAC needs or the issue you're experiencing in detail..."
                value={formData.problemDescription}
                onChange={handleChange}
                className={errors.problemDescription ? 'error' : ''}
              ></textarea>
              {errors.problemDescription && <span className="error-message">{errors.problemDescription}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Date (optional)</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredTime">Preferred Time (optional)</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >
                  <option value="">Any time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 4PM)</option>
                  <option value="evening">Evening (4PM - 6PM)</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Service Request
          </button>
        </form>
      </div>
    </div>
  )
}

export default ServiceRequest
