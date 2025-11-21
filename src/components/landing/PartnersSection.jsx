import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PartnersSection() {
  const bankLogos = [
    { name: 'Vietcombank', file: 'Vietcombank-01.png' },
    { name: 'BIDV', file: 'BIDV-01.png' },
    { name: 'VietinBank', file: 'Vietinbank-01.png' },
    { name: 'ACB', file: 'logo-ngan-hang-ACB-PNG.png' },
    { name: 'Techcombank', file: 'Techcombank-01.png' },
    { name: 'VPBank', file: 'VPbank-01.png' },
    { name: 'MBBank', file: 'logo-ngan-hang-MB-01.png' },
    { name: 'TPBank', file: 'TPbank-logo-01.png' },
    { name: 'Sacombank', file: 'logo-ngan-hang-Sacombank-01.png' },
    { name: 'HDBank', file: 'HDBank-01.png' },
    { name: 'MSB', file: 'MSB-bank-logo-01.png' },
    { name: 'SeABank', file: 'SeABank-logo-01.png' },
    { name: 'SHB', file: 'SHB-01.png' },
    { name: 'VIB', file: 'VIB-bank-logo-01.png' }
  ];

  useEffect(() => {
    gsap.set(".partners-title", { autoAlpha: 0, y: 50 });
    gsap.set(".partner-logo", { autoAlpha: 0, y: 60, scale: 0.7 });
    
    gsap.to(".partners-title", {
      scrollTrigger: {
        trigger: ".partners",
        start: "top 80%",
        once: true
      },
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(".partner-logo", {
      scrollTrigger: {
        trigger: ".partners-container",
        start: "top 85%",
        once: true
      },
      y: 0,
      autoAlpha: 1,
      scale: 1,
      stagger: 0.03,
      duration: 1.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <section className="partners">
      <h2 className="partners-title">
        Ngân hàng hỗ trợ
        <span className="star-small"></span>
      </h2>
      <div className="partners-container">
        <div className="partners-track">
          {/* First set of logos */}
          {bankLogos.map((bank, index) => (
            <div className="partner-logo" key={`first-${index}`}>
              <img src={`/assets/banks/${bank.file}`} alt={bank.name} />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {bankLogos.map((bank, index) => (
            <div className="partner-logo" key={`second-${index}`}>
              <img src={`/assets/banks/${bank.file}`} alt={bank.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;

