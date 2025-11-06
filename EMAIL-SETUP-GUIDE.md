# Email Notifications Setup Guide

This guide will walk you through setting up email notifications for your HVAC website. You'll be able to receive emails when new leads are submitted and enable password recovery for your admin panel.

## Features Implemented

1. **New Lead Email Notifications** - Automatically receive beautifully formatted emails when customers submit service requests
2. **Password Recovery** - Reset admin passwords via secure email links
3. **Password Change Confirmation** - Get notified when passwords are changed

## Prerequisites

- [Supabase](https://supabase.com) account (free tier is sufficient)
- [Resend](https://resend.com) account (free tier: 3,000 emails/month)
- Supabase CLI installed: `npm install -g supabase`
- Node.js 18+ installed

---

## Part 1: Database Setup

### Step 1: Run the Migration

First, add the password reset fields to your `admins` table:

```bash
# Connect to your Supabase project
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

Or manually run this SQL in your Supabase SQL Editor:

```sql
-- Add password reset fields to admins table
ALTER TABLE admins
ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP WITH TIME ZONE;

-- Add index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_admins_reset_token ON admins(reset_token) WHERE reset_token IS NOT NULL;
```

---

## Part 2: Resend Setup

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address
3. Navigate to **API Keys** in the dashboard
4. Click **Create API Key**
5. Give it a name like "HVAC Website"
6. Copy the API key (starts with `re_`)

### Step 2: (Optional) Add Custom Domain

For production, you should verify your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `mafairhvac.com`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 5-15 minutes)

**For testing**, you can use Resend's development email: `leads@resend.dev`

---

## Part 3: Supabase Edge Functions Setup

### Step 1: Initialize Supabase Project

```bash
cd /path/to/hvac-website
supabase init
```

This creates a `supabase` directory (which already exists in your project).

### Step 2: Link to Your Supabase Project

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

Find your project ref in your Supabase dashboard URL: `https://app.supabase.com/project/YOUR_PROJECT_REF`

### Step 3: Set Environment Secrets

```bash
# Set your Resend API key
supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Set your application URL (change for production)
supabase secrets set APP_URL=https://your-domain.com
```

For local testing:
```bash
supabase secrets set APP_URL=http://localhost:5173
```

### Step 4: Deploy Edge Functions

Deploy all three Edge Functions:

```bash
# Deploy lead notification function
supabase functions deploy send-lead-notification

# Deploy password reset request function
supabase functions deploy request-password-reset

# Deploy password reset function
supabase functions deploy reset-password
```

### Step 5: Get Function URLs

After deployment, note your function URLs. They follow this pattern:
```
https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-lead-notification
https://YOUR_PROJECT_REF.supabase.co/functions/v1/request-password-reset
https://YOUR_PROJECT_REF.supabase.co/functions/v1/reset-password
```

---

## Part 4: Configure Database Webhook

This makes lead notifications automatic when new leads are submitted.

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Webhooks**
3. Click **Create a new webhook**
4. Configure:
   - **Name**: `new-lead-notification`
   - **Table**: `leads`
   - **Events**: Check `INSERT`
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-lead-notification`
   - **Headers**: Leave empty (function handles CORS)
5. Click **Create webhook**

### Option B: Using Database Trigger (Alternative)

If webhooks aren't available, run this SQL:

```sql
-- Enable HTTP extension
CREATE EXTENSION IF NOT EXISTS http;

-- Create trigger function
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
DECLARE
  function_url TEXT := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-lead-notification';
BEGIN
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to leads table
DROP TRIGGER IF EXISTS on_lead_created ON leads;
CREATE TRIGGER on_lead_created
AFTER INSERT ON leads
FOR EACH ROW
EXECUTE FUNCTION notify_new_lead();
```

---

## Part 5: Update Email Addresses

### In Edge Functions

Edit the "from" addresses in your Edge Functions to use your verified domain:

**supabase/functions/send-lead-notification/index.ts** (Line 175):
```typescript
from: 'Mafair HVAC Leads <leads@your-domain.com>', // Change this
to: 'Mafairhvac@gmail.com', // Your email to receive leads
```

**supabase/functions/request-password-reset/index.ts** (Line 182):
```typescript
from: 'Mafair HVAC Security <security@your-domain.com>', // Change this
```

**supabase/functions/reset-password/index.ts** (Line 147):
```typescript
from: 'Mafair HVAC Security <security@your-domain.com>', // Change this
```

After editing, redeploy:
```bash
supabase functions deploy send-lead-notification
supabase functions deploy request-password-reset
supabase functions deploy reset-password
```

---

## Part 6: Environment Variables

### For Local Development

Create/update `.env` file:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### For Production (Vercel)

Add these environment variables in Vercel dashboard:

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

---

## Testing

### Test Lead Notification

1. Go to your website
2. Submit a service request through the chatbot or form
3. Check your email (Mafairhvac@gmail.com)
4. You should receive a formatted email with lead details

### Test Password Recovery

1. Go to `/admin/login`
2. Click "Forgot your password?"
3. Enter your admin email
4. Check your email for the reset link
5. Click the link and create a new password
6. You should receive a confirmation email
7. Try logging in with your new password

### Troubleshooting

**No email received?**

1. Check Resend dashboard logs: https://resend.com/emails
2. Check Supabase Edge Functions logs:
   ```bash
   supabase functions logs send-lead-notification
   ```
3. Verify webhook is configured correctly in Supabase Dashboard
4. Check spam folder

**Function errors?**

```bash
# View logs for a specific function
supabase functions logs send-lead-notification --follow
supabase functions logs request-password-reset --follow
supabase functions logs reset-password --follow
```

**Database issues?**

Check if migration was applied:
```sql
-- Check if columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'admins';
```

---

## Cost Breakdown

### Resend (Email Service)
- **Free Tier**: 3,000 emails/month, 100 emails/day
- **Typical HVAC Usage**: 50-200 leads/month + password resets = well within free tier
- **Paid Tier**: $20/month for 50,000 emails (if needed)

### Supabase (Database + Functions)
- **Free Tier**:
  - 500MB database storage
  - 2GB bandwidth
  - 500,000 Edge Function invocations/month
- **Your Usage**: Minimal - well within free tier

**Total Monthly Cost**: $0 (free tier sufficient)

---

## Email Templates

The emails are professionally designed with:
- Responsive HTML layout
- Your brand colors (blue gradient)
- Mobile-friendly design
- Clear call-to-action buttons
- Security warnings for password resets

### Lead Notification Email Includes:
- Customer name, email, phone
- Problem description
- Service requested
- Price estimate
- Urgency level
- Preferred contact method
- Emergency flag if applicable

### Password Reset Email Includes:
- Secure reset link
- 1-hour expiration notice
- Security warnings
- Branded design

---

## Security Features

1. **Token Security**: Reset tokens are 64-character random strings with 1-hour expiration
2. **No Email Enumeration**: Always returns success message even if email doesn't exist
3. **Single-Use Tokens**: Tokens are deleted after use
4. **HTTPS Only**: All communication encrypted
5. **Secure Password Hashing**: bcrypt with salt rounds
6. **Rate Limiting**: Resend has built-in rate limiting (100 emails/day)

---

## Maintenance

### Monthly Tasks
- Check Resend dashboard for email delivery rates
- Review Supabase Edge Functions logs for errors
- Monitor email quota usage

### When Issues Occur
1. Check Resend logs first
2. Check Supabase Edge Functions logs
3. Verify environment variables are set
4. Test with a fresh lead submission

---

## Next Steps (Optional)

### 1. Email Template Customization
Edit the HTML in Edge Functions to match your branding.

### 2. SMS Notifications (Future)
Add Twilio integration for SMS notifications when leads are urgent.

### 3. Magic Link Login
Migrate to Supabase Auth for passwordless magic link login.

### 4. Admin Email Preferences
Add a settings page to customize notification preferences.

---

## Support

If you encounter issues:

1. **Resend Support**: https://resend.com/support
2. **Supabase Docs**: https://supabase.com/docs
3. **Edge Functions Guide**: https://supabase.com/docs/guides/functions

---

## Quick Reference Commands

```bash
# Deploy all functions
supabase functions deploy send-lead-notification
supabase functions deploy request-password-reset
supabase functions deploy reset-password

# View logs
supabase functions logs send-lead-notification --follow

# Set secrets
supabase secrets set RESEND_API_KEY=re_xxx
supabase secrets set APP_URL=https://your-domain.com

# Run migration
supabase db push

# Link project
supabase link --project-ref YOUR_REF
```

---

## File Structure

```
hvac-website/
├── supabase/
│   ├── functions/
│   │   ├── send-lead-notification/
│   │   │   └── index.ts
│   │   ├── request-password-reset/
│   │   │   └── index.ts
│   │   └── reset-password/
│   │       └── index.ts
│   └── migrations/
│       └── 20250106_add_password_reset_fields.sql
├── src/
│   └── pages/
│       └── admin/
│           ├── AdminLogin.jsx (updated)
│           ├── ForgotPassword.jsx (new)
│           └── ResetPassword.jsx (new)
└── .env (local development)
```

---

**Setup complete!** You now have a professional email notification system for your HVAC business.
