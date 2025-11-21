import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng là gì?",
      answer: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng là dịch vụ giúp khách hàng đáo hạn và rút tiền từ thẻ tín dụng một cách nhanh chóng và an toàn."
    },
    {
      question: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng có phí bao nhiêu?",
      answer: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng có phí chỉ từ 1,2% trên số tiền rút và đáo hạn."
    },
    {
      question: "Thời gian rút tiền hoặc đáo hạn mất bao lâu?",
      answer: "Quy trình xử lý cực nhanh, chỉ từ 1–3 phút là hoàn tất và tiền được chuyển ngay vào tài khoản của khách."
    },
    {
      question: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng có thời gian làm việc như thế nào?",
      answer: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng có thời gian làm việc từ 8:00 đến 20:00, từ thứ Hai đến Chủ nhật, kể cả ngày lễ và cuối tuần."
    },
    {
      question: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng có được hỗ trợ tận nơi không?",
      answer: "Dịch vụ đáo hạn và rút tiền thẻ tín dụng có được hỗ trợ tận nơi, khách hàng có thể đến các văn phòng của chúng tôi để đáo hạn và rút tiền thẻ tín dụng."
    },
    {
      question: "Rút tiền thẻ tín dụng có an toàn không?",
      answer: "Dịch vụ cam kết bảo mật tuyệt đối thông tin thẻ, không giữ thẻ, không yêu cầu mật khẩu, toàn bộ giao dịch thực hiện trực tiếp trước mặt khách."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.set(".faqs-title", { autoAlpha: 0, y: 50 });
    gsap.set(".faq-item", { autoAlpha: 0, y: 40 });
    
    gsap.to(".faqs-title", {
      scrollTrigger: {
        trigger: ".faqs-section",
        start: "top 85%",
        once: true
      },
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(".faq-item", {
      scrollTrigger: {
        trigger: ".faq-container",
        start: "top 85%",
        once: true
      },
      y: 0,
      autoAlpha: 1,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out"
    });
  }, []);

  return (
    <section className="faqs-section" id="faqs">
      <h2 className="faqs-title">
        FAQs
        <span className="star-small"></span>
      </h2>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;

