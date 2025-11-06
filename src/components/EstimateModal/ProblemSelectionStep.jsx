import React, { useState } from 'react'

function ProblemSelectionStep({ estimateData, updateEstimateData, onNext, addUserMessage, addBotMessage }) {
  const [problem, setProblem] = useState(estimateData.problem || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!problem.trim()) {
      setError('Please describe your HVAC issue')
      return
    }

    if (problem.trim().length < 10) {
      setError('Please provide more details (at least 10 characters)')
      return
    }

    // Add user message to chat
    if (addUserMessage) {
      addUserMessage(problem.trim())
    }

    updateEstimateData({ problem: problem.trim() })
    onNext()
  }

  const handleInputChange = (e) => {
    setProblem(e.target.value)
    if (error) setError('')
  }

  const handleQuickSelect = (text) => {
    setProblem(text)
    if (error) setError('')
  }

  return (
    <div className="problem-selection-step chatbot-step">
      <form onSubmit={handleSubmit} className="chatbot-form">
        <div className="form-group">
          <label htmlFor="problem" className="input-label-top">Describe your issue:</label>
          <textarea
            id="problem"
            value={problem}
            onChange={handleInputChange}
            placeholder="Type your HVAC issue here..."
            className={`chatbot-textarea ${error ? 'error' : ''}`}
            rows="2"
            autoFocus
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <div className="quick-suggestions">
          <div className="suggestions-chips">
            <button
              type="button"
              className="chip"
              onClick={() => handleQuickSelect("My AC is not cooling properly")}
            >
              AC not cooling
            </button>
            <button
              type="button"
              className="chip"
              onClick={() => handleQuickSelect("My heating system isn't working")}
            >
              Heating not working
            </button>
            <button
              type="button"
              className="chip"
              onClick={() => handleQuickSelect("Need new AC installation")}
            >
              New installation
            </button>
          </div>
        </div>

        <div className="step-actions">
          <button
            type="submit"
            className="step-button primary"
            disabled={!problem.trim() || problem.trim().length < 10}
          >
            Send →
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProblemSelectionStep
