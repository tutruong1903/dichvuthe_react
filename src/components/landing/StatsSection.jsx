import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StatsSection() {
  useEffect(() => {
    gsap.set(".stat-item", { autoAlpha: 0, y: 50 });
    
    gsap.to(".stat-item", {
      scrollTrigger: {
        trigger: ".stats",
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
    <section className="stats">
      <div className="stat-item">
        <h2>1000+</h2>
        <p>Khách hàng tin tưởng</p>
      </div>
      <div className="stat-item">
        <h2>1,2%</h2>
        <p>Phí thấp nhất thị trường</p>
      </div>
      <div className="stat-item">
        <h2>24/7</h2>
        <p>Phục vụ không ngừng nghỉ</p>
      </div>
      <div className="stat-item">
        <h2>100%</h2>
        <p>An toàn & Bảo mật</p>
      </div>
    </section>
  );
}

export default StatsSection;

