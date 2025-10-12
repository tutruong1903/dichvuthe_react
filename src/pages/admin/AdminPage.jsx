import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { authService, dashboardService } from '../../services'
import { HiNewspaper, HiPhone, HiEye, HiClock, HiCheckCircle } from 'react-icons/hi'

function AdminPage({ darkMode = false }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [stats, setStats] = useState({
		totalConsultations: 0,
		newRequests: 0,
		calledAdvise: 0,
		calledRefuse: 0,
		totalNews: 0,
		publishedNews: 0
	})
	const [recentConsultations, setRecentConsultations] = useState([])
	const [recentNews, setRecentNews] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await authService.getMe()
				setUser(response.data || response.user)
				await fetchStats()
			} catch (error) {
				authService.logout()
				navigate('/auth/login')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [navigate])

	const fetchStats = async () => {
		try {
			const response = await dashboardService.getStats()
			setStats(response.data.stats)
			setRecentConsultations(response.data.recentConsultations || [])
			setRecentNews(response.data.recentNews || [])
		} catch (error) {
			console.error('Error fetching stats:', error)
		}
	}

	const STATUS_OPTIONS = {
		REQUEST: 'Yêu cầu mới',
		CALLED_ADVISE: 'Đã gọi - Hợp tác',
		CALLED_REFUSE: 'Đã gọi - Từ chối'
	}

	const getStatusColor = (status) => {
		switch(status) {
			case 'REQUEST': return '#ffa500'
			case 'CALLED_ADVISE': return '#28a745'
			case 'CALLED_REFUSE': return '#dc3545'
			default: return '#6c757d'
		}
	}

	if (loading) {
		return (
			<AdminLayout>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '400px'
				}}>
					<div style={{
						textAlign: 'center',
						padding: '40px',
						background: darkMode ? '#1a1a1a' : '#fff',
						borderRadius: '12px',
						boxShadow: darkMode ? '0 4px 14px rgba(0,0,0,0.3)' : '0 4px 14px rgba(0,0,0,0.06)'
					}}>
						<div style={{
							width: '40px',
							height: '40px',
							border: `4px solid ${darkMode ? '#333' : '#f3f3f3'}`,
							borderTop: '4px solid #667eea',
							borderRadius: '50%',
							animation: 'spin 1s linear infinite',
							margin: '0 auto 20px'
						}}></div>
						<p style={{margin: 0, color: darkMode ? '#ccc' : '#666'}}>Đang tải...</p>
					</div>
				</div>
			</AdminLayout>
		)
	}

	return (
		<AdminLayout>
			<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
				{/* Welcome Section */}
				<div style={{
					marginBottom: '32px',
					padding: '24px',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					borderRadius: '16px',
					color: '#fff',
					textAlign: 'center'
				}}>
					<h1 style={{
						margin: '0 0 8px',
						fontSize: '28px',
						fontWeight: 'bold'
					}}>
						Chào mừng trở lại, {user?.username}!
					</h1>
					<p style={{
						margin: 0,
						fontSize: '16px',
						opacity: 0.9
					}}>
						Quản lý và theo dõi hoạt động của website
					</p>
				</div>

				{/* Stats Cards */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: '20px',
					marginBottom: '32px'
				}}>
					{/* Total Consultations */}
					<Link to="/admin/consultation" style={{ textDecoration: 'none' }}>
						<div style={{
							background: darkMode ? '#1a1a1a' : '#fff',
							borderRadius: '16px',
							padding: '24px',
							boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
							border: darkMode ? '1px solid #333' : 'none',
							transition: 'transform 0.2s, box-shadow 0.2s',
							cursor: 'pointer',
							height: '100%'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'translateY(-4px)'
							e.currentTarget.style.boxShadow = darkMode 
								? '0 8px 30px rgba(0,0,0,0.4)' 
								: '0 8px 30px rgba(0,0,0,0.12)'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'translateY(0)'
							e.currentTarget.style.boxShadow = darkMode 
								? '0 4px 20px rgba(0,0,0,0.3)' 
								: '0 4px 20px rgba(0,0,0,0.08)'
						}}>
							<div style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '16px'
							}}>
								<div style={{
									width: '60px',
									height: '60px',
									borderRadius: '12px',
									background: '#e3f2fd',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}>
									<HiPhone style={{ color: '#2196f3', fontSize: '28px' }} />
								</div>
								<div style={{ textAlign: 'center' }}>
									<div style={{
										fontSize: '32px',
										fontWeight: 'bold',
										color: darkMode ? '#fff' : '#333',
										lineHeight: 1,
										marginBottom: '8px'
									}}>
										{stats.totalConsultations}
									</div>
									<div style={{
										fontSize: '14px',
										color: darkMode ? '#999' : '#666'
									}}>
										Tổng yêu cầu
									</div>
								</div>
							</div>
						</div>
					</Link>

					{/* New Requests */}
					<div style={{
						background: darkMode ? '#1a1a1a' : '#fff',
						borderRadius: '16px',
						padding: '24px',
						boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
						border: darkMode ? '1px solid #333' : 'none',
						height: '100%'
					}}>
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '16px'
						}}>
							<div style={{
								width: '60px',
								height: '60px',
								borderRadius: '12px',
								background: '#fff3e0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<HiClock style={{ color: '#ff9800', fontSize: '28px' }} />
							</div>
							<div style={{ textAlign: 'center' }}>
								<div style={{
									fontSize: '32px',
									fontWeight: 'bold',
									color: darkMode ? '#fff' : '#333',
									lineHeight: 1,
									marginBottom: '8px'
								}}>
									{stats.newRequests}
								</div>
								<div style={{
									fontSize: '14px',
									color: darkMode ? '#999' : '#666'
								}}>
									Yêu cầu mới
								</div>
							</div>
						</div>
					</div>

					{/* Called Advise */}
					<div style={{
						background: darkMode ? '#1a1a1a' : '#fff',
						borderRadius: '16px',
						padding: '24px',
						boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
						border: darkMode ? '1px solid #333' : 'none',
						height: '100%'
					}}>
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '16px'
						}}>
							<div style={{
								width: '60px',
								height: '60px',
								borderRadius: '12px',
								background: '#e8f5e9',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<HiCheckCircle style={{ color: '#4caf50', fontSize: '28px' }} />
							</div>
							<div style={{ textAlign: 'center' }}>
								<div style={{
									fontSize: '32px',
									fontWeight: 'bold',
									color: darkMode ? '#fff' : '#333',
									lineHeight: 1,
									marginBottom: '8px'
								}}>
									{stats.calledAdvise}
								</div>
								<div style={{
									fontSize: '14px',
									color: darkMode ? '#999' : '#666'
								}}>
									Đã hợp tác
								</div>
							</div>
						</div>
					</div>

					{/* Total News */}
					<Link to="/admin/news" style={{ textDecoration: 'none' }}>
						<div style={{
							background: darkMode ? '#1a1a1a' : '#fff',
							borderRadius: '16px',
							padding: '24px',
							boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
							border: darkMode ? '1px solid #333' : 'none',
							transition: 'transform 0.2s, box-shadow 0.2s',
							cursor: 'pointer',
							height: '100%'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'translateY(-4px)'
							e.currentTarget.style.boxShadow = darkMode 
								? '0 8px 30px rgba(0,0,0,0.4)' 
								: '0 8px 30px rgba(0,0,0,0.12)'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'translateY(0)'
							e.currentTarget.style.boxShadow = darkMode 
								? '0 4px 20px rgba(0,0,0,0.3)' 
								: '0 4px 20px rgba(0,0,0,0.08)'
						}}>
							<div style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '16px'
							}}>
								<div style={{
									width: '60px',
									height: '60px',
									borderRadius: '12px',
									background: '#f3e5f5',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}>
									<HiNewspaper style={{ color: '#9c27b0', fontSize: '28px' }} />
								</div>
								<div style={{ textAlign: 'center' }}>
									<div style={{
										fontSize: '32px',
										fontWeight: 'bold',
										color: darkMode ? '#fff' : '#333',
										lineHeight: 1,
										marginBottom: '8px'
									}}>
										{stats.totalNews}
									</div>
									<div style={{
										fontSize: '14px',
										color: darkMode ? '#999' : '#666'
									}}>
										Tổng bài viết
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>

				{/* Two Columns: Recent Consultations and Recent News */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '24px'
				}}>
					{/* Recent Consultations */}
					<div style={{
						background: darkMode ? '#1a1a1a' : '#fff',
						borderRadius: '16px',
						padding: '24px',
						boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
						border: darkMode ? '1px solid #333' : 'none'
					}}>
						<div style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '20px'
						}}>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px'
							}}>
								<HiPhone style={{ fontSize: '20px', color: '#667eea' }} />
								<h3 style={{
									margin: 0,
									fontSize: '18px',
									fontWeight: 'bold',
									color: darkMode ? '#fff' : '#333'
								}}>
									Yêu cầu tư vấn gần đây
								</h3>
							</div>
							<Link 
								to="/admin/consultation"
								style={{
									color: '#667eea',
									textDecoration: 'none',
									fontSize: '14px',
									fontWeight: '500'
								}}
							>
								Xem tất cả →
							</Link>
						</div>

						{recentConsultations.length > 0 ? (
							<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
								{recentConsultations.map((item) => (
									<div
										key={item._id}
										style={{
											padding: '16px',
											background: darkMode ? '#0f0f0f' : '#f8f9fa',
											borderRadius: '12px',
											border: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
											transition: 'all 0.2s'
										}}
										onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#222' : '#f0f0f0'}
										onMouseLeave={(e) => e.currentTarget.style.background = darkMode ? '#0f0f0f' : '#f8f9fa'}
									>
										<div style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'flex-start',
											marginBottom: '8px'
										}}>
											<div>
												<div style={{
													fontWeight: '600',
													fontSize: '15px',
													color: darkMode ? '#fff' : '#333',
													marginBottom: '4px'
												}}>
													{item.fullName}
												</div>
												<div style={{
													fontSize: '14px',
													color: darkMode ? '#999' : '#666'
												}}>
													{item.phoneNumber}
												</div>
											</div>
											<span style={{
												padding: '4px 12px',
												borderRadius: '12px',
												background: `${getStatusColor(item.status)}20`,
												color: getStatusColor(item.status),
												fontSize: '12px',
												fontWeight: '600',
												whiteSpace: 'nowrap'
											}}>
												{STATUS_OPTIONS[item.status]}
											</span>
										</div>
										<div style={{
											fontSize: '13px',
											color: darkMode ? '#777' : '#999'
										}}>
											{new Date(item.createdAt).toLocaleString('vi-VN')}
										</div>
									</div>
								))}
							</div>
						) : (
							<div style={{
								textAlign: 'center',
								padding: '40px 20px',
								color: darkMode ? '#666' : '#999'
							}}>
								Chưa có yêu cầu tư vấn nào
							</div>
						)}
					</div>

					{/* Recent News */}
					<div style={{
						background: darkMode ? '#1a1a1a' : '#fff',
						borderRadius: '16px',
						padding: '24px',
						boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
						border: darkMode ? '1px solid #333' : 'none'
					}}>
						<div style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '20px'
						}}>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px'
							}}>
								<HiNewspaper style={{ fontSize: '20px', color: '#667eea' }} />
								<h3 style={{
									margin: 0,
									fontSize: '18px',
									fontWeight: 'bold',
									color: darkMode ? '#fff' : '#333'
								}}>
									Tin tức gần đây
								</h3>
							</div>
							<Link 
								to="/admin/news"
								style={{
									color: '#667eea',
									textDecoration: 'none',
									fontSize: '14px',
									fontWeight: '500'
								}}
							>
								Xem tất cả →
							</Link>
						</div>

						{recentNews.length > 0 ? (
							<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
								{recentNews.map((item) => (
									<Link
										key={item._id}
										to={`/admin/news/${item._id}`}
										style={{
											padding: '16px',
											background: darkMode ? '#0f0f0f' : '#f8f9fa',
											borderRadius: '12px',
											border: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
											textDecoration: 'none',
											display: 'block',
											transition: 'all 0.2s'
										}}
										onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#222' : '#f0f0f0'}
										onMouseLeave={(e) => e.currentTarget.style.background = darkMode ? '#0f0f0f' : '#f8f9fa'}
									>
										<div style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'flex-start',
											marginBottom: '8px'
										}}>
											<div style={{
												fontWeight: '600',
												fontSize: '15px',
												color: darkMode ? '#fff' : '#333',
												lineHeight: 1.4,
												flex: 1,
												marginRight: '12px'
											}}>
												{item.title}
											</div>
											<span style={{
												padding: '4px 8px',
												borderRadius: '12px',
												background: item.published ? '#4caf5020' : '#ff980020',
												color: item.published ? '#4caf50' : '#ff9800',
												fontSize: '12px',
												fontWeight: '600',
												whiteSpace: 'nowrap',
												display: 'flex',
												alignItems: 'center',
												gap: '4px'
											}}>
												<HiEye style={{ fontSize: '14px' }} />
												{item.published ? 'Công khai' : 'Nháp'}
											</span>
										</div>
										<div style={{
											fontSize: '13px',
											color: darkMode ? '#999' : '#666',
											marginBottom: '8px',
											display: '-webkit-box',
											WebkitLineClamp: 2,
											WebkitBoxOrient: 'vertical',
											overflow: 'hidden'
										}}>
											{item.excerpt}
										</div>
										<div style={{
											fontSize: '12px',
											color: darkMode ? '#777' : '#999'
										}}>
											Cập nhật: {new Date(item.updatedAt).toLocaleString('vi-VN')}
										</div>
									</Link>
								))}
							</div>
						) : (
							<div style={{
								textAlign: 'center',
								padding: '40px 20px',
								color: darkMode ? '#666' : '#999'
							}}>
								Chưa có bài viết nào
							</div>
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	)
}

export default AdminPage
