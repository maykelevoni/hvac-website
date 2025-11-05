/**
 * Business Information Configuration
 * Centralized location for all business contact information and settings
 */

export const BUSINESS_INFO = {
  name: 'Mafair HVAC',
  tagline: 'Installation - Service',

  // Contact Information
  phone: {
    primary: '9083612183',
    primaryFormatted: '(908) 361-2183',
    primaryName: 'Gabriel',
    secondary: '9087088495',
    secondaryFormatted: '(908) 708-8495',
    secondaryName: 'Colombia'
  },

  email: {
    primary: 'Mafairhvac@gmail.com',
    support: 'Mafairhvac@gmail.com'
  },

  // Location
  location: {
    state: 'New Jersey',
    serviceArea: 'New Jersey'
  },

  // Business Details
  description: 'Reliable HVAC solutions for homes and businesses in New Jersey. Licensed & Insured HVAC Contractor.',

  // Session Settings
  session: {
    expiryDays: 7
  }
}

export default BUSINESS_INFO
