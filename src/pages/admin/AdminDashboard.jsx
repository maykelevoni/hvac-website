import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import LeadDetails from '../../components/admin/LeadDetails'

function AdminDashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    visited: 0,
    closed: 0,
    give_up: 0
  })

  useEffect(() => {
    fetchLeads()
    subscribeToLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching leads:', error)
        return
      }

      setLeads(data || [])
      calculateStats(data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  const subscribeToLeads = () => {
    const channel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          console.log('Change received:', payload)
          fetchLeads()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const calculateStats = (leadsData) => {
    const newStats = {
      total: leadsData.length,
      new: 0,
      contacted: 0,
      visited: 0,
      closed: 0,
      give_up: 0
    }

    leadsData.forEach(lead => {
      if (lead.status) {
        newStats[lead.status] = (newStats[lead.status] || 0) + 1
      }
    })

    setStats(newStats)
  }

  const handleStatusUpdate = (leadId, newStatus) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    )
    fetchLeads() // Refresh to get updated stats
  }

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status) => {
    const colors = {
      new: '#3b82f6',
      contacted: '#f59e0b',
      visited: '#8b5cf6',
      closed: '#10b981',
      give_up: '#ef4444'
    }
    const labels = {
      new: '🆕 New',
      contacted: '📞 Contacted',
      visited: '🏠 Visited',
      closed: '✅ Closed',
      give_up: '❌ Give Up'
    }
    return (
      <span 
        className="status-badge"
        style={{ backgroundColor: colors[status] || '#6b7280' }}
      >
        {labels[status] || status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading leads...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <h1>Leads Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Leads</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.new}</div>
          <div className="stat-label">New Leads</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.contacted}</div>
          <div className="stat-label">Contacted</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.visited}</div>
          <div className="stat-label">Visited</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.closed}</div>
          <div className="stat-label">Closed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.give_up}</div>
          <div className="stat-label">Give Up</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="visited">Visited</option>
            <option value="closed">Closed</option>
            <option value="give_up">Give Up</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="leads-table-container">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Problem</th>
              <th>Service</th>
              <th>Price Estimate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td data-label="Date">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td data-label="Name">{lead.name}</td>
                  <td data-label="Contact">
                    <div className="contact-info">
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      <br />
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </div>
                  </td>
                  <td data-label="Problem" className="problem-cell">
                    {lead.problem?.substring(0, 50)}
                    {lead.problem?.length > 50 ? '...' : ''}
                  </td>
                  <td data-label="Service">
                    {lead.service?.service?.service || 'N/A'}
                  </td>
                  <td data-label="Price">{lead.price_estimate || 'N/A'}</td>
                  <td data-label="Status">{getStatusBadge(lead.status)}</td>
                  <td data-label="">
                    <button
                      className="view-details-btn"
                      onClick={() => setSelectedLead(lead)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}

export default AdminDashboard



