import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TestimonialsSection() {
  const learnMoreBtnRef = useRef(null);
  const testimonialVisualRef = useRef(null);

  useEffect(() => {
    gsap.set(".testimonials-visual", { autoAlpha: 0, x: -80 });
    gsap.set(".testimonials-text", { autoAlpha: 0, x: 80 });
    gsap.set(".testimonial-card", { autoAlpha: 0, y: 60 });
    
    gsap.to(".testimonials-visual", {
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top 75%",
        once: true
      },
      x: 0,
      autoAlpha: 1,
      duration: 1.2,
      ease: "power3.out"
    });

    gsap.to(".testimonials-text", {
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top 75%",
        once: true
      },
      x: 0,
      autoAlpha: 1,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out"
    });

    gsap.to(".testimonial-card", {
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 80%",
        once: true
      },
      y: 0,
      autoAlpha: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // Learn more button effects
    const button = learnMoreBtnRef.current;
    if (button) {
      const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x / 3,
          y: y / 3,
          duration: 0.3,
          ease: "power3.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out"
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      gsap.to(button, {
        boxShadow: "0 8px 30px rgba(93, 211, 208, 0.5)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  const handleContactClick = () => {
    window.location.href = 'tel:0818292929';
  };


  useEffect(() => {
    const testimonialVisual = testimonialVisualRef.current;
    if (testimonialVisual) {
      const handleMouseMove = (e) => {
        const rect = testimonialVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 30;
        const y = (e.clientY - rect.top - rect.height / 2) / 30;
        
        const cardVisual1 = document.querySelector(".card-visual-1");
        const cardVisual2 = document.querySelector(".card-visual-2");
        
        if (cardVisual1) {
          gsap.to(cardVisual1, {
            rotation: -8 + x,
            x: x * 2,
            y: y * 2,
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        if (cardVisual2) {
          gsap.to(cardVisual2, {
            rotation: 5 + x * 0.5,
            x: 40 + x,
            y: 20 + y,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      };
      
      const handleMouseLeave = () => {
        const cardVisual1 = document.querySelector(".card-visual-1");
        const cardVisual2 = document.querySelector(".card-visual-2");
        
        if (cardVisual1) {
          gsap.to(cardVisual1, {
            rotation: -8,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        }
        
        if (cardVisual2) {
          gsap.to(cardVisual2, {
            rotation: 5,
            x: 40,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      };

      testimonialVisual.addEventListener("mousemove", handleMouseMove);
      testimonialVisual.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        testimonialVisual.removeEventListener("mousemove", handleMouseMove);
        testimonialVisual.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <div className="testimonials-visual" ref={testimonialVisualRef}>
          <div className="testimonial-card-visual card-visual-1">
            <span className="nfc-visual">)))</span>
            <div className="card-label-visual">Credit Card No.</div>
            <div className="card-number-visual">1602 0911 2019 2021</div>
            <div className="card-info-visual">
              <div>
                <label>Name</label>
                <p>REHAN RAHMAN</p>
              </div>
              <div>
                <label>Exp.</label>
                <p>09/11</p>
              </div>
            </div>
            <div className="card-chip-visual"></div>
          </div>
          <div className="testimonial-card-visual card-visual-2">
            <div className="card-label-visual">Credit Card No.</div>
            <div className="card-number-visual">1602 0911 2019 2021</div>
            <div className="card-info-visual">
              <div>
                <label>Name</label>
                <p>REHAN RAHMAN</p>
              </div>
              <div>
                <label>Exp.</label>
                <p>09/11</p>
              </div>
            </div>
            <div className="card-grid-visual">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="6" height="6"/>
                <rect x="13" y="3" width="6" height="6"/>
                <rect x="3" y="13" width="6" height="6"/>
                <rect x="13" y="13" width="6" height="6"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="testimonials-text">
          <h2>Khách hàng tin tưởng</h2>
          <p>Dịch vụ đáo – rút tiền thẻ tín dụng luôn xử lý nhanh, minh bạch và an toàn. Mỗi lần cần hỗ trợ, tôi đều được giải quyết chỉ trong vài phút, hoàn toàn yên tâm.</p>
          <button className="learn-more-btn" ref={learnMoreBtnRef} onClick={handleContactClick}>Liên hệ ngay</button>
        </div>
      </div>

      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p className="testimonial-text">"Tôi đã sử dụng dịch vụ của anh chị hơn 2 năm rồi. Phí rẻ, nhanh chóng và rất uy tín. Lần nào cần cũng được hỗ trợ nhanh chóng, không bao giờ làm tôi thất vọng"</p>
          <div className="testimonial-author">
            <img src="/assets/3.jpg" alt="Nguyễn Minh H***" />
            <div>
              <h4>Nguyễn Minh H***</h4>
              <p>Khách hàng</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">  
          <p className="testimonial-text">"Dịch vụ tốt nhất Hà Nội! Phí chỉ 1.2%, so với các nơi khác từ 1.8-2.0% thì rẻ hơn nhiều. Nhân viên chuyên nghiệp, tận tình, giải thích kỹ càng."</p>
          <div className="testimonial-author">
            <img src="/assets/4.jpg" alt="Hoàng Minh K****" />
            <div>
              <h4>Hoàng Minh K****</h4>
              <p>Khách hàng</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <p className="testimonial-text">"Mấy năm nay chỉ tin tưởng dịch vụ này thôi. An toàn 100%, không bao giờ gặp rắc rối gì. Đặc biệt là phục vụ 24/7, lúc nào cần cũng có người trả lời."</p>
          <div className="testimonial-author">
            <img src="/assets/5.jpg" alt="Anh Đức N****" />
            <div>
              <h4>Anh Đức N****</h4>
              <p>Khách hàng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

