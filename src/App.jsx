import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServiceRequest from './pages/ServiceRequest'
import Pricing from './pages/Pricing'
import EstimateModal from './components/EstimateModal/EstimateModal'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'

function App() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false)

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Admin routes - Must come FIRST */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="leads" element={<AdminDashboard />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Public routes */}
          <Route path="/*" element={
            <>
              <Header openEstimateModal={() => setIsEstimateModalOpen(true)} />
              <main>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        openEstimateModal={() => setIsEstimateModalOpen(true)}
                      />
                    }
                  />
                  <Route path="/service" element={<ServiceRequest />} />
                  <Route path="/pricing" element={<Pricing />} />
                </Routes>
              </main>
              <Footer />
              <EstimateModal
                isOpen={isEstimateModalOpen}
                onClose={() => setIsEstimateModalOpen(false)}
              />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
