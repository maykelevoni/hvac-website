import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if admin exists
    const { data: admin, error: adminError } = await supabase
      .from('admins')
      .select('id, email, name')
      .eq('email', email)
      .single()

    // Always return success to prevent email enumeration
    if (adminError || !admin) {
      console.log('Admin not found for email:', email)
      return new Response(
        JSON.stringify({
          success: true,
          message: 'If an account exists with this email, a password reset link has been sent.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Generate secure reset token (64 characters)
    const resetToken = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '')

    // Set expiration to 1 hour from now
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1)

    // Store token in database
    const { error: updateError } = await supabase
      .from('admins')
      .update({
        reset_token: resetToken,
        reset_token_expires: expiresAt.toISOString()
      })
      .eq('id', admin.id)

    if (updateError) {
      throw new Error('Failed to generate reset token')
    }

    // Get Resend API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Get the application URL
    const appUrl = Deno.env.get('APP_URL') || 'http://localhost:5173'
    const resetUrl = `${appUrl}/admin/reset-password?token=${resetToken}`

    // Create HTML email template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #1976d2;
      margin: 0;
      font-size: 24px;
    }
    .content {
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      padding: 15px 30px;
      background: linear-gradient(135deg, #1976d2, #2196f3);
      color: white !important;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      text-align: center;
      margin: 20px 0;
    }
    .button:hover {
      background: linear-gradient(135deg, #1565c0, #1976d2);
    }
    .button-container {
      text-align: center;
    }
    .warning {
      background: #fff3e0;
      border-left: 4px solid #ff9800;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      color: #666;
      font-size: 14px;
    }
    .token-info {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      color: #666;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Password Reset Request</h1>
    </div>

    <div class="content">
      <p>Hello${admin.name ? ` ${admin.name}` : ''},</p>

      <p>We received a request to reset your admin panel password. Click the button below to create a new password:</p>

      <div class="button-container">
        <a href="${resetUrl}" class="button">Reset My Password</a>
      </div>

      <div class="warning">
        <strong>⚠️ Important Security Information:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>This link will expire in 1 hour</li>
          <li>If you didn't request this reset, you can safely ignore this email</li>
          <li>Never share this link with anyone</li>
        </ul>
      </div>

      <p>If the button doesn't work, copy and paste this URL into your browser:</p>
      <p style="word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px; font-size: 12px;">
        ${resetUrl}
      </p>
    </div>

    <div class="footer">
      <p>This is an automated message from Mafair HVAC Admin Panel.<br>
      If you didn't request a password reset, please contact support.</p>

      <div class="token-info">
        Request received at: ${new Date().toLocaleString()}<br>
        Link expires at: ${expiresAt.toLocaleString()}
      </div>
    </div>
  </div>
</body>
</html>
    `

    // Send email via Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Mafair HVAC Security <security@resend.dev>', // Change to your verified domain
        to: admin.email,
        subject: '🔐 Reset Your Admin Panel Password',
        html: htmlContent
      })
    })

    const emailData = await res.json()

    if (!res.ok) {
      console.error('Resend API error:', emailData)
      throw new Error(`Failed to send reset email: ${JSON.stringify(emailData)}`)
    }

    console.log('Password reset email sent successfully:', emailData)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in request-password-reset:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred while processing your request'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
