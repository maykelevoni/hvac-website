# HVAC Website Auto-Estimate Feature Implementation Plan

## Overview
This plan outlines the implementation of an auto-estimate feature for the Mafair HVAC website that captures customer information and provides instant pricing estimates based on their HVAC problems.

## Target Workflow
1. **Problem Selection**: Customer selects their HVAC problem from common issues or custom description
2. **Service Identification**: System automatically identifies the required service to fix the problem
3. **Customer Information**: Capture essential customer details (name, email, phone)
4. **Price Display**: Show instant estimate based on problem → service mapping

## CRM Recommendation
**Recommended**: HubSpot CRM (Free Tier)
- **Why**: User-friendly, excellent free plan, great for small businesses
- **Features**: Contact management, email tracking, deal pipeline, mobile app
- **Cost**: Free for up to 1M contacts
- **Integration**: Easy email setup, scalable as business grows

## Problem-to-Service Mapping Database

### Central Air Conditioning Problems
- "AC not cooling at all" → Central Air - Repair ($150-$1,500)
- "AC making strange noises" → Central Air - Repair ($200-$800)
- "AC not turning on" → Central Air - Repair ($150-$600)
- "Weak air flow from vents" → Central Air - Repair ($180-$700)
- "AC running constantly" → Central Air - Repair/Maintenance ($100-$500)
- "Want new AC installed" → Central Air - Installation ($5,000-$12,000)
- "Annual AC maintenance" → Central Air - Maintenance ($100-$300)

### Mini Split Problems
- "Mini split not cooling" → Mini Split - Repair ($200-$1,200)
- "Mini split leaking water" → Mini Split - Repair ($180-$600)
- "Mini split not turning on" → Mini Split - Repair ($150-$500)
- "Want mini split installed" → Mini Split - Installation ($3,000-$8,000)
- "Mini split maintenance" → Mini Split - Maintenance ($120-$250)

### Slim Ductless Problems
- "Slim unit not working" → Slim Ductless - Repair ($180-$1,000)
- "Slim unit making noise" → Slim Ductless - Repair ($200-$700)
- "Want slim unit installed" → Slim Ductless - Installation ($2,500-$7,000)
- "Slim unit maintenance" → Slim Ductless - Maintenance ($100-$200)

### Rooftop Unit Problems
- "Rooftop unit not cooling" → Rooftop Unit - Repair ($300-$3,000)
- "Rooftop unit making loud noises" → Rooftop Unit - Repair ($400-$2,000)
- "Need new rooftop unit" → Rooftop Unit - Installation ($8,000-$25,000)
- "Rooftop unit maintenance" → Rooftop Unit - Maintenance ($200-$500)

### Air Handler Problems
- "Air handler not working" → Air Handler - Repair ($150-$800)
- "Air handler making strange sounds" → Air Handler - Repair ($200-$600)
- "Want new air handler" → Air Handler - Installation ($2,000-$6,000)
- "Air handler maintenance" → Air Handler - Maintenance ($80-$200)

### General Problems
- "Poor air quality" → Air Handler/Maintenance ($100-$400)
- "High energy bills" → Maintenance/Repair ($150-$800)
- "Strange smells from vents" → Repair/Maintenance ($120-$500)
- "System not heating" → Repair ($150-$1,000)
- "Custom problem" → General Consultation ($75-$200)

## Implementation Phases

### Phase 1: Enhanced Hero Section & Modal System
**Goals**: Create entry point and basic modal structure

#### Tasks:
- [ ] Enhance hero section with prominent "Get Instant Estimate" CTA
- [ ] Create EstimateModal.jsx main component
- [ ] Implement progress tracking system
- [ ] Design mobile-responsive modal layout
- [ ] Add smooth animations and transitions

#### Components to Create:
```
src/components/EstimateModal/
├── EstimateModal.jsx (main container)
├── ProblemSelectionStep.jsx
├── ServiceConfirmationStep.jsx
├── CustomerInfoStep.jsx
└── EstimateResultsStep.jsx
```

### Phase 2: Problem Selection & Service Identification
**Goals**: Implement problem-first approach with smart service mapping

#### Tasks:
- [ ] Create problem selection interface with icons and descriptions
- [ ] Implement problemServiceMap.js with all mappings
- [ ] Build service identification logic
- [ ] Add search/filter functionality for problems
- [ ] Create service confirmation step with explanations

#### Technical Implementation:
```javascript
// Example problemServiceMap structure
const problemServiceMap = {
  "AC not cooling at all": {
    service: "Central Air - Repair",
    basePrice: { min: 150, max: 1500 },
    complexityFactors: {
      "simple": { min: 150, max: 400 },
      "moderate": { min: 400, max: 800 },
      "complex": { min: 800, max: 1500 }
    },
    description: "Complete diagnosis and repair of cooling system",
    urgencyMultiplier: {
      "emergency": 1.5,
      "urgent": 1.2,
      "normal": 1.0,
      "scheduled": 0.9
    }
  }
  // ... additional mappings
}
```

### Phase 3: Customer Information & Pricing Engine
**Goals**: Capture leads and generate accurate estimates

#### Tasks:
- [ ] Create minimal customer info form (name, email, phone)
- [ ] Implement real-time form validation
- [ ] Build pricingEngine.js with dynamic calculations
- [ ] Add auto-save functionality to prevent data loss
- [ ] Implement estimate display with professional formatting

#### Pricing Logic:
- Base pricing from problem-service mapping
- Adjustments for urgency level (emergency +50%, urgent +20%, scheduled -10%)
- Geographic considerations for New Jersey areas
- Complexity assessment based on problem description

### Phase 4: Lead Management & Integration
**Goals**: Process leads and integrate with business systems

#### Tasks:
- [ ] Create leadManager.js for lead processing
- [ ] Implement email notification system
- [ ] Set up HubSpot CRM integration
- [ ] Create admin panel for lead management
- [ ] Add analytics and conversion tracking

#### Lead Processing Flow:
1. Capture problem → service → customer info
2. Enrich with timestamp, IP, user agent
3. Calculate estimate with pricing engine
4. Send to email + CRM system
5. Trigger automated follow-up sequences

## Technical Architecture

### File Structure:
```
src/
├── components/
│   ├── EstimateModal/
│   │   ├── EstimateModal.jsx
│   │   ├── ProblemSelectionStep.jsx
│   │   ├── ServiceConfirmationStep.jsx
│   │   ├── CustomerInfoStep.jsx
│   │   └── EstimateResultsStep.jsx
│   └── EstimateEngine/
│       ├── problemServiceMap.js
│       ├── pricingEngine.js
│       └── leadManager.js
├── pages/
│   ├── Home.jsx (enhanced with new CTA)
│   └── ServiceRequest.jsx (link to modal)
└── styles/
    └── index.css (add modal styles)
```

### Key Components:

#### 1. EstimateModal.jsx
- Main container with state management
- Progress bar and step navigation
- Modal open/close functionality
- Mobile-responsive design

#### 2. ProblemSelectionStep.jsx
- Grid layout of common HVAC problems
- Visual icons and clear descriptions
- Search and filter functionality
- Custom problem text area
- Selection validation

#### 3. ServiceConfirmationStep.jsx
- Display identified service based on problem
- Show pricing range and confidence level
- "Why this service?" explanations
- Alternative service options
- Confirmation buttons

#### 4. CustomerInfoStep.jsx
- Minimal form (name, email, phone)
- Real-time validation
- Auto-save functionality
- Privacy assurance text
- Progress indicator

#### 5. EstimateResultsStep.jsx
- Professional estimate display
- Price range breakdown
- "What's included" information
- Next steps timeline
- CTA buttons for conversion

#### 6. problemServiceMap.js
- Complete problem-to-service mapping
- Pricing data for all services
- Complexity factors
- Urgency multipliers
- Service descriptions

#### 7. pricingEngine.js
- Dynamic price calculation logic
- Urgency and complexity adjustments
- Geographic considerations
- Price validation and formatting

#### 8. leadManager.js
- Lead capture and processing
- Email notification system
- CRM integration (HubSpot)
- Data enrichment and validation
- Follow-up automation

## User Experience Design

### Visual Elements:
- **Progress Bar**: Clear step indicators (1/4, 2/4, etc.)
- **Problem Icons**: Visual representations for each HVAC problem type
- **Service Cards**: Professional service presentation with pricing
- **Loading States**: Smooth feedback during processing
- **Error Handling**: User-friendly error messages and recovery

### Mobile Optimization:
- Touch-friendly interface
- Responsive grid layouts
- Optimized form inputs for mobile
- Smooth scrolling between steps
- Mobile-first design approach

### Conversion Optimization:
- **Trust Signals**: Licensed & Insured badges
- **Social Proof**: "Helped 50+ customers this week"
- **Urgency Indicators**: "Most popular choice" badges
- **Exit Intent**: "Don't leave! Get your estimate now"
- **Clear CTAs**: Prominent buttons with action-oriented text

## Benefits

### For Customers:
- **Problem-First**: Start with their specific pain point
- **Quick Answers**: Get estimates in under 2 minutes
- **Clear Expectations**: Know exactly what service they need
- **Professional Experience**: Trustworthy and modern interface
- **No Obligation**: Free estimates with no pressure

### For Business:
- **Qualified Leads**: Customers know what they need
- **Efficient Quoting**: Pre-qualified with problem context
- **Higher Conversion**: Problem-focused approach increases conversion
- **Better Scheduling**: Know the issue before the call
- **Scalable System**: Automated lead capture and management

## Success Metrics
- **Conversion Rate**: Percentage of users completing the estimate flow
- **Lead Quality**: Percentage of leads converting to customers
- **Time to Complete**: Average time users spend in the estimate flow
- **Mobile Usage**: Percentage of users on mobile devices
- **Drop-off Points**: Identify where users abandon the process

## Next Steps
1. **Review and Approve**: Confirm this plan meets business requirements
2. **Phase 1 Implementation**: Begin with hero enhancement and modal structure
3. **Testing**: User testing and feedback collection
4. **Iteration**: Refine based on user behavior and feedback
5. **Launch**: Full deployment and integration with business systems

## Timeline Estimate
- **Phase 1**: 2-3 days
- **Phase 2**: 3-4 days
- **Phase 3**: 2-3 days
- **Phase 4**: 2-3 days
- **Total Estimated Time**: 9-13 days

This implementation will create a professional lead generation system that provides immediate value to customers while capturing high-quality leads for the HVAC business.
