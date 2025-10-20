import React, { useState } from 'react'

function ProblemSelectionStep({ estimateData, updateEstimateData, onNext }) {
  const [selectedProblem, setSelectedProblem] = useState(estimateData.problem || '')
  const [customProblem, setCustomProblem] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategory, setExpandedCategory] = useState(null)

  const commonProblems = [
    {
      category: "Cooling Issues",
      icon: "❄️",
      description: "Problems with air conditioning systems",
      problems: [
        "AC not cooling at all",
        "AC making strange noises", 
        "AC not turning on",
        "Weak air flow from vents",
        "AC running constantly",
        "AC freezing up",
        "Water leaking from AC unit",
        "Thermostat not working with AC"
      ]
    },
    {
      category: "Heating Issues",
      icon: "🔥",
      description: "Problems with heating systems",
      problems: [
        "Furnace not heating",
        "Heater making strange noises",
        "No heat coming from vents",
        "Pilot light won't stay lit",
        "Heating system blowing cold air",
        "High heating bills",
        "Uneven heating throughout house"
      ]
    },
    {
      category: "Installation Services",
      icon: "🛠️",
      description: "New system installation requests",
      problems: [
        "Want new AC installed",
        "Want new heating system installed",
        "Want mini split installed",
        "Want slim ductless installed",
        "Need rooftop unit installation",
        "Want air handler installed",
        "Complete HVAC system replacement",
        "Ductwork installation needed"
      ]
    },
    {
      category: "Maintenance & Repair",
      icon: "🔧",
      description: "Regular maintenance and repair needs",
      problems: [
        "Annual AC maintenance",
        "Annual heating maintenance",
        "System tune-up needed",
        "Emergency repair needed",
        "Preventive maintenance",
        "Seasonal maintenance",
        "Filter replacement needed",
        "Duct cleaning required"
      ]
    },
    {
      category: "Air Quality & Efficiency",
      icon: "🌬️",
      description: "Air quality and energy efficiency concerns",
      problems: [
        "Poor air quality",
        "High energy bills",
        "Strange smells from vents",
        "Excessive dust in home",
        "Humidity problems",
        "Air purifier installation",
        "Ventilation issues",
        "Indoor air quality testing"
      ]
    },
    {
      category: "Other Issues",
      icon: "❓",
      description: "Other HVAC-related problems",
      problems: [
        "Thermostat problems",
        "Electrical issues with HVAC",
        "Noise complaints",
        "System not responding",
        "Custom problem"
      ]
    }
  ]

  const filteredProblems = commonProblems.map(category => ({
    ...category,
    problems: category.problems.filter(problem =>
      problem.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.problems.length > 0)

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem)
    updateEstimateData({ problem })
    
    // Auto-advance to next step for all problems except "Custom problem"
    if (problem !== "Custom problem") {
      setTimeout(() => {
        onNext()
      }, 300) // Small delay for better UX
    }
  }

  const handleCustomProblemSubmit = () => {
    if (selectedProblem === "Custom problem" && customProblem.trim()) {
      updateEstimateData({ problem: customProblem.trim() })
      onNext()
    }
  }

  const isNextDisabled = !selectedProblem || (selectedProblem === "Custom problem" && !customProblem.trim())

  return (
    <div className="problem-selection-step">
      <div className="step-header">
        <h3>What HVAC problem are you experiencing?</h3>
        <p>Select the issue that best describes your situation</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for your problem..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="problems-grid">
        {filteredProblems.map((category) => (
          <div key={category.category} className="problem-category">
            <div 
              className="category-header clickable"
              onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
            >
              <span className="category-icon">{category.icon}</span>
              <div className="category-title">
                <h4>{category.category}</h4>
                <p className="category-description">{category.description}</p>
              </div>
              <span className="expand-icon">{expandedCategory === category.category ? '▼' : '▶'}</span>
            </div>
            {expandedCategory === category.category && (
              <div className="category-problems">
                {category.problems.map((problem) => (
                  <button
                    key={problem}
                    className={`problem-option ${selectedProblem === problem ? 'selected' : ''}`}
                    onClick={() => handleProblemSelect(problem)}
                  >
                    {problem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedProblem === "Custom problem" && (
        <div className="custom-problem-container">
          <label htmlFor="custom-problem">Please describe your problem:</label>
          <textarea
            id="custom-problem"
            placeholder="Describe your HVAC issue in detail..."
            value={customProblem}
            onChange={(e) => setCustomProblem(e.target.value)}
            rows={3}
          />
        </div>
      )}

      {selectedProblem === "Custom problem" && (
        <div className="step-actions">
          <button
            className="step-button primary"
            onClick={handleCustomProblemSubmit}
            disabled={!customProblem.trim()}
          >
            Continue to Service Info
          </button>
        </div>
      )}
    </div>
  )
}

export default ProblemSelectionStep
