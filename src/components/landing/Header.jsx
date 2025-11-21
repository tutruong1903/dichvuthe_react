import { useEffect } from 'react';
import gsap from 'gsap';

function Header() {
  useEffect(() => {
    gsap.set("header", { y: -40, opacity: 0 });
    
    gsap.to("header", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  const handleContactClick = () => {
    window.location.href = 'tel:0818292929';
  };

  return (
    <header>
      <div className="logo">
        <img src="/assets/logo.png" alt="Mavic Logo" className="logo-image" />
        <div className="logo-text">
          <span className="logo-title">Mavic</span>
          <span className="logo-slogan">Vững Tài Chính - Trọn Niềm Tin</span>
        </div>
      </div>
      <nav>
		<a href="/">Trang chủ</a>
        <a href="/ve-chung-toi">Về chúng tôi</a>
        <a href="/dich-vu">Dịch vụ</a>
        {/* <a href="/tin-tuc">Tin tức</a> */}
        <a href="/lien-he">Liên hệ</a>
      </nav>
      <button className="contact-btn" onClick={handleContactClick}>Liên hệ ngay</button>
    </header>
  );
}

export default Header; 