import React, { useState, useEffect } from 'react'

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'cooling', label: 'Cooling' },
    { id: 'heating', label: 'Heating' },
    { id: 'installation', label: 'Installation' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'air-quality', label: 'Air Quality' }
  ]

  // Placeholder gallery items - in production, these would come from Supabase
  const galleryItems = [
    { id: 1, serviceType: 'cooling', imageUrl: 'https://picsum.photos/400/300?random=9', description: 'Central AC Installation' },
    { id: 2, serviceType: 'cooling', imageUrl: 'https://picsum.photos/400/300?random=10', description: 'Mini Split System' },
    { id: 3, serviceType: 'installation', imageUrl: 'https://picsum.photos/400/300?random=11', description: 'Professional Installation' },
    { id: 4, serviceType: 'maintenance', imageUrl: 'https://picsum.photos/400/300?random=12', description: 'Routine Maintenance' },
    { id: 5, serviceType: 'heating', imageUrl: 'https://picsum.photos/400/300?random=13', description: 'Heating System Repair' },
    { id: 6, serviceType: 'air-quality', imageUrl: 'https://picsum.photos/400/300?random=14', description: 'Air Quality Improvement' },
    { id: 7, serviceType: 'cooling', imageUrl: 'https://picsum.photos/400/300?random=15', description: 'AC Unit Replacement' },
    { id: 8, serviceType: 'installation', imageUrl: 'https://picsum.photos/400/300?random=16', description: 'New System Installation' },
    { id: 9, serviceType: 'maintenance', imageUrl: 'https://picsum.photos/400/300?random=17', description: 'System Tune-up' }
  ]

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.serviceType === activeFilter)

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying || filteredItems.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, filteredItems.length])

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeFilter])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <h2>Our Work Gallery</h2>
        <p className="gallery-subtitle">See examples of our professional HVAC installations and services</p>

        <div className="gallery-filter-buttons">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`gallery-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="gallery-empty">
            <p>No images found for this category.</p>
          </div>
        ) : (
          <div className="gallery-slider">
            <button className="slider-btn prev" onClick={goToPrevious} aria-label="Previous image">
              ‹
            </button>

            <div className="slider-container">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {filteredItems.map((item) => (
                  <div key={item.id} className="slider-slide">
                    <img
                      src={item.imageUrl}
                      alt="HVAC Service"
                      onClick={() => setSelectedImage(item)}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlM2YyZmQiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTk3NmQyIj5IVkFDIEltYWdlPC90ZXh0Pjwvc3Zn'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button className="slider-btn next" onClick={goToNext} aria-label="Next image">
              ›
            </button>

            <div className="slider-dots">
              {filteredItems.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <div className="slider-counter">
              {currentIndex + 1} / {filteredItems.length}
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.imageUrl} alt="HVAC Service" />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery




