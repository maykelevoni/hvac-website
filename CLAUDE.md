# CLAUDE.md - AI Assistant Context

This document provides context for AI assistants (like Claude Code) working on this project.

## Project Overview

**Project Name:** Mafair HVAC Website
**Type:** React SPA (Single Page Application)
**Purpose:** Customer-facing HVAC website with lead generation and admin management
**Status:** Production-ready, actively maintained

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technology Stack

- **Framework:** React 19.2.0 with Vite
- **Routing:** React Router v6
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Email:** Supabase SMTP (Mailtrap for testing)
- **Styling:** Custom CSS (no framework)
- **Testing:** Playwright (optional)

## Architecture

### Frontend Structure

```
src/
├── components/          # Reusable UI components
│   ├── EstimateModal/  # Multi-step chatbot form (5 steps)
│   ├── admin/          # Admin-specific components
│   └── ...
├── pages/              # Route-level components
│   ├── admin/          # Admin panel pages
│   └── ...
├── config/             # Business configuration
├── lib/                # External integrations (Supabase)
└── styles/             # Component CSS files
```

### Key Features

1. **Chatbot Estimate Modal** - 5-step conversational flow for lead generation
2. **Admin Panel** - Secure dashboard for managing leads and quotes
3. **Photo Gallery** - Filterable showcase of completed work
4. **Pricing Page** - Transparent pricing for services

### Routing Strategy

- **Public routes:** `/`, `/pricing`, `/service`
- **Admin routes:** `/admin/*` (protected by ProtectedRoute component)
- Admin routes redirect to `/admin/dashboard` when authenticated

## Database Schema

### Tables

**leads**
- Customer contact info
- Service details and pricing
- Status workflow (New → Contacted → Visited → Closed/Give Up)
- Contact preferences

**admins**
- Admin authentication (email/password hash)

**job_photos**
- Gallery images by service type

### Security

- Row-Level Security (RLS) enabled on all tables
- Protected routes using Supabase session validation
- Password hashing (handled by Supabase Auth)

## Configuration Files

- `.env` - Contains Supabase credentials (DO NOT COMMIT)
- `src/config/business.js` - Business information and service catalog
- `src/lib/supabase.js` - Supabase client initialization

## Important Patterns

### State Management
- Local component state with `useState`
- Supabase real-time subscriptions for admin dashboard
- No global state library (Redux, Zustand, etc.)

### Styling Approach
- Component-scoped CSS files (e.g., `Header.css`)
- Mobile-first responsive design
- CSS custom properties for colors/spacing

### Data Flow
1. Customer fills estimate modal → Supabase `leads` table
2. Email sent to admin via Supabase Edge Function
3. Admin logs in → views leads in dashboard
4. Admin updates lead status → triggers customer notification email

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Header.jsx` (if needed)

### Modifying Services/Pricing

Edit `src/config/business.js` - this is the single source of truth for:
- Service categories
- Pricing ranges
- Business contact info

### Adding Admin Features

1. Create component in `src/components/admin/` or `src/pages/admin/`
2. Add route under `/admin/*` in `src/App.jsx`
3. Wrap with `<ProtectedRoute>` if authentication required

### Database Changes

1. Update schema via Supabase dashboard SQL editor
2. Update RLS policies if needed
3. Test with authenticated and unauthenticated users

## Testing

- Playwright tests are configured but gitignored
- Manual testing recommended for estimate flow and admin features
- Test email notifications using Mailtrap (dev) or production SMTP

## Deployment Notes

- Build output: `dist/` directory
- Environment variables required: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Supabase project handles backend (no separate server needed)
- Static hosting compatible (Vercel, Netlify, etc.)

## Code Style Preferences

- **Functional components** with hooks (no class components)
- **Named exports** preferred for components
- **Async/await** for promises (not `.then()`)
- **Destructuring** for props
- **Optional chaining** (`?.`) for safe property access

## Watch Out For

⚠️ **Security Considerations:**
- Never expose `VITE_SUPABASE_SERVICE_KEY` in frontend code
- Always validate user input before Supabase queries
- RLS policies must be tested before production deployment

⚠️ **Common Pitfalls:**
- Supabase real-time subscriptions need cleanup (`subscription.unsubscribe()`)
- React Router v6 uses `<Routes>` not `<Switch>`
- Vite env vars must start with `VITE_`

## Related Documentation

- [plan.md](plan.md) - Complete project documentation (features, setup, email config, deployment)
- [README.md](README.md) - General project overview
- [Supabase Docs](https://supabase.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Resend Docs](https://resend.com/docs)

## Questions?

When working on this project:
1. Check `plan.md` for feature status and roadmap
2. Review `business.js` for service/pricing changes
3. Refer to existing components for patterns
4. Test admin features by logging into `/admin/login`

---

**Last Updated:** November 2024
**Maintained By:** Development Team
