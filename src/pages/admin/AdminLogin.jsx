import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import bcrypt from 'bcryptjs'

function AdminLogin() {
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkIfAdminExists()
  }, [])

  const checkIfAdminExists = async () => {
    try {
      // If supabase client doesn't exist, show first-time setup
      if (!supabase) {
        console.warn('Supabase not initialized')
        setIsFirstTimeSetup(true)
        return
      }

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )

      const queryPromise = supabase
        .from('admins')
        .select('*', { count: 'exact', head: true })

      const { count, error } = await Promise.race([queryPromise, timeoutPromise])

      if (error) {
        console.error('Error checking admins:', error)
        // If table doesn't exist, show first-time setup
        setIsFirstTimeSetup(true)
        return
      }

      setIsFirstTimeSetup(count === 0)
    } catch (error) {
      console.error('Error:', error)
      // On timeout or any error, show first-time setup
      setIsFirstTimeSetup(true)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleFirstTimeSetup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      // Hash password
      const salt = bcrypt.genSaltSync(10)
      const passwordHash = bcrypt.hashSync(formData.password, salt)

      // Insert admin
      const { data, error } = await supabase
        .from('admins')
        .insert([{
          email: formData.email,
          password_hash: passwordHash
        }])
        .select()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Set session
      const sessionExpiry = Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      localStorage.setItem('admin_session', 'authenticated')
      localStorage.setItem('admin_session_expiry', sessionExpiry.toString())
      localStorage.setItem('admin_email', formData.email)

      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to create admin account. Please try again.')
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    try {
      // Get admin by email
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', formData.email)
        .single()

      if (error || !data) {
        setError('Invalid email or password')
        setLoading(false)
        return
      }

      // Verify password
      const isValid = bcrypt.compareSync(formData.password, data.password_hash)

      if (!isValid) {
        setError('Invalid email or password')
        setLoading(false)
        return
      }

      // Set session
      const sessionExpiry = Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      localStorage.setItem('admin_session', 'authenticated')
      localStorage.setItem('admin_session_expiry', sessionExpiry.toString())
      localStorage.setItem('admin_email', formData.email)

      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error:', error)
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  if (isFirstTimeSetup === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          {isFirstTimeSetup ? (
            <>
              <h2>First-Time Setup</h2>
              <p>Create your admin account to get started</p>
              <form onSubmit={handleFirstTimeSetup}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="admin@mafairhvac.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Minimum 6 characters"
                    minLength={6}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Re-enter password"
                    minLength={6}
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Admin Account'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2>Admin Login</h2>
              <p>Sign in to access the admin dashboard</p>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="admin@mafairhvac.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

