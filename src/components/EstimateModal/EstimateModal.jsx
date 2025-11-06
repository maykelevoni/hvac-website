import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { BUSINESS_INFO } from '../../config/business'

function EstimateModal({ isOpen, onClose }) {
  const [chatHistory, setChatHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesRef = useRef(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const [showJumpToLatest, setShowJumpToLatest] = useState(false)
  const [estimateData, setEstimateData] = useState({
    problem: '',
    service: null,
    customerInfo: { name: '', email: '', phone: '' },
    contactPreference: ''
  })
  const [leadSaved, setLeadSaved] = useState(false)
  const [showContactOptions, setShowContactOptions] = useState(false)

  const serviceMap = {
    "AC not cooling": { service: "Central Air - Repair", priceRange: "$150 - $1,500", icon: "❄️" },
    "heating not working": { service: "Heating - Repair", priceRange: "$150 - $1,000", icon: "🔥" },
    "new installation": { service: "Central Air - Installation", priceRange: "$5,000 - $12,000", icon: "❄️" }
  }

  const addBotMessage = (text) => {
    setChatHistory(prev => {
      const updated = [...prev, { id: Date.now() + Math.random(), role: 'bot', text }]
      if (!shouldAutoScroll) setShowJumpToLatest(true)
      return updated
    })
  }

  const addUserMessage = (text) => {
    setChatHistory(prev => [...prev, { id: Date.now() + Math.random(), role: 'user', text }])
    setShouldAutoScroll(true)
    setShowJumpToLatest(false)
  }

  const scrollToBottom = (force = false) => {
    const el = messagesRef.current
    if (!el) return
    if (force || shouldAutoScroll) {
      el.scrollTop = el.scrollHeight
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userInput = inputValue.trim()
    addUserMessage(userInput)
    setInputValue('')
    setIsTyping(true)

    // Process based on current state
    if (!estimateData.problem) {
      // Step 1: Problem description
      setEstimateData(prev => ({ ...prev, problem: userInput }))
      
      // Find matching service
      const lowerInput = userInput.toLowerCase()
      let matchedService = null
      for (const [key, service] of Object.entries(serviceMap)) {
        if (lowerInput.includes(key.toLowerCase())) {
          matchedService = service
          break
        }
      }
      
      if (!matchedService) {
        matchedService = { service: "General Consultation", priceRange: "$75 - $200", icon: "🔧" }
      }

      setTimeout(() => {
        setIsTyping(false)
        addBotMessage(`Got it! Based on your issue, I recommend: ${matchedService.service}`)
        setTimeout(() => {
          setEstimateData(prev => ({ ...prev, service: matchedService }))
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            addBotMessage("Now I need your contact information. What's your name?")
          }, 600)
        }, 1000)
      }, 800)

    } else if (!estimateData.customerInfo.name) {
      // Step 2: Name
      setEstimateData(prev => ({
        ...prev,
        customerInfo: { ...prev.customerInfo, name: userInput }
      }))
      setTimeout(() => {
        setIsTyping(false)
        addBotMessage(`Nice to meet you, ${userInput}! What's your email address?`)
      }, 600)

    } else if (!estimateData.customerInfo.email) {
      // Step 3: Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userInput)) {
        setTimeout(() => {
          setIsTyping(false)
          addBotMessage("Please enter a valid email address.")
        }, 600)
        return
      }
      setEstimateData(prev => ({
        ...prev,
        customerInfo: { ...prev.customerInfo, email: userInput }
      }))
      setTimeout(() => {
        setIsTyping(false)
        addBotMessage("Great! What's your phone number?")
      }, 600)

    } else if (!estimateData.customerInfo.phone) {
      // Step 4: Phone
      const digitsOnly = userInput.replace(/\D/g, '')
      if (digitsOnly.length < 10) {
        setTimeout(() => {
          setIsTyping(false)
          addBotMessage("Please enter a valid phone number (at least 10 digits).")
        }, 600)
        return
      }
      setEstimateData(prev => ({
        ...prev,
        customerInfo: { ...prev.customerInfo, phone: userInput }
      }))
      setTimeout(() => {
        setIsTyping(false)
        addBotMessage("Perfect! How would you like us to contact you? Say 'call', 'email', or 'either'.")
      }, 600)

    } else if (!estimateData.contactPreference) {
      // Step 5: Contact preference
      const pref = userInput.toLowerCase().includes('call') ? 'phone' :
                   userInput.toLowerCase().includes('email') ? 'email' : 'either'
      setEstimateData(prev => ({ ...prev, contactPreference: pref }))
      
      setTimeout(() => {
        setIsTyping(false)
        const service = estimateData.service || { service: "General Consultation", priceRange: "$75 - $200", icon: "🔧" }
        addBotMessage(`Excellent! Here's your estimate:`)
        setTimeout(() => {
          addBotMessage(`Service: ${service.service}`)
          setTimeout(() => {
            addBotMessage(`Price Range: ${service.priceRange}`)
            setTimeout(() => {
              addBotMessage(`We'll ${pref === 'phone' ? 'call' : pref === 'email' ? 'email' : 'contact'} you at ${pref === 'phone' ? estimateData.customerInfo.phone : estimateData.customerInfo.email} soon!`)
              // Save lead after sending the final message
              saveLead({
                problem: estimateData.problem,
                service: service,
                customerInfo: estimateData.customerInfo,
                contactPreference: pref,
              })
            }, 500)
          }, 500)
        }, 500)
      }, 600)
    }
  }

  const saveLead = async ({ problem, service, customerInfo, contactPreference }) => {
    if (leadSaved) return
    // Validate essentials
    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone || !problem || !service) return
    if (!supabase) {
      console.warn('Supabase not configured; skipping lead save')
      setLeadSaved(true)
      return
    }
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            problem: problem,
            service: service, // JSONB
            urgency: 'normal',
            price_estimate: service.priceRange || null,
            status: 'new',
            contact_preference: contactPreference === 'either' ? 'wait' : contactPreference,
            consent_given: true,
          }
        ])
      if (error) {
        console.error('Error saving lead:', error)
        addBotMessage('⚠️ We got your contact. If you prefer, you can reach us directly below.')
        setShowContactOptions(true)
      } else {
        setLeadSaved(true)
        addBotMessage('We got your contact. A specialist will reach out soon.')
        setShowContactOptions(true)
      }
    } catch (err) {
      console.error('Unexpected error saving lead:', err)
      addBotMessage('⚠️ We got your contact. If you prefer, you can reach us directly below.')
      setShowContactOptions(true)
    }
  }

  useEffect(() => {
    if (isOpen) {
      setChatHistory([
        { id: 1, role: 'bot', text: "👋 Hi! I'm your HVAC assistant. Let's get you an instant estimate." },
        { id: 2, role: 'bot', text: 'What problem are you experiencing with your HVAC system?' }
      ])
      setEstimateData({
        problem: '',
        service: null,
        customerInfo: { name: '', email: '', phone: '' },
        contactPreference: ''
      })
      setInputValue('')
      setIsTyping(false)
      setTimeout(() => scrollToBottom(true), 0)
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isTyping])

  const handleMessagesScroll = () => {
    const el = messagesRef.current
    if (!el) return
    const threshold = 60
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold
    setShouldAutoScroll(atBottom)
    if (atBottom) setShowJumpToLatest(false)
  }

  return (
    !isOpen ? null : (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-title">
              <div className="title">HVAC Assistant</div>
              <div className="status">Online • Ready to help</div>
            </div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="chatbot-messages" ref={messagesRef} onScroll={handleMessagesScroll}>
            {chatHistory.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="message-avatar">{msg.role === 'bot' ? '🤖' : '🧑'}</div>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            {showJumpToLatest && (
              <button
                type="button"
                className="scroll-to-latest"
                onClick={() => {
                  setShouldAutoScroll(true)
                  setShowJumpToLatest(false)
                  scrollToBottom(true)
                }}
              >
                New messages • Jump to latest
              </button>
            )}
          {showContactOptions && (
            <div className="chat-contact-options">
              <a className="contact-btn call" href={`tel:${BUSINESS_INFO.phone.primary}`}>
                📞 Call {BUSINESS_INFO.phone.primaryFormatted}
              </a>
              <a className="contact-btn email" href={`mailto:${BUSINESS_INFO.email.primary}`}>
                ✉️ Email {BUSINESS_INFO.email.primary}
              </a>
            </div>
          )}
          </div>

          <div className="chatbot-input-area">
            <form onSubmit={handleSubmit} className="chatbot-form">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="chatbot-textarea"
                rows="2"
                autoFocus
              />
              <div className="step-actions">
                <button
                  type="submit"
                  className="step-button primary"
                  disabled={!inputValue.trim()}
                >
                  Send →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default EstimateModal
