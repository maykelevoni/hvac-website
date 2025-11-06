import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

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
    const { token, newPassword } = await req.json()

    // Validate inputs
    if (!token || !newPassword) {
      return new Response(
        JSON.stringify({ success: false, error: 'Token and new password are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return new Response(
        JSON.stringify({ success: false, error: 'Password must be at least 8 characters long' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Find admin with valid token
    const { data: admin, error: adminError } = await supabase
      .from('admins')
      .select('id, email, reset_token_expires')
      .eq('reset_token', token)
      .single()

    if (adminError || !admin) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid or expired reset token'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Check if token has expired
    const expiresAt = new Date(admin.reset_token_expires)
    const now = new Date()

    if (now > expiresAt) {
      // Clean up expired token
      await supabase
        .from('admins')
        .update({ reset_token: null, reset_token_expires: null })
        .eq('id', admin.id)

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Reset token has expired. Please request a new password reset link.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(newPassword, salt)

    // Update password and clear reset token
    const { error: updateError } = await supabase
      .from('admins')
      .update({
        password_hash: passwordHash,
        reset_token: null,
        reset_token_expires: null
      })
      .eq('id', admin.id)

    if (updateError) {
      console.error('Error updating password:', updateError)
      throw new Error('Failed to update password')
    }

    console.log('Password successfully reset for admin:', admin.email)

    // Optionally: Send confirmation email
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      try {
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
      color: #4caf50;
      margin: 0;
      font-size: 24px;
    }
    .success-icon {
      font-size: 48px;
      text-align: center;
      margin-bottom: 20px;
    }
    .content {
      margin-bottom: 30px;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="success-icon">✅</div>
    <div class="header">
      <h1>Password Successfully Changed</h1>
    </div>

    <div class="content">
      <p>Your admin panel password has been successfully reset.</p>

      <p>You can now log in to your admin panel using your new password.</p>

      <div class="warning">
        <strong>⚠️ Security Notice:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>If you didn't make this change, contact support immediately</li>
          <li>Make sure to keep your password secure</li>
          <li>Never share your password with anyone</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <p>Password changed at: ${new Date().toLocaleString()}<br>
      Mafair HVAC Admin Panel</p>
    </div>
  </div>
</body>
</html>
        `

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Mafair HVAC Security <security@resend.dev>',
            to: admin.email,
            subject: '✅ Your Password Has Been Changed',
            html: htmlContent
          })
        })
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
        // Don't fail the password reset if email fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Password successfully reset. You can now log in with your new password.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in reset-password:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred while resetting your password'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
