import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    localStorage.removeItem('admin_session_expiry')
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <h2>🌬️ Mafair HVAC Admin</h2>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link
              to="/admin/dashboard"
              className={`admin-nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/admin/leads"
              className={`admin-nav-link ${location.pathname === '/admin/leads' ? 'active' : ''}`}
            >
              📋 Leads
            </Link>
            <Link
              to="/admin/photos"
              className={`admin-nav-link admin-nav-link-desktop ${location.pathname === '/admin/photos' ? 'active' : ''}`}
            >
              📷 Photos
            </Link>
            <Link
              to="/admin/settings"
              className={`admin-nav-link admin-nav-link-desktop ${location.pathname === '/admin/settings' ? 'active' : ''}`}
            >
              ⚙️ Settings
            </Link>
          </nav>
        </aside>

        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout




