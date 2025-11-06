import React from 'react'
import { supabase } from '../../lib/supabase'

function LeadDetails({ lead, onClose, onStatusUpdate }) {
  const handleStatusChange = async (newStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', lead.id)

      if (error) {
        console.error('Error updating status:', error)
        alert('Failed to update status')
        return
      }

      if (onStatusUpdate) {
        onStatusUpdate(lead.id, newStatus)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to update status')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#3b82f6'
      case 'contacted': return '#f59e0b'
      case 'visited': return '#8b5cf6'
      case 'closed': return '#10b981'
      case 'give_up': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return '🆕 New'
      case 'contacted': return '📞 Contacted'
      case 'visited': return '🏠 Visited'
      case 'closed': return '✅ Closed'
      case 'give_up': return '❌ Give Up'
      default: return status
    }
  }

  if (!lead) return null

  return (
    <div className="lead-details-modal-overlay" onClick={onClose}>
      <div className="lead-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lead-details-header">
          <h2>Lead Details</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="lead-details-content">
          <div className="lead-info-section">
            <h3>Customer Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">{lead.name}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </span>
              </div>
              <div className="info-item">
                <span className="label">Phone:</span>
                <span className="value">
                  <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                </span>
              </div>
              <div className="info-item">
                <span className="label">Created:</span>
                <span className="value">
                  {new Date(lead.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="lead-info-section">
            <h3>Problem Description</h3>
            <p className="problem-text">{lead.problem}</p>
          </div>

          <div className="lead-info-section">
            <h3>Service Details</h3>
            {lead.service && lead.service.service && (
              <div className="service-info">
                <div className="service-item">
                  <span className="label">Service:</span>
                  <span className="value">{lead.service.service.service}</span>
                </div>
                <div className="service-item">
                  <span className="label">Description:</span>
                  <span className="value">{lead.service.service.description}</span>
                </div>
                <div className="service-item">
                  <span className="label">Urgency:</span>
                  <span className="value">{lead.urgency}</span>
                </div>
                <div className="service-item">
                  <span className="label">Price Estimate:</span>
                  <span className="value price-highlight">{lead.price_estimate || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>

          <div className="lead-info-section">
            <h3>Contact Preference</h3>
            <p>
              {lead.contact_preference === 'phone' && '📞 Call Me'}
              {lead.contact_preference === 'email' && '✉️ Email Me'}
              {lead.contact_preference === 'wait' && '⏰ We\'ll Contact You'}
              {!lead.contact_preference && 'Not specified'}
            </p>
          </div>

          <div className="lead-info-section">
            <h3>Status</h3>
            <div className="status-management">
              <div 
                className="current-status"
                style={{ backgroundColor: getStatusColor(lead.status) }}
              >
                Current: {getStatusLabel(lead.status)}
              </div>
              <div className="status-options">
                <h4>Update Status:</h4>
                <div className="status-buttons">
                  {['new', 'contacted', 'visited', 'closed', 'give_up'].map(status => (
                    <button
                      key={status}
                      className={`status-btn ${lead.status === status ? 'active' : ''}`}
                      onClick={() => handleStatusChange(status)}
                      style={lead.status === status ? { backgroundColor: getStatusColor(status) } : {}}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lead-actions">
            <a href={`tel:${lead.phone}`} className="action-btn phone-btn">
              📞 Call
            </a>
            <a href={`mailto:${lead.email}`} className="action-btn email-btn">
              ✉️ Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadDetails




