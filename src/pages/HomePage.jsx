function HomePage() {
	return (
		<>
			<section className="hero-banner">
				<img src="/assets/background.png" alt="Dịch vụ thanh toán" />
			</section>

			<section className="stats">
				<div className="container">
					<div className="section-header">
						<h2 style={{color: 'white'}}>Tại sao chọn chúng tôi?</h2>
						<div className="section-divider"></div>
					</div>
					<div className="stats-content">
						<div className="stat-item">
							<div className="stat-number">10,000+</div>
							<div className="stat-label">Khách hàng tin tưởng</div>
						</div>
						<div className="stat-item">
							<div className="stat-number">0.8%</div>
							<div className="stat-label">Phí thấp nhất thị trường</div>
						</div>
						<div className="stat-item">
							<div className="stat-number">24/7</div>
							<div className="stat-label">Phục vụ không ngừng nghỉ</div>
						</div>
						<div className="stat-item">
							<div className="stat-number">100%</div>
							<div className="stat-label">An toàn & Bảo mật</div>
						</div>
					</div>
				</div>
			</section>

			<section className="about" id="about">
				<div className="container">
					<div className="section-header">
						<h2>Về chúng tôi</h2>
						<div className="section-divider"></div>
					</div>
					<div className="about-grid">
						<div className="about-card">
							<h3>Giới thiệu</h3>
							<p>Chúng tôi là đơn vị chuyên nghiệp trong lĩnh vực rút tiền và đáo hạn thẻ tín dụng tại Hà Nội, đặt uy tín và bảo mật lên hàng đầu.</p>
						</div>
						<div className="about-card">
							<h3>Tại sao chọn chúng tôi</h3>
							<ul>
								<li>Phí cạnh tranh, minh bạch</li>
								<li>Phục vụ 24/7, tận nơi</li>
								<li>100% an toàn, bảo mật thông tin</li>
							</ul>
						</div>
						<div className="about-card">
							<h3>Tầm nhìn & Sứ mệnh</h3>
							<p>Tầm nhìn trở thành đơn vị dịch vụ thẻ uy tín nhất Hà Nội. Sứ mệnh mang lại trải nghiệm tài chính an toàn, nhanh chóng và tiết kiệm cho khách hàng.</p>
						</div>
					</div>
					<div style={{textAlign:'center', marginTop:'24px'}}>
						<a className="btn btn-secondary" href="/ve-chung-toi">Tìm hiểu thêm</a>
					</div>
				</div>
			</section>

			<section className="services" id="services">
				<div className="container">
					<div className="section-header">
						<h2>🏆 Dịch vụ hàng đầu Hà Nội</h2>
						<div className="section-divider"></div>
						<p style={{fontSize: '1.2rem', color: 'var(--text-light)', marginTop: '15px'}}>Uy tín - Chuyên nghiệp - Phí thấp nhất - Phục vụ tốt nhất</p>
					</div>
					<div className="services-content">
						<div className="service-card">
							<div className="service-icon">
								<i className="fas fa-credit-card"></i>
							</div>
							<h3>Rút tiền thẻ tín dụng</h3>
							<p>Nội dung chi tiết sẽ cập nhật sau.</p>
						</div>
						<div className="service-card">
							<div className="service-icon">
								<i className="fas fa-calendar-check"></i>
							</div>
							<h3>Đáo hạn thẻ tín dụng</h3>
							<p>Nội dung chi tiết sẽ cập nhật sau.</p>
						</div>
						<div className="service-card">
							<div className="service-icon">
								<i className="fas fa-headset"></i>
							</div>
							<h3>Hỗ trợ 24/7</h3>
							<p>Tư vấn nhanh, tận tâm, bảo mật.</p>
						</div>
					</div>
					<div className="service-description">
						<div className="testimonial">
							<p><strong>⭐⭐⭐⭐⭐ TOP ĐẦU HÀ NỘI:</strong> Dịch vụ Rút tiền, Đáo hạn thẻ tín dụng tất cả các loại. 💯 100% hạn mức - Phí thấp nhất - Tốc độ nhanh nhất - Uy tín #1 - Bảo mật tuyệt đối.</p>
							<p style={{marginTop: '15px', color: 'var(--primary-color)', fontWeight: 600}}>🏆 10+ năm kinh nghiệm | 10,000+ khách hàng hài lòng | Phục vụ tận nơi 24/7</p>
						</div>
						<div style={{textAlign: 'center', marginTop: '20px'}}>
							<a href="tel:0909378408" className="btn btn-secondary btn-lg">
								<i className="fas fa-phone-alt"></i> Gọi ngay: 0909 378 408 - Tư vấn miễn phí!
							</a>
							<a href="/dich-vu" className="btn" style={{marginLeft: '12px'}}>Xem chi tiết dịch vụ</a>
						</div>
					</div>
				</div>
			</section>

			<section className="benefits" id="benefits">
				<div className="container">
					<div className="section-header">
						<h2>Chúng tôi có những ưu điểm nào?</h2>
						<div className="section-divider"></div>
					</div>
					<div className="benefits-content">
						<div className="benefits-image">
							<img src="/assets/background.png" alt="Dịch vụ tài chính" />
						</div>
						<div className="benefits-list">
							<div className="benefit-item">
								<i className="fas fa-check"></i>
								<p>Phục vụ nhanh chóng, tận nơi, 24/7</p>
							</div>
							<div className="benefit-item">
								<i className="fas fa-check"></i>
								<p>Cam kết uy tín</p>
							</div>
							<div className="benefit-item">
								<i className="fas fa-check"></i>
								<p>Đảm bảo cho khách hàng có lịch sử tín dụng tốt, sẵn sàng hỗ trợ khách hàng giải trình giao dịch</p>
							</div>
							<div className="benefit-item">
								<i className="fas fa-check"></i>
								<p>Giúp khách hàng hưởng lợi từ các chương trình ưu đãi của ngân hàng</p>
							</div>
							<div className="benefit-item">
								<i className="fas fa-check"></i>
								<p>Đảm bảo không bị khoá thẻ khi rút tiền - đáo hạn</p>
							</div>
							<div className="benefit-highlight">
								<i className="fas fa-hand-point-right"></i>
								<p>Đến với chúng tôi, khách hàng được hưởng phí rẻ nhất - phục vụ nhanh chóng nhất - an toàn, uy tín nhất</p>
							</div>
							<a href="tel:0909378408" className="btn btn-primary">
								<i className="fas fa-phone-alt"></i> 0909 378 408
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="testimonials">
				<div className="container">
					<div className="section-header">
						<h2>💬 Lời dẫn từ khách hàng</h2>
						<div className="section-divider"></div>
						<p style={{fontSize: '1.1rem', color: 'var(--text-light)', marginTop: '15px'}}>Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi</p>
					</div>
					<div className="testimonials-content">
						<div className="testimonial-card">
							<div className="testimonial-text">
								"Tôi đã sử dụng dịch vụ của anh chị hơn 2 năm rồi. Phí rẻ, nhanh chóng và rất uy tín. Lần nào cần cũng được hỗ trợ nhanh chóng, không bao giờ làm tôi thất vọng."
							</div>
							<div className="testimonial-author">
								<div className="testimonial-avatar">A</div>
								<div className="author-info">
									<div className="author-name">Anh Minh</div>
									<div className="author-title">Doanh nhân - Cầu Giấy</div>
								</div>
							</div>
						</div>
						<div className="testimonial-card">
							<div className="testimonial-text">
								"Dịch vụ tốt nhất Hà Nội! Phí chỉ 0.8%, so với các nơi khác từ 1.2-1.5% thì rẻ hơn nhiều. Nhân viên chuyên nghiệp, tận tình, giải thích kỹ càng."
							</div>
							<div className="testimonial-author">
								<div className="testimonial-avatar">T</div>
								<div className="author-info">
									<div className="author-name">Chị Thu</div>
									<div className="author-title">Công chức - Đống Đa</div>
								</div>
							</div>
						</div>
						<div className="testimonial-card">
							<div className="testimonial-text">
								"Mấy năm nay chỉ tin tưởng dịch vụ này thôi. An toàn 100%, không bao giờ gặp rắc rối gì. Đặc biệt là phục vụ 24/7, lúc nào cần cũng có người trả lời."
							</div>
							<div className="testimonial-author">
								<div className="testimonial-avatar">H</div>
								<div className="author-info">
									<div className="author-name">Anh Hùng</div>
									<div className="author-title">Kỹ sư - Hà Đông</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="contact" id="contact">
				<div className="container">
					<div className="section-header">
						<h2>Liên hệ với chúng tôi</h2>
						<div className="section-divider"></div>
					</div>
					<div className="contact-content">
						<div className="contact-info">
							<div className="contact-phone">
								<a href="tel:0909378408" className="btn btn-primary btn-lg">
									<i className="fas fa-phone-alt"></i> 0909 378 408
								</a>
							</div>
							<div className="contact-locations">
								<h3>📍 Khu vực phục vụ toàn Hà Nội:</h3>
								<ul className="locations-list">
									<li><i className="fas fa-map-marker-alt"></i> <strong>Cầu Giấy:</strong> Tận nơi trong 10-15 phút</li>
									<li><i className="fas fa-map-marker-alt"></i> <strong>Đống Đa:</strong> Phục vụ tận nơi nhanh chóng</li>
									<li><i className="fas fa-map-marker-alt"></i> <strong>Hoàn Kiếm:</strong> Trung tâm thành phố</li>
									<li><i className="fas fa-map-marker-alt"></i> <strong>Ba Đình:</strong> Khu vực trung tâm chính trị</li>
									<li><i className="fas fa-map-marker-alt"></i> <strong>Hà Đông, Long Biên:</strong> Và tất cả các quận khác</li>
								</ul>
							</div>
						</div>
						<div className="contact-form">
							<h3>Yêu cầu tư vấn và gọi lại</h3>
							<form onSubmit={(e)=>e.preventDefault()}>
								<div className="form-group">
									<label htmlFor="name">Họ và tên</label>
									<input type="text" id="name" name="name" placeholder="Họ và tên" />
								</div>
								<div className="form-group">
									<label htmlFor="phone">Số điện thoại</label>
									<input type="tel" id="phone" name="phone" placeholder="Số điện thoại" required />
								</div>
								<button type="submit" className="btn btn-submit">
									<i className="fas fa-paper-plane"></i> Gửi Ngay
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default HomePage 