import React from 'react'

function Pricing() {
  const pricingData = {
    installation: [
      {
        name: "Central AC Installation",
        icon: "❄️",
        included: [
          "Complete system installation",
          "Ductwork inspection",
          "Thermostat setup",
          "System testing & calibration",
          "1-year warranty"
        ],
        priceRange: "$5,000 - $12,000"
      },
      {
        name: "Mini Split System Installation",
        icon: "🌬️",
        included: [
          "Professional installation",
          "Electrical connections",
          "Refrigerant line setup",
          "Remote control setup",
          "System testing"
        ],
        priceRange: "$3,000 - $8,000"
      },
      {
        name: "Slim Ductless Installation",
        icon: "💨",
        included: [
          "Space-saving unit installation",
          "Wall mounting",
          "Electrical setup",
          "System calibration",
          "Basic training"
        ],
        priceRange: "$2,500 - $7,000"
      },
      {
        name: "Rooftop Unit Installation",
        icon: "🏢",
        included: [
          "Commercial unit installation",
          "Roof mounting",
          "Ductwork connection",
          "Electrical & controls",
          "Commissioning"
        ],
        priceRange: "$8,000 - $25,000"
      },
      {
        name: "Air Handler Installation",
        icon: "⚙️",
        included: [
          "Air handler unit installation",
          "Ductwork integration",
          "Electrical connections",
          "System balancing",
          "Testing & calibration"
        ],
        priceRange: "$2,000 - $6,000"
      }
    ],
    diagnostic: [
      {
        name: "AC Diagnostic Service",
        icon: "❄️",
        included: [
          "Complete system inspection",
          "Performance testing",
          "Issue identification",
          "Detailed report",
          "Recommendations"
        ],
        priceRange: "$75 - $150"
      },
      {
        name: "Heating System Diagnostic",
        icon: "🔥",
        included: [
          "Full system check",
          "Safety inspection",
          "Efficiency testing",
          "Problem diagnosis",
          "Written report"
        ],
        priceRange: "$75 - $150"
      },
      {
        name: "General Consultation",
        icon: "🔧",
        included: [
          "System assessment",
          "Problem identification",
          "Expert recommendations",
          "Price estimates",
          "Service options"
        ],
        priceRange: "$75 - $200"
      }
    ],
    cleaning: [
      {
        name: "Central AC Maintenance",
        icon: "❄️",
        included: [
          "Filter replacement",
          "Coil cleaning",
          "Drain line cleaning",
          "System inspection",
          "Performance check"
        ],
        priceRange: "$100 - $300"
      },
      {
        name: "Mini Split Maintenance",
        icon: "🌬️",
        included: [
          "Filter cleaning/replacement",
          "Coil cleaning",
          "Drain pan cleaning",
          "System inspection",
          "Performance testing"
        ],
        priceRange: "$120 - $250"
      },
      {
        name: "Slim Unit Maintenance",
        icon: "💨",
        included: [
          "Filter replacement",
          "Unit cleaning",
          "Drain cleaning",
          "System check",
          "Basic calibration"
        ],
        priceRange: "$100 - $200"
      },
      {
        name: "Rooftop Unit Maintenance",
        icon: "🏢",
        included: [
          "Filter replacement",
          "Coil cleaning",
          "Drain system cleaning",
          "Comprehensive inspection",
          "Performance report"
        ],
        priceRange: "$200 - $500"
      },
      {
        name: "Air Handler Maintenance",
        icon: "⚙️",
        included: [
          "Filter replacement",
          "Blower cleaning",
          "Drain pan cleaning",
          "System inspection",
          "Airflow check"
        ],
        priceRange: "$80 - $200"
      }
    ],
    common: [
      {
        name: "AC Repair - Not Cooling",
        icon: "❄️",
        included: [
          "Diagnosis",
          "Repair service",
          "Parts (if needed)",
          "System testing",
          "30-day warranty on repairs"
        ],
        priceRange: "$150 - $1,500"
      },
      {
        name: "AC Repair - Strange Noises",
        icon: "❄️",
        included: [
          "Noise diagnosis",
          "Component repair/replacement",
          "Lubrication",
          "System testing",
          "Warranty on parts"
        ],
        priceRange: "$200 - $800"
      },
      {
        name: "AC Repair - Not Turning On",
        icon: "❄️",
        included: [
          "Electrical diagnosis",
          "Component repair",
          "System restart",
          "Testing",
          "Safety check"
        ],
        priceRange: "$150 - $600"
      },
      {
        name: "Weak Air Flow Repair",
        icon: "💨",
        included: [
          "Airflow diagnosis",
          "Ductwork inspection",
          "Filter replacement",
          "Blower service",
          "System optimization"
        ],
        priceRange: "$180 - $700"
      },
      {
        name: "Air Quality Improvement",
        icon: "🌿",
        included: [
          "Air quality assessment",
          "Filter upgrade",
          "Duct cleaning (if needed)",
          "Ventilation check",
          "Recommendations"
        ],
        priceRange: "$100 - $400"
      }
    ]
  }

  const PricingCard = ({ title, icon, included, priceRange }) => (
    <div className="pricing-card">
      <div className="pricing-card-header">
        <div className="pricing-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <div className="pricing-card-content">
        <div className="whats-included">
          <h4>What's Included:</h4>
          <ul>
            {included.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pricing-range">
          <span className="price-label">Price Range:</span>
          <span className="price-value">{priceRange}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <h1>Our Services & Pricing</h1>
          <p>Transparent pricing for quality HVAC services</p>
        </div>
      </section>

      <div className="container">
        <section className="pricing-category">
          <h2>Installation Services</h2>
          <div className="pricing-grid">
            {pricingData.installation.map((service, index) => (
              <PricingCard
                key={index}
                title={service.name}
                icon={service.icon}
                included={service.included}
                priceRange={service.priceRange}
              />
            ))}
          </div>
        </section>

        <section className="pricing-category">
          <h2>Diagnostic Services</h2>
          <div className="pricing-grid">
            {pricingData.diagnostic.map((service, index) => (
              <PricingCard
                key={index}
                title={service.name}
                icon={service.icon}
                included={service.included}
                priceRange={service.priceRange}
              />
            ))}
          </div>
        </section>

        <section className="pricing-category">
          <h2>Cleaning & Maintenance Services</h2>
          <div className="pricing-grid">
            {pricingData.cleaning.map((service, index) => (
              <PricingCard
                key={index}
                title={service.name}
                icon={service.icon}
                included={service.included}
                priceRange={service.priceRange}
              />
            ))}
          </div>
        </section>

        <section className="pricing-category">
          <h2>Common Service Estimates</h2>
          <div className="pricing-grid">
            {pricingData.common.map((service, index) => (
              <PricingCard
                key={index}
                title={service.name}
                icon={service.icon}
                included={service.included}
                priceRange={service.priceRange}
              />
            ))}
          </div>
        </section>

        <section className="pricing-note">
          <div className="container">
            <p>
              <strong>Note:</strong> All prices are estimates and may vary based on specific system requirements, 
              location, and urgency. Contact us for a personalized quote tailored to your needs.
            </p>
            <div className="pricing-cta">
              <a href="tel:9083612183" className="cta-button primary">
                Call for Free Estimate: (908) 361-2183
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Pricing




