import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  useEffect(() => {
    gsap.set(".footer-col", { autoAlpha: 0, y: 50 });
    gsap.set(".footer-bottom", { autoAlpha: 0, y: 30 });
    
    gsap.to(".footer-col", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 0,
      autoAlpha: 1,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(".footer-bottom", {
      scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top 90%",
        toggleActions: "play none none none"
      },
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out"
    });
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col footer-col-brand">
          <div className="footer-logo">
            <img src="/assets/logo.png" alt="Mavic Logo" className="footer-logo-image" />
            <div className="footer-logo-text">
              <span className="footer-logo-title">Mavic</span>
              <span className="footer-logo-slogan">Vững Tài Chính - Trọn Niềm Tin</span>
            </div>
          </div>
          <p className="footer-desc">
            Giải pháp tài chính toàn diện, hỗ trợ làm thẻ tín dụng nhanh chóng, 
            uy tín và minh bạch.
          </p>
          <div className="footer-contact-info">
            <p><strong>Hotline:</strong> 0818 292 929</p>
            <p><strong>Email:</strong> contact@mavic.vn</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Giới thiệu</h4>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/ve-chung-toi">Về chúng tôi</a></li>
            <li><a href="/dich-vu">Dịch vụ</a></li>
            <li><a href="/tin-tuc">Tin tức</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Dịch vụ</h4>
          <ul>
            <li><a href="/dich-vu">Rút tiền thẻ tín dụng</a></li>
            <li><a href="/dich-vu">Đáo hạn thẻ tín dụng</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="/lien-he">Liên hệ</a></li>
            <li><a href="/tin-tuc">Hướng dẫn</a></li>
            <li><a href="/tin-tuc">Câu hỏi thường gặp</a></li>
            <li><a href="/lien-he">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Kết nối với chúng tôi</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://zalo.me" target="_blank" rel="noopener noreferrer">Zalo</a></li>
            <li><a href="tel:0818292929">Hotline</a></li>
            <li><a href="/tin-tuc">Blog</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Mavic Credit. Bản quyền thuộc về Mavic.</p>
        <p>Mọi thông tin khách hàng được bảo mật tuyệt đối.</p>
      </div>
    </footer>
  );
}

export default Footer; 