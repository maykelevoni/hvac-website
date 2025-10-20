import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServiceRequest from './pages/ServiceRequest'
import EstimateModal from './components/EstimateModal/EstimateModal'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false)

  return (
    <div className="app">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        openEstimateModal={() => setIsEstimateModalOpen(true)}
      />
      <main>
        {currentPage === 'home' && <Home 
          setCurrentPage={setCurrentPage} 
          openEstimateModal={() => setIsEstimateModalOpen(true)}
        />}
        {currentPage === 'service' && <ServiceRequest />}
      </main>
      <Footer />
      <EstimateModal 
        isOpen={isEstimateModalOpen} 
        onClose={() => setIsEstimateModalOpen(false)} 
      />
    </div>
  )
}

export default App
