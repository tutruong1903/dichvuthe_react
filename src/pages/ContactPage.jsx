function ContactPage() {
	return (
		<>
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">Liên hệ</h2>
							<p className="hero-description">Liên hệ ngay để được tư vấn miễn phí 24/7.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="contact">
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

export default ContactPage 