import React, { useState, useEffect } from "react";

function ServiceConfirmationStep({
  estimateData,
  updateEstimateData,
  onNext,
  onPrev,
}) {
  const [identifiedService, setIdentifiedService] = useState(null);
  const [urgency, setUrgency] = useState("normal");

  const serviceMap = {
    "AC not cooling at all": {
      service: "Central Air - Repair",
      description: "Complete diagnosis and repair of cooling system",
      priceRange: "$150 - $1,500",
      icon: "❄️",
      urgencyMultiplier: {
        emergency: 1.5,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "AC making strange noises": {
      service: "Central Air - Repair",
      description: "Diagnose and repair unusual noises from AC unit",
      priceRange: "$200 - $800",
      icon: "❄️",
      urgencyMultiplier: {
        emergency: 1.3,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "AC not turning on": {
      service: "Central Air - Repair",
      description: "Troubleshoot and fix AC power issues",
      priceRange: "$150 - $600",
      icon: "❄️",
      urgencyMultiplier: {
        emergency: 1.4,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Weak air flow from vents": {
      service: "Central Air - Repair",
      description: "Fix air flow issues throughout the system",
      priceRange: "$180 - $700",
      icon: "❄️",
      urgencyMultiplier: {
        emergency: 1.2,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "AC running constantly": {
      service: "Central Air - Repair/Maintenance",
      description: "Address issues causing continuous AC operation",
      priceRange: "$100 - $500",
      icon: "❄️",
      urgencyMultiplier: {
        emergency: 1.3,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Want new AC installed": {
      service: "Central Air - Installation",
      description: "Professional installation of new central AC system",
      priceRange: "$5,000 - $12,000",
      icon: "❄️",
      urgencyMultiplier: {
        emergency: 1.2,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Annual AC maintenance": {
      service: "Central Air - Maintenance",
      description: "Comprehensive annual maintenance service",
      priceRange: "$100 - $300",
      icon: "❄️",
      urgencyMultiplier: {
        emergency: 1.1,
        urgent: 1.05,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Mini split not cooling": {
      service: "Mini Split - Repair",
      description: "Diagnose and repair cooling issues",
      priceRange: "$200 - $1,200",
      icon: "🌬️",
      urgencyMultiplier: {
        emergency: 1.4,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Mini split leaking water": {
      service: "Mini Split - Repair",
      description: "Fix water leakage from mini split unit",
      priceRange: "$180 - $600",
      icon: "🌬️",
      urgencyMultiplier: {
        emergency: 1.3,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Mini split not turning on": {
      service: "Mini Split - Repair",
      description: "Troubleshoot power and operation issues",
      priceRange: "$150 - $500",
      icon: "🌬️",
      urgencyMultiplier: {
        emergency: 1.4,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Want mini split installed": {
      service: "Mini Split - Installation",
      description: "Professional mini split system installation",
      priceRange: "$3,000 - $8,000",
      icon: "🌬️",
      urgencyMultiplier: {
        emergency: 1.2,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Mini split maintenance": {
      service: "Mini Split - Maintenance",
      description: "Regular maintenance and cleaning service",
      priceRange: "$120 - $250",
      icon: "🌬️",
      urgencyMultiplier: {
        emergency: 1.1,
        urgent: 1.05,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Slim unit not working": {
      service: "Slim Ductless - Repair",
      description: "Diagnose and repair slim ductless unit",
      priceRange: "$180 - $1,000",
      icon: "💨",
      urgencyMultiplier: {
        emergency: 1.4,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Slim unit making noise": {
      service: "Slim Ductless - Repair",
      description: "Fix unusual noises from slim unit",
      priceRange: "$200 - $700",
      icon: "💨",
      urgencyMultiplier: {
        emergency: 1.3,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Want slim unit installed": {
      service: "Slim Ductless - Installation",
      description: "Install new slim ductless system",
      priceRange: "$2,500 - $7,000",
      icon: "💨",
      urgencyMultiplier: {
        emergency: 1.2,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Slim unit maintenance": {
      service: "Slim Ductless - Maintenance",
      description: "Maintenance service for slim units",
      priceRange: "$100 - $200",
      icon: "💨",
      urgencyMultiplier: {
        emergency: 1.1,
        urgent: 1.05,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Rooftop unit not cooling": {
      service: "Rooftop Unit - Repair",
      description: "Commercial rooftop unit cooling repair",
      priceRange: "$300 - $3,000",
      icon: "🏢",
      urgencyMultiplier: {
        emergency: 1.5,
        urgent: 1.3,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Rooftop unit making loud noises": {
      service: "Rooftop Unit - Repair",
      description: "Diagnose and repair noise issues",
      priceRange: "$400 - $2,000",
      icon: "🏢",
      urgencyMultiplier: {
        emergency: 1.4,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Need new rooftop unit": {
      service: "Rooftop Unit - Installation",
      description: "Commercial rooftop unit installation",
      priceRange: "$8,000 - $25,000",
      icon: "🏢",
      urgencyMultiplier: {
        emergency: 1.2,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Rooftop unit maintenance": {
      service: "Rooftop Unit - Maintenance",
      description: "Commercial rooftop unit maintenance",
      priceRange: "$200 - $500",
      icon: "🏢",
      urgencyMultiplier: {
        emergency: 1.2,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Air handler not working": {
      service: "Air Handler - Repair",
      description: "Diagnose and repair air handler issues",
      priceRange: "$150 - $800",
      icon: "⚙️",
      urgencyMultiplier: {
        emergency: 1.4,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Air handler making strange sounds": {
      service: "Air Handler - Repair",
      description: "Fix unusual noises from air handler",
      priceRange: "$200 - $600",
      icon: "⚙️",
      urgencyMultiplier: {
        emergency: 1.3,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "Want new air handler": {
      service: "Air Handler - Installation",
      description: "Install new air handler system",
      priceRange: "$2,000 - $6,000",
      icon: "⚙️",
      urgencyMultiplier: {
        emergency: 1.2,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Air handler maintenance": {
      service: "Air Handler - Maintenance",
      description: "Air handler maintenance service",
      priceRange: "$80 - $200",
      icon: "⚙️",
      urgencyMultiplier: {
        emergency: 1.1,
        urgent: 1.05,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Poor air quality": {
      service: "Air Handler/Maintenance",
      description: "Improve indoor air quality",
      priceRange: "$100 - $400",
      icon: "🔧",
      urgencyMultiplier: {
        emergency: 1.3,
        urgent: 1.1,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "High energy bills": {
      service: "Maintenance/Repair",
      description: "Optimize system for energy efficiency",
      priceRange: "$150 - $800",
      icon: "🔧",
      urgencyMultiplier: {
        emergency: 1.1,
        urgent: 1.05,
        normal: 1.0,
        scheduled: 0.95,
      },
    },
    "Strange smells from vents": {
      service: "Repair/Maintenance",
      description: "Address unusual odors from HVAC system",
      priceRange: "$120 - $500",
      icon: "🔧",
      urgencyMultiplier: {
        emergency: 1.4,
        urgent: 1.2,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
    "System not heating": {
      service: "Repair",
      description: "Diagnose and repair heating issues",
      priceRange: "$150 - $1,000",
      icon: "🔧",
      urgencyMultiplier: {
        emergency: 1.5,
        urgent: 1.3,
        normal: 1.0,
        scheduled: 0.9,
      },
    },
  };

  useEffect(() => {
    const problem = estimateData.problem;
    if (problem && serviceMap[problem]) {
      setIdentifiedService(serviceMap[problem]);
    } else {
      setIdentifiedService({
        service: "General Consultation",
        description: "Custom HVAC problem assessment",
        priceRange: "$75 - $200",
        icon: "🔧",
        urgencyMultiplier: {
          emergency: 1.2,
          urgent: 1.1,
          normal: 1.0,
          scheduled: 0.95,
        },
      });
    }
  }, [estimateData.problem]);

  const handleNext = () => {
    const serviceData = {
      service: identifiedService,
      urgency: urgency,
    };
    updateEstimateData({ service: serviceData });
    onNext();
  };

  const getPriceWithUrgency = (basePriceRange, multiplier) => {
    const extractNumbers = (priceStr) => {
      const matches = priceStr.match(/\$?(\d+)/g);
      return matches
        ? matches.map((num) => parseInt(num.replace("$", "")))
        : [0, 0];
    };

    const [min, max] = extractNumbers(basePriceRange);
    const newMin = Math.round(min * multiplier);
    const newMax = Math.round(max * multiplier);
    return `$${newMin} - $${newMax}`;
  };

  return (
    <div className="service-confirmation-step">
      <div className="step-header">
        <h3>Recommended Service</h3>
        <p>Based on your problem, here's what we recommend:</p>
      </div>

      {identifiedService && (
        <div className="service-confirmation-card">
          <div className="service-icon">{identifiedService.icon}</div>
          <div className="service-details">
            <h4>{identifiedService.service}</h4>
            <p className="service-description">
              {identifiedService.description}
            </p>
          </div>
        </div>
      )}

      <div className="urgency-section">
        <h4>How urgent is this issue?</h4>
        <div className="urgency-options">
          {[
            {
              value: "emergency",
              label: "Emergency - Immediate assistance",
              color: "#ef4444",
            },
            {
              value: "urgent",
              label: "Urgent - Within 24-48 hours",
              color: "#f59e0b",
            },
            {
              value: "normal",
              label: "Normal - Can wait a few days",
              color: "#3b82f6",
            },
            {
              value: "scheduled",
              label: "Scheduled - Plan for later",
              color: "#10b981",
            },
          ].map((option) => (
            <button
              key={option.value}
              className={`urgency-option ${
                urgency === option.value ? "selected" : ""
              }`}
              onClick={() => {
                setUrgency(option.value)
                // Auto-advance to next step after selecting urgency
                setTimeout(() => {
                  handleNext()
                }, 300)
              }}
              style={
                urgency === option.value ? { borderColor: option.color } : {}
              }
            >
              <div
                className="urgency-indicator"
                style={{ backgroundColor: option.color }}
              ></div>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="service-explanation">
        <h4>Why this service?</h4>
        <p>
          Based on your described problem, our AI-powered system has identified
          this as the most appropriate service. Our certified technicians will:
        </p>
        <ul>
          <li>Diagnose the exact issue with your system</li>
          <li>Provide a detailed explanation of the problem</li>
          <li>Offer transparent pricing before any work begins</li>
          <li>Complete the repair or installation professionally</li>
        </ul>
      </div>

      <div className="step-actions">
        <button className="step-button secondary" onClick={onPrev}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default ServiceConfirmationStep;
