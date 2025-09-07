function ServicesPage() {
	return (
		<>
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">Dịch vụ</h2>
							<p className="hero-description">Rút tiền thẻ tín dụng và Đáo hạn thẻ tín dụng – nhanh, an toàn, phí tốt.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="services">
				<div className="container">
					<div className="section-header">
						<h2>Danh mục dịch vụ</h2>
						<div className="section-divider"></div>
					</div>
					<div className="services-content">
						<div className="service-card">
							<div className="service-icon"><i className="fas fa-credit-card"></i></div>
							<h3>Rút tiền thẻ tín dụng</h3>
							<p>Đang cập nhật nội dung chi tiết.</p>
						</div>
						<div className="service-card">
							<div className="service-icon"><i className="fas fa-calendar-check"></i></div>
							<h3>Đáo hạn thẻ tín dụng</h3>
							<p>Đang cập nhật nội dung chi tiết.</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default ServicesPage 