function NewsPage() {
	return (
		<>
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">Tin tức</h2>
							<p className="hero-description">Cập nhật thông tin hữu ích về thẻ tín dụng và ưu đãi ngân hàng.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="news">
				<div className="container">
					<div className="section-header">
						<h2>Bài viết mới</h2>
						<div className="section-divider"></div>
						<p style={{color: 'var(--text-light)'}}>Đang cập nhật...</p>
					</div>
				</div>
			</section>
		</>
	)
}

export default NewsPage 