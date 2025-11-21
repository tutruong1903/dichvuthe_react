import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/pages/about.css';

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
	const contactBtnRef = useRef(null);

	const handleContactClick = () => {
		window.location.href = 'tel:0818292929';
	};

	useEffect(() => {
		// Animation for about sections
		gsap.set(".about-content", { autoAlpha: 0, x: -80 });
		gsap.set(".about-visual", { autoAlpha: 0, x: 80 });
		
		gsap.utils.toArray(".about-content").forEach((content) => {
			gsap.to(content, {
				scrollTrigger: {
					trigger: content,
					start: "top 75%",
					once: true
				},
				x: 0,
				autoAlpha: 1,
				duration: 1.2,
				ease: "power3.out"
			});
		});

		gsap.utils.toArray(".about-visual").forEach((visual) => {
			gsap.to(visual, {
				scrollTrigger: {
					trigger: visual,
					start: "top 75%",
					once: true
				},
				x: 0,
				autoAlpha: 1,
				duration: 1.2,
				delay: 0.3,
				ease: "power3.out"
			});
		});

		// Service gallery animation
		gsap.set(".service-gallery-item", { autoAlpha: 0, y: 50 });
		
		gsap.utils.toArray(".service-gallery-item").forEach((item, index) => {
			gsap.to(item, {
				scrollTrigger: {
					trigger: item,
					start: "top 85%",
					once: true
				},
				y: 0,
				autoAlpha: 1,
				duration: 0.8,
				delay: index * 0.15,
				ease: "power3.out"
			});
		});

		// Button magnetic effect
		const button = contactBtnRef.current;
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

			return () => {
				button.removeEventListener("mousemove", handleMouseMove);
				button.removeEventListener("mouseleave", handleMouseLeave);
			};
		}
	}, []);

	return (
		<>
			{/* Hero Section */}
			<section className="design-section about-hero-section">
				<div className="about-content">
					<h2 className="design-title">
						Về Mavic
						<span className="star-small"></span>
					</h2>
					<p className="design-description">
						Chúng tôi là đơn vị tiên phong trong lĩnh vực cung cấp dịch vụ rút tiền và đáo hạn thẻ tín dụng tại Hà Nội, 
						với hơn 10 năm kinh nghiệm phục vụ hơn 10.000 khách hàng cá nhân và doanh nghiệp. 
						Mavic cam kết mang đến giải pháp tài chính nhanh chóng, an toàn và minh bạch nhất.
					</p>
					<div className="about-highlights">
						<div className="highlight-box">
							<div className="highlight-number">10+</div>
							<div className="highlight-label">Năm kinh nghiệm</div>
						</div>
						<div className="highlight-box">
							<div className="highlight-number">1K+</div>
							<div className="highlight-label">Khách hàng tin tưởng</div>
						</div>
						<div className="highlight-box">
							<div className="highlight-number">1.2%</div>
							<div className="highlight-label">Phí cạnh tranh nhất</div>
						</div>
						<div className="highlight-box">
							<div className="highlight-number">24/7</div>
							<div className="highlight-label">Hỗ trợ không ngừng</div>
						</div>
					</div>
				</div>
				<div className="about-visual">
					<div className="about-image-wrapper">
						<img src="/assets/1.jpg" alt="Mavic - Dịch vụ thẻ tín dụng" />
						<div className="image-decoration"></div>
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="design-section about-detail-section reverse">
				<div className="about-content">
					<h2 className="design-title">
						Vì sao chọn chúng tôi?
						<span className="star-small"></span>
					</h2>
					<p className="design-description">
						Mavic không chỉ cung cấp dịch vụ với mức phí thấp nhất thị trường, mà còn đặt sự an toàn 
						và trải nghiệm khách hàng lên hàng đầu. Chúng tôi hiểu rằng thẻ tín dụng là tài sản quan trọng 
						và lịch sử tín dụng ảnh hưởng trực tiếp đến tương lai tài chính của bạn.
					</p>
					<div className="service-features">
						<div className="feature-item">
							<i className="fas fa-shield-check"></i>
							<span>An toàn tuyệt đối - Cam kết không làm ảnh hưởng đến thẻ và tài khoản</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-hand-holding-usd"></i>
							<span>Phí dịch vụ chỉ 0.8% - Thấp nhất tại Hà Nội, tiết kiệm hàng triệu mỗi năm</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-clock"></i>
							<span>Xử lý nhanh 5-15 phút - Hỗ trợ tận nơi 24/7 kể cả lễ Tết</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-user-shield"></i>
							<span>Bảo mật thông tin 100% - Quy trình chuẩn mực, minh bạch</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-headset"></i>
							<span>Hỗ trợ khách hàng tận tâm - Sẵn sàng giải trình với ngân hàng khi cần</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-chart-line"></i>
							<span>Bảo vệ điểm tín dụng - Đồng hành giữ gìn lịch sử tín dụng tốt</span>
						</div>
					</div>
					<button className="create-card-btn" ref={contactBtnRef} onClick={handleContactClick}>
						<i className="fas fa-phone-alt"></i> 0818.29.29.29 - Liên hệ ngay
					</button>
				</div>
				<div className="about-visual">
					<div className="about-stats-wrapper">
						<div className="stat-card">
							<i className="fas fa-rocket"></i>
							<h3>Nhanh chóng</h3>
							<p>Giao dịch hoàn tất chỉ trong 5-15 phút, hỗ trợ tận nơi mọi lúc mọi nơi</p>
						</div>
						<div className="stat-card">
							<i className="fas fa-lock"></i>
							<h3>An toàn</h3>
							<p>Quy trình chuẩn mực, đảm bảo an toàn tuyệt đối cho thẻ và tài khoản</p>
						</div>
						<div className="stat-card">
							<i className="fas fa-tag"></i>
							<h3>Tiết kiệm</h3>
							<p>Phí dịch vụ 0.8% - Thấp nhất thị trường, giúp bạn tiết kiệm tối đa</p>
						</div>
						<div className="stat-card">
							<i className="fas fa-heart"></i>
							<h3>Uy tín</h3>
							<p>10 năm kinh nghiệm, 10.000+ khách hàng tin tưởng và đánh giá cao</p>
						</div>
					</div>
				</div>
			</section>

			{/* Vision & Mission Section */}
			<section className="design-section about-detail-section">
				<div className="about-content">
					<h2 className="design-title">
						Tầm nhìn & Sứ mệnh
						<span className="star-small"></span>
					</h2>
					<p className="design-description">
						<strong>Tầm nhìn:</strong> Trở thành dịch vụ rút tiền và đáo hạn thẻ tín dụng số 1 tại Hà Nội, 
						là sự lựa chọn đầu tiên khi khách hàng nghĩ đến giải pháp tài chính nhanh chóng và minh bạch.
					</p>
					<p className="design-description">
						<strong>Sứ mệnh:</strong> Mang đến sự an tâm tuyệt đối cho mọi khách hàng thông qua dịch vụ 
						minh bạch về chi phí, nhanh chóng trong xử lý, linh hoạt trong hỗ trợ và cam kết đồng hành 
						trong dài hạn. Chúng tôi tin rằng uy tín và minh bạch là nền tảng tạo nên thương hiệu bền vững.
					</p>
					<div className="mission-points">
						<div className="mission-item">
							<i className="fas fa-check-circle"></i>
							<span>Mở rộng quy mô phục vụ toàn quốc</span>
						</div>
						<div className="mission-item">
							<i className="fas fa-check-circle"></i>
							<span>Nâng cấp công nghệ nâng cao trải nghiệm</span>
						</div>
						<div className="mission-item">
							<i className="fas fa-check-circle"></i>
							<span>Duy trì cam kết chất lượng và minh bạch</span>
						</div>
						<div className="mission-item">
							<i className="fas fa-check-circle"></i>
							<span>Đồng hành cùng khách hàng trong dài hạn</span>
						</div>
					</div>
				</div>
				<div className="about-visual">
					<div className="about-image-wrapper">
						<img src="/assets/2.jpeg" alt="Tầm nhìn Mavic" />
						<div className="image-decoration"></div>
					</div>
				</div>
			</section>

			{/* Service Gallery Section */}
			<section className="card-gallery-section">
				<div className="section-header">
					<h2 className="design-title">Một số hình ảnh về dịch vụ</h2>
					<p className="design-description">
						Hình ảnh thực tế về dịch vụ rút tiền và đáo hạn thẻ tín dụng của Mavic
					</p>
				</div>
				<div className="service-gallery-grid">
					<div className="service-gallery-item">
						<img src="/assets/mavic/IMG_0672.png" alt="Dịch vụ Mavic 1" />
					</div>
					<div className="service-gallery-item">
						<img src="/assets/mavic/IMG_0673.png" alt="Dịch vụ Mavic 2" />
					</div>
					<div className="service-gallery-item">
						<img src="/assets/mavic/IMG_0674.png" alt="Dịch vụ Mavic 3" />
					</div>
					<div className="service-gallery-item">
						<img src="/assets/mavic/IMG_0675.png" alt="Dịch vụ Mavic 4" />
					</div>
					<div className="service-gallery-item">
						<img src="/assets/mavic/IMG_0676.png" alt="Dịch vụ Mavic 5" />
					</div>
					<div className="service-gallery-item">
						<img src="/assets/mavic/IMG_0677.png" alt="Dịch vụ Mavic 6" />
					</div>
				</div>
			</section>
		</>
	)
}

export default AboutPage 