# Mafair HVAC Website

A modern, professional React website for Mafair HVAC - Heating & Cooling Installation & Service in New Jersey.

## Features

### Brand Identity
- **Colors**: Dark Blue (#1E4D7A), Brick Red (#C74436), Light Gray (#F2F2F2)
- **Typography**: Poppins/Montserrat for headings, Open Sans/Roboto for body text
- **Logo**: 🌬️ Mafair HVAC with "Installation - Service" tagline

### Pages & Sections

#### Home Page
1. **Hero Section**
   - Full-width background image with HVAC installation
   - Dark blue overlay for text readability
   - Headline: "Heating & Cooling Installation & Service"
   - Subtitle: "Reliable HVAC solutions for homes and businesses in New Jersey"
   - CTA buttons: "Get a Free Estimate" and "Call Now"

2. **Services Section**
   - 6 service cards with professional images
   - Image hover effects with zoom
   - Services:
     - Central Air Conditioning
     - Mini Split Systems
     - Slim Ductless
     - Rooftop Units
     - Air Handlers
     - Repair & Maintenance

3. **About Section**
   - Professional technician image (sticky on desktop)
   - Two-column layout (image + content)
   - Company description
   - 4 benefit cards with hover effects (Licensed & Insured, Professional Service, Honest Pricing, NJ Trusted)

4. **How It Works**
   - 4-step process from contact to comfort

5. **Contact Banner**
   - Two phone numbers with clickable links
   - Email address
   - Call-to-action

#### Service Request Page
- Comprehensive form with validation
- Contact information fields
- Service type dropdown with 15+ Mafair-specific options
- Urgency level selector
- Service details textarea
- Optional preferred date/time
- Success confirmation page

#### Header
- Mafair HVAC branding
- Two clickable phone numbers
- Navigation: Home, Get Free Estimate

#### Footer
- Company branding
- Contact information (2 phone numbers + email)
- Service area info
- Copyright notice

## Contact Information

- **Phone**: (908) 361-2183
- **Phone**: (908) 708-8495
- **Email**: Mafairhvac@gmail.com
- **Location**: New Jersey, USA

## Technology Stack

- React 19.2.0
- Vite 7.1.11
- Modern CSS with custom properties
- Google Fonts (Poppins, Open Sans)
- Responsive design

## Development

### Run Development Server
```bash
npm run dev
```
The site will be available at http://localhost:5173/

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
hvac-website/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ServiceRequest.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## Features in Detail

### Form Validation
- Real-time validation with error messages
- Required fields: name, email, phone, address, service type, service details
- Email format validation
- Phone number format validation (US format)

### Responsive Design
- Mobile-first approach
- Breakpoints: 968px (tablet), 768px (mobile), 480px (small mobile)
- Touch-friendly buttons and links
- Flexible grid layouts
- Images optimize for different screen sizes
- Sticky about image on desktop only

### User Experience
- Smooth hover effects on all interactive elements
- Image zoom effects on service cards
- Click-to-call phone links (tel: protocol)
- Click-to-email links (mailto: protocol)
- Clear visual hierarchy
- Professional color scheme (Dark Blue + Brick Red)
- Easy navigation
- Professional HVAC imagery throughout

### Images
- Hero: Full-width HVAC installation background
- Services: 6 professional HVAC equipment images
- About: Technician at work image
- All images from Unsplash (free license)
- Optimized loading with proper alt tags

## SEO Optimization

- Semantic HTML structure
- Meta description included
- Local keywords: "HVAC installation New Jersey", "Mini Split NJ"
- Descriptive page title
- Alt text ready for images

## Next Steps (Optional Enhancements)

1. **Backend Integration**
   - Connect form to email service (e.g., EmailJS, SendGrid)
   - Store submissions in database
   - Add email notifications

2. **Additional Features**
   - Image gallery of completed projects
   - Customer testimonials section
   - Before/after photos
   - Service area map
   - Online booking calendar
   - Live chat integration

3. **Marketing**
   - Google Analytics integration
   - Facebook Pixel
   - Schema markup for local business
   - Blog section for SEO

4. **Media**
   - Add actual HVAC installation photos
   - Company logo design
   - Service area images
   - Team photos

## License

Copyright © 2024 Mafair HVAC. All rights reserved.
