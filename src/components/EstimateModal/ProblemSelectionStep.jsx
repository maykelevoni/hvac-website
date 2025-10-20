import React, { useState } from 'react'

function ProblemSelectionStep({ estimateData, updateEstimateData, onNext }) {
  const [selectedProblem, setSelectedProblem] = useState(estimateData.problem || '')
  const [customProblem, setCustomProblem] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const commonProblems = [
    {
      category: "Central Air Conditioning",
      icon: "❄️",
      problems: [
        "AC not cooling at all",
        "AC making strange noises", 
        "AC not turning on",
        "Weak air flow from vents",
        "AC running constantly",
        "Want new AC installed",
        "Annual AC maintenance"
      ]
    },
    {
      category: "Mini Split Systems",
      icon: "🌬️",
      problems: [
        "Mini split not cooling",
        "Mini split leaking water",
        "Mini split not turning on", 
        "Want mini split installed",
        "Mini split maintenance"
      ]
    },
    {
      category: "Slim Ductless",
      icon: "💨",
      problems: [
        "Slim unit not working",
        "Slim unit making noise",
        "Want slim unit installed",
        "Slim unit maintenance"
      ]
    },
    {
      category: "Rooftop Units",
      icon: "🏢",
      problems: [
        "Rooftop unit not cooling",
        "Rooftop unit making loud noises",
        "Need new rooftop unit",
        "Rooftop unit maintenance"
      ]
    },
    {
      category: "Air Handlers",
      icon: "⚙️",
      problems: [
        "Air handler not working",
        "Air handler making strange sounds",
        "Want new air handler",
        "Air handler maintenance"
      ]
    },
    {
      category: "General Issues",
      icon: "🔧",
      problems: [
        "Poor air quality",
        "High energy bills",
        "Strange smells from vents",
        "System not heating",
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
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h4>{category.category}</h4>
            </div>
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
