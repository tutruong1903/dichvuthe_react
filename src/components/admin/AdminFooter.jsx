function AdminFooter() {
	return (
		<footer style={{
			background: '#34495e',
			color: '#ecf0f1',
			padding: '20px 0',
			marginTop: 'auto',
			fontSize: '14px'
		}}>
			<div className="container">
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '16px'
				}}>
					<div>
						<p style={{margin: 0, color: '#bdc3c7'}}>
							© 2024 Admin Panel - Dịch Vụ Thẻ
						</p>
					</div>
					
					<div style={{display: 'flex', gap: '24px', alignItems: 'center'}}>
						<span style={{color: '#bdc3c7'}}>
							Phiên bản 1.0.0
						</span>
						<span style={{color: '#bdc3c7'}}>
							Hệ thống quản lý tin tức
						</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default AdminFooter
