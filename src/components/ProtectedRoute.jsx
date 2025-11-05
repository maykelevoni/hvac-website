import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const adminSession = localStorage.getItem('admin_session')
    const sessionExpiry = localStorage.getItem('admin_session_expiry')
    const adminEmail = localStorage.getItem('admin_email')

    // First check: Basic localStorage validation
    if (!adminSession || !sessionExpiry || !adminEmail) {
      clearSession()
      setIsAuthenticated(false)
      setIsVerifying(false)
      return
    }

    // Second check: Session expiry
    const now = Date.now()
    if (now >= parseInt(sessionExpiry)) {
      clearSession()
      setIsAuthenticated(false)
      setIsVerifying(false)
      return
    }

    // Third check: Verify admin exists in database (server-side validation)
    try {
      if (!supabase) {
        console.warn('Supabase not initialized - skipping server validation')
        setIsAuthenticated(true)
        setIsVerifying(false)
        return
      }

      const { data, error } = await supabase
        .from('admins')
        .select('email')
        .eq('email', adminEmail)
        .single()

      if (error || !data) {
        console.warn('Admin not found in database - clearing session')
        clearSession()
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error verifying admin:', error)
      // On error, allow access but log warning
      console.warn('Could not verify admin - allowing access')
      setIsAuthenticated(true)
    } finally {
      setIsVerifying(false)
    }
  }

  const clearSession = () => {
    localStorage.removeItem('admin_session')
    localStorage.removeItem('admin_session_expiry')
    localStorage.removeItem('admin_email')
  }

  if (isVerifying) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div>Verifying authentication...</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          Please wait
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute



