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
    const { record } = await req.json()

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Format the service information
    const serviceName = record.service?.service?.service || 'N/A'
    const servicePrice = record.price_estimate || 'Not estimated'

    // Format contact preference
    const contactPref = record.contact_preference || 'phone'
    const contactPrefLabel = {
      'phone': 'Phone Call',
      'email': 'Email',
      'wait': 'Customer will contact us'
    }[contactPref] || contactPref

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
    }
    .header {
      background: linear-gradient(135deg, #1976d2, #2196f3);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-top: none;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-weight: 600;
      color: #1976d2;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .value {
      font-size: 16px;
      color: #333;
    }
    .problem {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin-top: 5px;
      font-style: italic;
    }
    .priority-high {
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
    a {
      color: #1976d2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔧 New HVAC Lead Received</h1>
  </div>

  <div class="content">
    ${record.urgency === 'emergency' ? `
    <div class="priority-high">
      <strong>⚠️ EMERGENCY SERVICE REQUEST</strong><br>
      This customer needs immediate assistance!
    </div>
    ` : ''}

    <div class="field">
      <div class="label">Customer Name</div>
      <div class="value">${record.name}</div>
    </div>

    <div class="field">
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${record.email}">${record.email}</a></div>
    </div>

    <div class="field">
      <div class="label">Phone Number</div>
      <div class="value"><a href="tel:${record.phone}">${record.phone}</a></div>
    </div>

    <div class="field">
      <div class="label">Problem Description</div>
      <div class="problem">${record.problem || 'No description provided'}</div>
    </div>

    <div class="field">
      <div class="label">Service Requested</div>
      <div class="value">${serviceName}</div>
    </div>

    <div class="field">
      <div class="label">Estimated Price</div>
      <div class="value">${servicePrice}</div>
    </div>

    <div class="field">
      <div class="label">Preferred Contact Method</div>
      <div class="value">${contactPrefLabel}</div>
    </div>

    ${record.urgency ? `
    <div class="field">
      <div class="label">Urgency Level</div>
      <div class="value">${record.urgency}</div>
    </div>
    ` : ''}
  </div>

  <div class="footer">
    <p>This lead was submitted through your HVAC website.<br>
    Respond promptly for the best customer experience!</p>
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
        from: 'Mafair HVAC Leads <leads@resend.dev>', // Change to your verified domain
        to: 'Mafairhvac@gmail.com',
        subject: `🔧 New Lead: ${record.name} - ${serviceName}`,
        html: htmlContent
      })
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend API error:', data)
      throw new Error(`Resend API error: ${JSON.stringify(data)}`)
    }

    console.log('Email sent successfully:', data)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead notification sent',
        emailId: data.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error sending lead notification:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
