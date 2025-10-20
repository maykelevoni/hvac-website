import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🌬️ Mafair HVAC</h3>
            <p className="footer-tagline">Installation - Service</p>
            <p>Licensed & Insured HVAC Contractor</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📞 <a href="tel:9083612183">(908) 361-2183</a></p>
            <p>📞 <a href="tel:9087088495">(908) 708-8495</a></p>
            <p>📧 <a href="mailto:Mafairhvac@gmail.com">Mafairhvac@gmail.com</a></p>
          </div>
          <div className="footer-section">
            <h3>Service Area</h3>
            <p>New Jersey, USA</p>
            <p>Residential & Commercial</p>
            <p>Installation & Maintenance</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Mafair HVAC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
