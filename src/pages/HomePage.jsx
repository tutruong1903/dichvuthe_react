import { useEffect } from 'react';
import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import PartnersSection from '../components/landing/PartnersSection';
import OfferSection from '../components/landing/OfferSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';

function HomePage() {
  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <PartnersSection />
      <OfferSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}

export default HomePage;
