import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function OfferSection() {
  useEffect(() => {
    gsap.set(".offer-title", { autoAlpha: 0, y: 50 });
    gsap.set(".offer-card", { autoAlpha: 0, y: 60 });
    
    gsap.to(".offer-title", {
      scrollTrigger: {
        trigger: ".offer-section",
        start: "top 75%",
        once: true
      },
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(".offer-card", {
      scrollTrigger: {
        trigger: ".offer-section",
        start: "top 70%",
        once: true
      },
      y: 0,
      autoAlpha: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  return (
    <section className="offer-section">
      <h2 className="offer-title">
        Chúng tôi cung cấp những gì?
        <span className="star-small"></span>
      </h2>
      <div className="offer-cards">
        <div className="offer-card">
          <div className="offer-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <h3>Bảo mật & An toàn</h3>
          <p>Dữ liệu và tiền của bạn sẽ được bảo mật và an toàn.</p>
        </div>
        <div className="offer-card">
          <div className="offer-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3>Tiết kiệm thời gian</h3>
          <p>Quy trình đơn giản, nhanh chóng, tiết kiệm thời gian.</p>
        </div>
        <div className="offer-card">
          <div className="offer-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18"/>
              <path d="M7 16l4-4 4 4 4-4"/>
            </svg>
          </div>
          <h3>Nhiều phương thức</h3>
          <p>Đa dạng phương thức đáo rút, linh hoạt, tiện lợi.</p>
        </div>
      </div>
    </section>
  );
}

export default OfferSection;

