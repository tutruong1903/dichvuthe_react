import { useEffect, useState } from 'react';

function ContactPage() {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('hanoi');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Font Awesome
    const faLink = document.createElement('link');
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    faLink.rel = 'stylesheet';
    document.head.appendChild(faLink);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('.contact-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.head.contains(faLink)) {
        document.head.removeChild(faLink);
      }
    };
  }, []);

  const hanoiLocations = [
    {
      district: 'Cầu Giấy',
      address: 'Toà N09B2 Thành Thái - Hà Nội',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Toà+N09B2+Thành+Thái+Hà+Nội'
    },
    {
      district: 'Bắc Từ Liêm',
      address: '30 Hồ Tùng Mậu - Phú Diễn - Hà Nội',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=30+Hồ+Tùng+Mậu+Phú+Diễn+Hà+Nội'
    },
    {
      district: 'Bắc Từ Liêm',
      address: 'N1T6 Han Jardin - Khu Ngoại Giao Đoàn - Hà Nội',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=N1T6+Han+Jardin+Khu+Ngoại+Giao+Đoàn+Hà+Nội'
    }
  ];

  const haiphongLocations = [
    {
      district: 'Thuỷ Nguyên',
      address: 'Dương Kinh - Kiến Thuỵ - Thuỷ Nguyên - Hải Phòng',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dương+Kinh+Kiến+Thuỵ+Thuỷ+Nguyên+Hải+Phòng'
    },
    {
      district: 'Lê Chân',
      address: 'HD10 Vinhomes Marina - Lê Chân - Hải Phòng',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=HD10+Vinhomes+Marina+Lê+Chân+Hải+Phòng'
    },
    {
      district: 'Kiến An',
      address: '101 Trần Thành Ngọ - Kiến An - Hải Phòng',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=101+Trần+Thành+Ngọ+Kiến+An+Hải+Phòng'
    }
  ];

  const handleOpenMap = (mapUrl) => {
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="contact-page">
      {/* Main Contact Section with Form and Locations */}
      <section 
        id="contact-main" 
        className={`contact-section contact-main-section ${isVisible['contact-main'] ? 'fade-in-up' : ''}`}
      >
        <div className="contact-main-container">
          {/* Left: Contact Form */}
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2>Liên hệ tư vấn</h2>
              <p>Để lại thông tin, chúng tôi sẽ liên hệ với bạn</p>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Họ và tên *" className="form-input" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Số điện thoại *" className="form-input" required />
              </div>
              <button type="submit" className="form-submit-button">
                <i className="fas fa-paper-plane"></i>
                Gửi thông tin
              </button>
            </form>
          </div>

          {/* Right: Locations */}
          <div className="contact-locations-wrapper">
            <div className={`locations-section-group ${activeSection === 'hanoi' ? 'active' : ''}`}>
              <div className="locations-group-header" onClick={() => toggleSection('hanoi')}>
                <h3 className="locations-group-title">Hà Nội</h3>
                <span className="location-toggle-icon">
                  <i className={`fas fa-chevron-${activeSection === 'hanoi' ? 'up' : 'down'}`}></i>
                </span>
              </div>
              <div className="locations-list">
                {hanoiLocations.map((location, index) => (
                  <div key={index} className="location-item">
                    <div className="location-info">
                      <div className="location-icon-small">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="location-details">
                        <h4>{location.district}</h4>
                        <p>{location.address}</p>
                      </div>
                    </div>
                    <button 
                      className="location-map-btn"
                      onClick={() => handleOpenMap(location.mapUrl)}
                    >
                      <i className="fas fa-directions"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`locations-section-group ${activeSection === 'haiphong' ? 'active' : ''}`}>
              <div className="locations-group-header" onClick={() => toggleSection('haiphong')}>
                <h3 className="locations-group-title">Hải Phòng</h3>
                <span className="location-toggle-icon">
                  <i className={`fas fa-chevron-${activeSection === 'haiphong' ? 'up' : 'down'}`}></i>
                </span>
              </div>
              <div className="locations-list">
                {haiphongLocations.map((location, index) => (
                  <div key={index} className="location-item">
                    <div className="location-info">
                      <div className="location-icon-small">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="location-details">
                        <h4>{location.district}</h4>
                        <p>{location.address}</p>
                      </div>
                    </div>
                    <button 
                      className="location-map-btn"
                      onClick={() => handleOpenMap(location.mapUrl)}
                    >
                      <i className="fas fa-directions"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
