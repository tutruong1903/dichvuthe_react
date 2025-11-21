import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function HeroSection() {
  const heroTextRef = useRef(null);
  const heroH1Ref = useRef(null);
  const heroPRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const cardContainerRef = useRef(null);
  const creditCardRef = useRef(null);

  const handleContactClick = () => {
    window.location.href = 'tel:0818292929';
  };

  useEffect(() => {
    // Set initial state
    gsap.set(heroH1Ref.current, { autoAlpha: 0, x: -60 });
    gsap.set(heroPRef.current, { autoAlpha: 0, x: -40 });
    gsap.set(ctaBtnRef.current, { autoAlpha: 0, scale: 0.6 });
    gsap.set(cardContainerRef.current, { autoAlpha: 0, x: 80 });
    
    // Page load animations
    gsap.to(heroH1Ref.current, {
      x: 0,
      autoAlpha: 1,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });

    gsap.to(heroPRef.current, {
      x: 0,
      autoAlpha: 1,
      duration: 1,
      delay: 0.6,
      ease: "power3.out"
    });

    gsap.to(ctaBtnRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.8,
      delay: 0.9,
      ease: "back.out(1.7)"
    });

    gsap.to(cardContainerRef.current, {
      x: 0,
      autoAlpha: 1,
      duration: 1.2,
      delay: 0.8,
      ease: "power3.out"
    });

    // Floating stars animation
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
      gsap.to(star, {
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-20, 20),
        duration: () => gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Credit card parallax tilt effect
    const card = creditCardRef.current;
    const cardContainer = cardContainerRef.current;

    if (card && cardContainer) {
      const handleMouseEnter = () => {
        card.style.animationPlayState = "paused";
      };

      const handleMouseMove = (e) => {
        const rect = cardContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 35;
        const y = (e.clientY - rect.top - rect.height / 2) / 35;
        
        card.style.transform = `rotate(-8deg) rotateY(${x}deg) rotateX(${-y}deg) translateZ(20px)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = `rotate(-8deg)`;
        card.style.animationPlayState = "running";
      };

      cardContainer.addEventListener("mouseenter", handleMouseEnter);
      cardContainer.addEventListener("mousemove", handleMouseMove);
      cardContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cardContainer.removeEventListener("mouseenter", handleMouseEnter);
        cardContainer.removeEventListener("mousemove", handleMouseMove);
        cardContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Magnetic hover effect for button
  useEffect(() => {
    const button = ctaBtnRef.current;
    
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

    // Button glow pulse
    gsap.to(button, {
      boxShadow: "0 6px 30px rgba(93, 211, 208, 0.6)",
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut"
    });

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-text" ref={heroTextRef}>
        <h1 ref={heroH1Ref}>Dịch vụ rút tiền<br /> thẻ tín dụng<br />hàng đầu Hà Nội</h1>
        <p ref={heroPRef}>
          Chúng tôi cung cấp dịch vụ rút tiền thẻ tín dụng tất cả các loại. Phí thấp nhất, tốc độ nhanh nhất, uy tín nhất.
        </p>
        <button className="cta-btn" ref={ctaBtnRef} onClick={handleContactClick}>Liên hệ ngay</button>
      </div>

      <div className="card-container" ref={cardContainerRef}>
        <div className="credit-card" ref={creditCardRef}>
          <span className="nfc">)))</span>
          <div className="card-number">1662 &nbsp; 0911 &nbsp; 2019 &nbsp; 2021</div>
          
          <div className="card-info">
            <div>
              <label>Name</label>
              <p>—</p>
            </div>
            <div>
              <label>Exp.</label>
              <p>—</p>
            </div>
          </div>

          <div className="card-chip"></div>
        </div>
      </div>

      <div className="floating-stars">
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
      </div>
    </section>
  );
}

export default HeroSection;

