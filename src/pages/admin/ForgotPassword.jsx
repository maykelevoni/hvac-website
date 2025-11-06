import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Call the Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const response = await fetch(
        `${supabaseUrl}/functions/v1/request-password-reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        }
      )

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Failed to send reset email')
      }
    } catch (err) {
      console.error('Error requesting password reset:', err)
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-container">
          <div className="admin-login-header">
            <h1>Check Your Email</h1>
            <p>Password Reset Instructions Sent</p>
          </div>

          <div className="password-reset-success">
            <div className="success-icon">📧</div>
            <p>
              If an account exists with the email <strong>{email}</strong>,
              you will receive password reset instructions shortly.
            </p>
            <p>
              The reset link will expire in 1 hour.
            </p>
            <div className="note">
              <strong>Didn't receive the email?</strong>
              <ul>
                <li>Check your spam folder</li>
                <li>Make sure you entered the correct email</li>
                <li>Wait a few minutes and try again</li>
              </ul>
            </div>
          </div>

          <Link to="/admin/login" className="back-to-login">
            ← Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h1>Forgot Password?</h1>
          <p>Enter your email to reset your password</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <Link to="/admin/login" className="back-to-login">
          ← Back to Login
        </Link>
      </div>
    </div>
  )
}
