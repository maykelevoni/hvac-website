# HVAC Website Enhancement Plan

## Overview
Modern HVAC website for Mafair HVAC Services featuring an interactive customer experience, comprehensive lead management system, and professional service showcase.

**Business Contact:**
- Email: Mafairhvac@gmail.com
- Phone: (908) 361-2183 (Gabriel - Primary)
- Phone: (908) 708-8495 (Colombia - Secondary)
- Service Area: New Jersey (statewide)

## Technology Stack
- **Frontend**: React 19.2.0 + Vite
- **Routing**: React Router v6
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with RLS
- **Email**: Supabase SMTP with Mailtrap
- **Styling**: Custom CSS (Mobile-first responsive)

---

## Project Status: ✅ Production Ready

**Completed Features:**
1. ✅ Core Setup (React + Vite + Supabase)
2. ✅ Photo Gallery with Service Filtering
3. ✅ Pricing Page (Installations, Diagnostics, Cleaning)
4. ✅ Interactive Chatbot-style Estimate Modal
5. ✅ Admin Authentication (Login, Forgot Password, Reset)
6. ✅ Lead Management Dashboard
7. ✅ Email Notifications (Admin & Customer)
8. ✅ Protected Routes & Security

---

## Key Features Implemented

### 1. Interactive Estimate Modal (Chatbot Flow)
- Problem category selection
- Service auto-suggestion
- Urgency-based pricing
- Customer information collection with consent
- Contact preference selection (Call/Email/Wait)
- Lead submission to Supabase
- Email notifications to admin

### 2. Photo Gallery
- Filterable by service type (Cooling, Heating, Installation, Maintenance, Air Quality)
- Responsive grid layout
- Lightbox for full-size images
- Mobile-optimized

### 3. Pricing Page
- Installation, Diagnostic, and Cleaning services
- Service cards with included items
- Transparent price ranges
- Fully responsive

### 4. Admin Panel
- Secure authentication (first-time setup flow)
- Lead management dashboard
- Real-time lead updates
- Status tracking (New → Contacted → Visited → Closed/Give Up)
- Search and filter capabilities
- Direct contact actions (call/email)

---

## Environment Setup

Required environment variables in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Secrets (Edge Functions)
```bash
supabase secrets set RESEND_API_KEY=re_your_api_key
supabase secrets set APP_URL=https://your-domain.com
```

---

## Database Tables

### leads
- Customer information (name, email, phone)
- Service details and pricing
- Status tracking (New → Contacted → Visited → Closed/Give Up)
- Contact preferences (Call/Email/Wait)
- Timestamps

### admins
- Email and password hash
- Admin authentication
- Password reset tokens (with expiration)

### job_photos
- Gallery images by service type
- Descriptions and metadata

---

## Email Notifications Setup

**Email Service:** Resend (free tier: 3,000 emails/month)

### Edge Functions Deployed
1. **send-lead-notification** - Auto-sends email when new lead submitted
2. **request-password-reset** - Sends password reset link
3. **reset-password** - Confirms password change

### Quick Setup Commands
```bash
# Link Supabase project
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# Set secrets
supabase secrets set RESEND_API_KEY=re_xxx
supabase secrets set APP_URL=https://your-domain.com

# Deploy functions
supabase functions deploy send-lead-notification
supabase functions deploy request-password-reset
supabase functions deploy reset-password

# Configure webhook (or use Supabase Dashboard)
# Database → Webhooks → Create webhook
# Table: leads, Event: INSERT
# URL: https://YOUR_REF.supabase.co/functions/v1/send-lead-notification
```

### Email Configuration
- **From Address:** Update in Edge Functions to use verified domain
- **To Address:** Mafairhvac@gmail.com (receives all lead notifications)
- **Templates:** HTML responsive emails with branding

### Troubleshooting
```bash
# View function logs
supabase functions logs send-lead-notification --follow

# Check Resend dashboard
https://resend.com/emails
```

---

## Security Features
- Row-Level Security (RLS) enabled on all tables
- Password hashing (bcrypt via Supabase Auth)
- Protected admin routes with session validation
- Input validation and sanitization
- HTTPS required for production
- Reset tokens expire in 1 hour
- Single-use password reset tokens

---

## Project Structure

```
src/
├── components/
│   ├── EstimateModal/        # Multi-step chatbot estimate flow
│   ├── admin/                # Admin-specific components
│   ├── AdminLayout.jsx       # Admin page wrapper
│   ├── Footer.jsx
│   ├── Gallery.jsx           # Filterable photo gallery
│   ├── Header.jsx
│   └── ProtectedRoute.jsx    # Auth guard for admin routes
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.jsx  # Lead management interface
│   │   ├── AdminLogin.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── Home.jsx
│   ├── Pricing.jsx
│   └── ServiceRequest.jsx
├── config/
│   └── business.js           # Business info & service catalog
├── lib/
│   └── supabase.js          # Supabase client configuration
└── styles/                   # Component-specific CSS
```

---

## Routes

**Public Routes:**
- `/` - Home page with services, gallery, and CTA
- `/pricing` - Transparent pricing page
- `/service` - Service request page

**Admin Routes:**
- `/admin` → redirects to `/admin/dashboard`
- `/admin/login` - Admin authentication
- `/admin/forgot-password` - Password recovery
- `/admin/reset-password` - Password reset with token
- `/admin/dashboard` - Lead management (protected)
- `/admin/leads` - Lead management (protected)

---

## Future Enhancements

**High Priority:**
- [ ] SMS notifications (Twilio/AWS SNS)
- [ ] Lead notes and activity timeline
- [ ] Calendar/scheduling integration
- [ ] Photo upload capability (admin)

**Medium Priority:**
- [ ] CSV export for leads
- [ ] Analytics dashboard
- [ ] Multi-user admin roles
- [ ] Dark mode toggle

**Low Priority:**
- [ ] Customer portal for quote tracking
- [ ] Review/testimonial system
- [ ] Service area map
- [ ] Live chat integration

---

## Deployment Checklist

- [ ] Update Supabase production URL
- [ ] Configure production email provider
- [ ] Set up custom domain
- [ ] Enable HTTPS/SSL
- [ ] Test email notifications in production
- [ ] Verify RLS policies
- [ ] Add monitoring/error tracking (Sentry)
- [ ] Set up automated backups

---

## Notes

**Last Updated:** November 2024

All core features are complete and tested. The application is production-ready with:
- Secure admin panel with password recovery
- Complete lead management workflow
- Email notifications for admin and customers
- Responsive design (mobile-first)
- Row-level security on all database tables
