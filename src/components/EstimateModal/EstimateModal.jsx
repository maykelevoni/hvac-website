import React, { useState } from 'react'
import ProblemSelectionStep from './ProblemSelectionStep'
import ServiceConfirmationStep from './ServiceConfirmationStep'
import CustomerInfoStep from './CustomerInfoStep'
import EstimateResultsStep from './EstimateResultsStep'

function EstimateModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [estimateData, setEstimateData] = useState({
    problem: '',
    service: null,
    customerInfo: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const steps = [
    { number: 1, title: 'Select Problem' },
    { number: 2, title: 'Service Info' },
    { number: 3, title: 'Your Info' },
    { number: 4, title: 'Your Estimate' }
  ]

  const updateEstimateData = (data) => {
    setEstimateData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetModal = () => {
    setCurrentStep(1)
    setEstimateData({
      problem: '',
      service: null,
      customerInfo: {
        name: '',
        email: '',
        phone: ''
      }
    })
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Get Your Instant Estimate</h2>
          <button className="modal-close" onClick={handleClose}>×</button>
        </div>

        <div className="progress-bar">
          <div className="progress-steps">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-title">{step.title}</div>
              </div>
            ))}
          </div>
          <div className="progress-line">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="modal-body">
          {currentStep === 1 && (
            <ProblemSelectionStep
              estimateData={estimateData}
              updateEstimateData={updateEstimateData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <ServiceConfirmationStep
              estimateData={estimateData}
              updateEstimateData={updateEstimateData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 3 && (
            <CustomerInfoStep
              estimateData={estimateData}
              updateEstimateData={updateEstimateData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 4 && (
            <EstimateResultsStep
              estimateData={estimateData}
              onClose={handleClose}
              onRestart={resetModal}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EstimateModal
