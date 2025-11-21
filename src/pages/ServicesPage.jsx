import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/pages/services.css';

gsap.registerPlugin(ScrollTrigger);

function ServicesPage() {
	const withdrawCardBtnRef = useRef(null);
	const renewalCardBtnRef = useRef(null);
	const cardStackRef1 = useRef(null);
	const cardStackRef2 = useRef(null);

	const handleContactClick = () => {
		window.location.href = 'tel:0818292929';
	};

	useEffect(() => {
		// Animation for service sections
		gsap.set(".service-detail-content", { autoAlpha: 0, x: -80 });
		gsap.set(".service-card-stack", { autoAlpha: 0, x: 80 });
		
		gsap.utils.toArray(".service-detail-content").forEach((content, i) => {
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

		gsap.utils.toArray(".service-card-stack").forEach((stack, i) => {
			gsap.to(stack, {
				scrollTrigger: {
					trigger: stack,
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

		// Button magnetic effects
		const buttons = [withdrawCardBtnRef.current, renewalCardBtnRef.current];
		const cleanupFunctions = [];

		buttons.forEach(button => {
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
					boxShadow: "0 8px 30px rgba(0, 75, 135, 0.4)",
					repeat: -1,
					yoyo: true,
					duration: 1.5,
					ease: "sine.inOut"
				});

				cleanupFunctions.push(() => {
					button.removeEventListener("mousemove", handleMouseMove);
					button.removeEventListener("mouseleave", handleMouseLeave);
				});
			}
		});

		return () => {
			cleanupFunctions.forEach(cleanup => cleanup());
		};
	}, []);

	useEffect(() => {
		const cardStacks = [cardStackRef1.current, cardStackRef2.current];

		const cleanupFunctions = cardStacks.map(cardStack => {
			if (!cardStack) return null;

			const handleMouseMove = (e) => {
				const rect = cardStack.getBoundingClientRect();
				const x = (e.clientX - rect.left - rect.width / 2) / 30;
				const y = (e.clientY - rect.top - rect.height / 2) / 30;
				
				const cards = cardStack.querySelectorAll(".stack-card");
				
				cards.forEach((card, index) => {
					const rotation = index === 0 ? 8 : index === 1 ? 4 : 0;
					const xOffset = index === 0 ? 0 : index === 1 ? -10 : -20;
					const yOffset = index === 0 ? 0 : index === 1 ? 15 : 30;

					gsap.to(card, {
						rotation: rotation + x * (1 - index * 0.3),
						x: xOffset + x * (2 - index),
						y: yOffset + y * (2 - index * 0.5),
						duration: 0.5,
						ease: "power2.out"
					});
				});
			};
			
			const handleMouseLeave = () => {
				const cards = cardStack.querySelectorAll(".stack-card");
				
				cards.forEach((card, index) => {
					gsap.to(card, {
						rotation: index === 0 ? 8 : index === 1 ? 4 : 0,
						x: index === 0 ? 0 : index === 1 ? -10 : -20,
						y: index === 0 ? 0 : index === 1 ? 15 : 30,
						duration: 0.6,
						ease: "power2.out"
					});
				});
			};

			cardStack.addEventListener("mousemove", handleMouseMove);
			cardStack.addEventListener("mouseleave", handleMouseLeave);

			return () => {
				cardStack.removeEventListener("mousemove", handleMouseMove);
				cardStack.removeEventListener("mouseleave", handleMouseLeave);
			};
		});

		return () => {
			cleanupFunctions.forEach(cleanup => cleanup && cleanup());
		};
	}, []);

	return (
		<>

			{/* Rút tiền thẻ tín dụng Service */}
			<section className="design-section service-detail-section">
				<div className="service-detail-content">
					<h2 className="design-title">
						Rút tiền thẻ tín dụng nhanh chóng
						<span className="star-small"></span>
					</h2>
					<p className="design-description">
						Dịch vụ rút tiền thẻ tín dụng giúp bạn có thể chuyển đổi hạn mức thẻ thành tiền mặt một cách nhanh chóng và an toàn. Không cần đến ngân hàng, không cần chờ đợi lâu, chỉ cần liên hệ với chúng tôi, bạn sẽ nhận được tiền mặt ngay trong vòng 5-10 phút.
					</p>
					<div className="service-features">
						<div className="feature-item">
							<i className="fas fa-bolt"></i>
							<span>Xử lý nhanh chóng trong 5-10 phút</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-shield-alt"></i>
							<span>An toàn, bảo mật thông tin 100%</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-percent"></i>
							<span>Phí dịch vụ cạnh tranh, minh bạch</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-clock"></i>
							<span>Hỗ trợ 24/7 kể cả ngày lễ, Tết</span>
						</div>
					</div>
					<button className="create-card-btn" ref={withdrawCardBtnRef} onClick={handleContactClick}>
						Liên hệ ngay
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</button>	
					<span className="star-small star-bottom"></span>
				</div>
				<div className="service-card-stack" ref={cardStackRef1}>
					<div className="stack-card card-1">
						<div className="card-logo-top">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<circle cx="12" cy="8" r="3"/>
								<circle cx="12" cy="16" r="3"/>
							</svg>
						</div>
						<div className="card-nfc-top">)))</div>
						<div className="card-label">Credit Card No.</div>
						<div className="card-number-stack">**** **** **** 2021</div>
						<div className="card-info-stack">
							<div>
								<label>Hạn mức</label>
								<p>50.000.000đ</p>
							</div>
							<div>
								<label>Exp.</label>
								<p>12/28</p>
							</div>
						</div>
						<div className="card-grid-icon">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<rect x="3" y="3" width="6" height="6"/>
								<rect x="13" y="3" width="6" height="6"/>
								<rect x="3" y="13" width="6" height="6"/>
								<rect x="13" y="13" width="6" height="6"/>
							</svg>
						</div>
					</div>
					<div className="stack-card card-2">
						<div className="card-label">Hạn mức</div>
						<p className="card-name-stack">50.000.000đ</p>
						<div className="card-label">Rút được</div>
						<p className="card-exp-stack">48.000.000đ</p>
						<div className="card-grid-icon">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<rect x="3" y="3" width="6" height="6"/>
								<rect x="13" y="3" width="6" height="6"/>
								<rect x="3" y="13" width="6" height="6"/>
								<rect x="13" y="13" width="6" height="6"/>
							</svg>
						</div>
					</div>
					<div className="stack-card card-3">
						<div className="card-number-stack">**** **** **** 2021</div>
						<div className="card-label">Phí dịch vụ</div>
						<p className="card-name-stack">Chỉ từ 1.8%</p>
						<div className="card-label">Thời gian</div>
						<p className="card-exp-stack">15-30 phút</p>
						<div className="card-grid-icon">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<rect x="3" y="3" width="6" height="6"/>
								<rect x="13" y="3" width="6" height="6"/>
								<rect x="3" y="13" width="6" height="6"/>
								<rect x="13" y="13" width="6" height="6"/>
							</svg>
						</div>
					</div>
				</div>
			</section>

			{/* Đáo hạn thẻ tín dụng Service */}
			<section className="design-section service-detail-section reverse">
				<div className="service-detail-content">
					<h2 className="design-title">
						Đáo hạn thẻ tín dụng linh hoạt
						<span className="star-small"></span>
					</h2>
					<p className="design-description">
						Dịch vụ đáo hạn thẻ tín dụng giúp bạn thanh toán khoản nợ thẻ đến hạn một cách dễ dàng, tránh bị tính phí phạt và ảnh hưởng đến lịch sử tín dụng. Chúng tôi sẽ thanh toán số tiền nợ thẻ giúp bạn, bạn chỉ cần hoàn trả sau với lãi suất ưu đãi.
					</p>
					<div className="service-features">
						<div className="feature-item">
							<i className="fas fa-calendar-check"></i>
							<span>Đáo hạn đúng thời điểm, không lo trễ hạn</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-hand-holding-usd"></i>
							<span>Lãi suất ưu đãi, thấp hơn phí phạt ngân hàng</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-chart-line"></i>
							<span>Bảo vệ điểm tín dụng của bạn</span>
						</div>
						<div className="feature-item">
							<i className="fas fa-sync-alt"></i>
							<span>Quy trình đơn giản, thanh toán tự động</span>
						</div>
					</div>
					<button className="create-card-btn" ref={renewalCardBtnRef} onClick={handleContactClick}>
						Liên hệ ngay
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</button>
					<span className="star-small star-bottom"></span>
				</div>
				<div className="service-card-stack" ref={cardStackRef2}>
					<div className="stack-card card-1">
						<div className="card-logo-top">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<circle cx="12" cy="8" r="3"/>
								<circle cx="12" cy="16" r="3"/>
							</svg>
						</div>
						<div className="card-nfc-top">)))</div>
						<div className="card-label">Credit Card No.</div>
						<div className="card-number-stack">**** **** **** 3025</div>
						<div className="card-info-stack">
							<div>
								<label>Số nợ</label>
								<p>30.000.000đ</p>
							</div>
							<div>
								<label>Đến hạn</label>
								<p>25/12</p>
							</div>
						</div>
						<div className="card-grid-icon">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<rect x="3" y="3" width="6" height="6"/>
								<rect x="13" y="3" width="6" height="6"/>
								<rect x="3" y="13" width="6" height="6"/>
								<rect x="13" y="13" width="6" height="6"/>
							</svg>
						</div>
					</div>
					<div className="stack-card card-2">
						<div className="card-label">Số nợ cần đáo</div>
						<p className="card-name-stack">30.000.000đ</p>
						<div className="card-label">Lãi suất/tháng</div>
						<p className="card-exp-stack">1.5% - 2%</p>
						<div className="card-grid-icon">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<rect x="3" y="3" width="6" height="6"/>
								<rect x="13" y="3" width="6" height="6"/>
								<rect x="3" y="13" width="6" height="6"/>
								<rect x="13" y="13" width="6" height="6"/>
							</svg>
						</div>
					</div>
					<div className="stack-card card-3">
						<div className="card-number-stack">**** **** **** 3025</div>
						<div className="card-label">Thời hạn đáo</div>
						<p className="card-name-stack">1-6 tháng</p>
						<div className="card-label">Xử lý</div>
						<p className="card-exp-stack">Trong ngày</p>
						<div className="card-grid-icon">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<rect x="3" y="3" width="6" height="6"/>
								<rect x="13" y="3" width="6" height="6"/>
								<rect x="3" y="13" width="6" height="6"/>
								<rect x="13" y="13" width="6" height="6"/>
							</svg>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default ServicesPage 