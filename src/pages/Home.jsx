import React from 'react'

function Home({ setCurrentPage, openEstimateModal }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Heating & Cooling Installation & Service</h1>
            <p className="hero-description">
              Reliable HVAC solutions for homes and businesses in New Jersey.
              Licensed & Insured HVAC Contractor.
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={openEstimateModal}>
                Get Instant Estimate
              </button>
              <a href="tel:9083612183" className="cta-button secondary">
                Call Now: (908) 361-2183
              </a>
            </div>
            <div className="hero-subtext">
              <p>Get your free HVAC estimate in 60 seconds - No obligation!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image">
                <img src="https://picsum.photos/400/300?random=1" alt="Central Air Conditioning" onError="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5DZW50cmFsIEFpciBDb25kaXRpb25pbmc8L3RleHQ+PC9zdmc+'" />
              </div>
              <div className="service-content">
                <h3>Central Air Conditioning</h3>
                <p>Professional installation and maintenance of central air conditioning systems for optimal cooling throughout your property.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img src="https://picsum.photos/400/300?random=2" alt="Mini Split Systems" onError="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5NaW5pIFNwbGl0IFN5c3RlbXM8L3RleHQ+PC9zdmc+'" />
              </div>
              <div className="service-content">
                <h3>Mini Split Systems</h3>
                <p>Energy-efficient ductless mini split installation and service for targeted climate control in any room.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img src="https://picsum.photos/400/300?random=3" alt="Slim Ductless" onError="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5TbGltIER1Y3RsZXNzPC90ZXh0Pjwvc3Zn'" />
              </div>
              <div className="service-content">
                <h3>Slim Ductless</h3>
                <p>Space-saving slim ductless units perfect for homes and businesses with limited space requirements.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img src="https://picsum.photos/400/300?random=4" alt="Rooftop Units" onError="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5Sb29mdG9wIFVuaXRzPC90ZXh0Pjwvc3Zn'" />
              </div>
              <div className="service-content">
                <h3>Rooftop Units</h3>
                <p>Commercial rooftop HVAC unit installation, repair, and maintenance for businesses of all sizes.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img src="https://picsum.photos/400/300?random=5" alt="Air Handlers" onError="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5BaXIgSGFuZGxlcnM8L3RleHQ+PC9zdmc+'" />
              </div>
              <div className="service-content">
                <h3>Air Handlers</h3>
                <p>Expert air handler installation and service to ensure efficient air circulation and filtration.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img src="https://picsum.photos/400/300?random=6" alt="Repair & Maintenance" onError="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5SZXBhaXIgJiBNYWludGVuYW5jZTwvdGV4dD48L3N2Z+'" />
              </div>
              <div className="service-content">
                <h3>Repair & Maintenance</h3>
                <p>Comprehensive repair services and preventative maintenance to keep your HVAC system running smoothly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-us">
        <div className="container">
          <h2>About Mafair HVAC</h2>
          <div className="about-content">
            <div className="about-image-section">
              <img src="https://picsum.photos/600/400?random=7" alt="HVAC Professional at Work" className="about-main-image" onError="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIzMDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5IVkFDIFByb2Zlc3Npb25hbCBhdCBXb3JrPC90ZXh0Pjwvc3Zn+'" />
            </div>
            <div className="about-text-section">
              <p className="about-text">
                With years of experience in heating and cooling, Mafair HVAC provides top-quality
                installation and maintenance services across New Jersey. We value honesty, reliability,
                and comfort for every customer.
              </p>
              <div className="benefits-grid">
                <div className="benefit">
                  <h3>✓ Licensed & Insured</h3>
                  <p>Fully certified HVAC contractor with comprehensive insurance coverage</p>
                </div>
                <div className="benefit">
                  <h3>✓ Professional Service</h3>
                  <p>Experienced technicians dedicated to quality workmanship</p>
                </div>
                <div className="benefit">
                  <h3>✓ Honest Pricing</h3>
                  <p>Transparent estimates with no hidden fees</p>
                </div>
                <div className="benefit">
                  <h3>✓ New Jersey Trusted</h3>
                  <p>Serving homes and businesses throughout New Jersey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Contact Us</h3>
              <p>Call us or fill out our online form with your HVAC needs</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Free Estimate</h3>
              <p>We provide a transparent, no-obligation quote for your project</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Professional Installation</h3>
              <p>Our experienced team completes the work with precision and care</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Enjoy Comfort</h3>
              <p>Relax in your perfectly climate-controlled space</p>
            </div>
          </div>
          <div className="cta-center">
            <button className="cta-button secondary" onClick={openEstimateModal}>
              Get Your Free Estimate
            </button>
          </div>
        </div>
      </section>

      <section className="contact-banner">
        <div className="container">
          <div className="contact-content">
            <h2>📞 Ready to Get Started?</h2>
            <p>Contact us today for reliable HVAC solutions in New Jersey</p>
            <div className="contact-buttons">
              <a href="tel:9083612183" className="contact-phone">(908) 361-2183</a>
              <a href="tel:9087088495" className="contact-phone">(908) 708-8495</a>
            </div>
            <p className="contact-email">
              <a href="mailto:Mafairhvac@gmail.com">Mafairhvac@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
