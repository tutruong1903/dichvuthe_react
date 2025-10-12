import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { newsService } from '../../services/newsService'
import { authService } from '../../services/authService'
import { HiPlus, HiPencil, HiTrash, HiEye, HiEyeOff, HiArrowLeft, HiNewspaper, HiChevronLeft, HiChevronRight, HiFilter } from 'react-icons/hi'

function AdminNewsPage({ darkMode = false }) {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		total: 0,
		hasNextPage: false,
		hasPrevPage: false
	})
	const [filters, setFilters] = useState({
		published: '',
		sortBy: 'updatedAt',
		sortOrder: 'desc'
	})
	const [showFilters, setShowFilters] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (!authService.isAuthenticated()) {
			navigate('/auth/login')
			return
		}

		fetchNews()
	}, [navigate, pagination.currentPage, filters])

	const fetchNews = async () => {
		try {
			setLoading(true)
			const params = new URLSearchParams({
				page: pagination.currentPage.toString(),
				limit: '6',
				...filters
			})
			
			// Remove empty filters
			Object.keys(filters).forEach(key => {
				if (filters[key] === '' || filters[key] === undefined) {
					params.delete(key)
				}
			})

			const response = await newsService.getAllNews(params.toString())
			setNews(response.data.items || [])
			setPagination({
				currentPage: response.data.currentPage,
				totalPages: response.data.totalPages,
				total: response.data.total,
				hasNextPage: response.data.hasNextPage,
				hasPrevPage: response.data.hasPrevPage
			})
		} catch (err) {
			setError('Có lỗi xảy ra khi tải dữ liệu')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id) => {
		if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return

		try {
			await newsService.deleteNews(id)
			// Refresh the current page
			fetchNews()
		} catch (err) {
			alert('Có lỗi xảy ra khi xóa bài viết')
		}
	}

	const handleFilterChange = (key, value) => {
		setFilters(prev => ({
			...prev,
			[key]: value
		}))
		// Reset to first page when filters change
		setPagination(prev => ({
			...prev,
			currentPage: 1
		}))
	}

	const handlePageChange = (page) => {
		setPagination(prev => ({
			...prev,
			currentPage: page
		}))
	}

	const clearFilters = () => {
		setFilters({
			published: '',
			sortBy: 'updatedAt',
			sortOrder: 'desc'
		})
		setPagination(prev => ({
			...prev,
			currentPage: 1
		}))
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
			{/* Header Section */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: '32px',
				padding: '24px',
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				borderRadius: '16px',
				color: '#fff'
			}}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
					<HiNewspaper style={{ fontSize: '24px' }} />
					<div>
						<h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
							Quản lý tin tức
						</h1>
						<p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
							Tạo, chỉnh sửa và quản lý các bài viết tin tức
						</p>
					</div>
				</div>
				<Link 
					to="/admin/news/new" 
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						background: 'rgba(255,255,255,0.2)',
						color: '#fff',
						padding: '12px 20px',
						borderRadius: '8px',
						textDecoration: 'none',
						fontWeight: '500',
						transition: 'background 0.2s'
					}}
					onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
					onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
				>
					<HiPlus />
					Tạo bài viết mới
				</Link>
			</div>

			{/* Navigation */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: '24px'
			}}>
				<Link 
					to="/admin" 
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						color: '#667eea',
						textDecoration: 'none',
						fontWeight: '500',
						padding: '8px 16px',
						borderRadius: '8px',
						background: darkMode ? '#2a2a2a' : '#f0f8ff',
						transition: 'all 0.2s'
					}}
					onMouseEnter={(e) => {
						e.target.style.background = darkMode ? '#333' : '#e6f3ff'
						e.target.style.transform = 'translateX(-2px)'
					}}
					onMouseLeave={(e) => {
						e.target.style.background = darkMode ? '#2a2a2a' : '#f0f8ff'
						e.target.style.transform = 'translateX(0)'
					}}
				>
					<HiArrowLeft />
					Quay lại Dashboard
				</Link>
				
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
					color: darkMode ? '#999' : '#666',
					fontSize: '14px'
				}}>
					<span>Tổng cộng: <strong>{pagination.total}</strong> bài viết</span>
					<button
						onClick={() => setShowFilters(!showFilters)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '6px',
							background: showFilters ? '#667eea' : (darkMode ? '#222' : '#f8f9fa'),
							color: showFilters ? '#fff' : (darkMode ? '#ccc' : '#666'),
							padding: '8px 12px',
							borderRadius: '6px',
							border: `1px solid ${darkMode ? '#333' : '#e1e5e9'}`,
							cursor: 'pointer',
							fontSize: '14px',
							transition: 'all 0.2s'
						}}
					>
						<HiFilter />
						Bộ lọc
					</button>
				</div>
			</div>

			{/* Filters */}
			{showFilters && (
				<div style={{
					background: darkMode ? '#1a1a1a' : '#fff',
					padding: '20px',
					borderRadius: '12px',
					boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
					marginBottom: '24px',
					border: `1px solid ${darkMode ? '#333' : '#f0f0f0'}`
				}}>
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: '16px',
						marginBottom: '16px'
					}}>
						{/* Published Status Filter */}
						<div>
							<label style={{
								display: 'block',
								marginBottom: '6px',
								fontWeight: '600',
								color: darkMode ? '#ccc' : '#333',
								fontSize: '14px'
							}}>
								Trạng thái
							</label>
							<select
								value={filters.published}
								onChange={(e) => handleFilterChange('published', e.target.value)}
								style={{
									width: '100%',
									padding: '8px 12px',
									border: `1px solid ${darkMode ? '#333' : '#e1e5e9'}`,
									borderRadius: '6px',
									fontSize: '14px',
									background: darkMode ? '#0f0f0f' : '#fff',
									color: darkMode ? '#fff' : '#333'
								}}
							>
								<option value="">Tất cả</option>
								<option value="true">Đã xuất bản</option>
								<option value="false">Chưa xuất bản</option>
							</select>
						</div>

						{/* Sort By Filter */}
						<div>
							<label style={{
								display: 'block',
								marginBottom: '6px',
								fontWeight: '600',
								color: darkMode ? '#ccc' : '#333',
								fontSize: '14px'
							}}>
								Sắp xếp theo
							</label>
							<select
								value={filters.sortBy}
								onChange={(e) => handleFilterChange('sortBy', e.target.value)}
								style={{
									width: '100%',
									padding: '8px 12px',
									border: `1px solid ${darkMode ? '#333' : '#e1e5e9'}`,
									borderRadius: '6px',
									fontSize: '14px',
									background: darkMode ? '#0f0f0f' : '#fff',
									color: darkMode ? '#fff' : '#333'
								}}
							>
								<option value="updatedAt">Cập nhật</option>
								<option value="createdAt">Tạo mới</option>
								<option value="date">Ngày xuất bản</option>
								<option value="title">Tiêu đề</option>
							</select>
						</div>

						{/* Sort Order Filter */}
						<div>
							<label style={{
								display: 'block',
								marginBottom: '6px',
								fontWeight: '600',
								color: darkMode ? '#ccc' : '#333',
								fontSize: '14px'
							}}>
								Thứ tự
							</label>
							<select
								value={filters.sortOrder}
								onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
								style={{
									width: '100%',
									padding: '8px 12px',
									border: `1px solid ${darkMode ? '#333' : '#e1e5e9'}`,
									borderRadius: '6px',
									fontSize: '14px',
									background: darkMode ? '#0f0f0f' : '#fff',
									color: darkMode ? '#fff' : '#333'
								}}
							>
								<option value="desc">Mới nhất</option>
								<option value="asc">Cũ nhất</option>
							</select>
						</div>
					</div>

					<div style={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: '8px'
					}}>
						<button
							onClick={clearFilters}
							style={{
								padding: '8px 16px',
								background: '#6c757d',
								color: '#fff',
								border: 'none',
								borderRadius: '6px',
								cursor: 'pointer',
								fontSize: '14px',
								transition: 'background 0.2s'
							}}
							onMouseEnter={(e) => e.target.style.background = '#5a6268'}
							onMouseLeave={(e) => e.target.style.background = '#6c757d'}
						>
							Xóa bộ lọc
						</button>
					</div>
				</div>
			)}

			{/* Error Message */}
			{error && (
				<div style={{
					background: '#fee',
					color: '#c33',
					padding: '16px',
					borderRadius: '8px',
					marginBottom: '24px',
					border: '1px solid #fcc',
					display: 'flex',
					alignItems: 'center',
					gap: '8px'
				}}>
					<span>⚠️</span>
					{error}
				</div>
			)}

			{/* News Grid */}
			{news.length > 0 ? (
				<>
					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
						gap: '24px',
						marginBottom: '32px'
					}}>
					{news.map(item => (
						<article key={item._id} style={{
							background: darkMode ? '#1a1a1a' : '#fff',
							borderRadius: '16px',
							boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							transition: 'transform 0.2s, box-shadow 0.2s',
							border: `1px solid ${darkMode ? '#333' : '#f0f0f0'}`
						}}
						onMouseEnter={(e) => {
							e.target.style.transform = 'translateY(-4px)'
							e.target.style.boxShadow = darkMode ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.12)'
						}}
						onMouseLeave={(e) => {
							e.target.style.transform = 'translateY(0)'
							e.target.style.boxShadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
						}}
						>
							{/* Cover Image */}
							{item.coverImage && (
								<div style={{
									height: '200px',
									background: darkMode ? '#222' : '#f8f9fa',
									position: 'relative',
									overflow: 'hidden'
								}}>
									<img 
										src={item.coverImage} 
										alt={item.title} 
										loading="lazy" 
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
											display: 'block'
										}} 
									/>
									<div style={{
										position: 'absolute',
										top: '12px',
										right: '12px',
										background: item.published ? '#4caf50' : '#ff9800',
										color: '#fff',
										padding: '4px 8px',
										borderRadius: '12px',
										fontSize: '12px',
										fontWeight: '500',
										display: 'flex',
										alignItems: 'center',
										gap: '4px'
									}}>
										{item.published ? <HiEye /> : <HiEyeOff />}
										{item.published ? 'Đã xuất bản' : 'Bản nháp'}
									</div>
								</div>
							)}

							{/* Content */}
							<div style={{
								padding: '20px',
								display: 'flex',
								flexDirection: 'column',
								flexGrow: 1
							}}>
								<h3 style={{
									margin: '0 0 12px',
									fontSize: '18px',
									fontWeight: '600',
									color: darkMode ? '#fff' : '#333',
									lineHeight: 1.4
								}}>
									{item.title}
								</h3>
								
								<p style={{
									margin: '0 0 16px',
									color: darkMode ? '#999' : '#666',
									fontSize: '14px',
									lineHeight: 1.5,
									flexGrow: 1
								}}>
									{item.excerpt}
								</p>

								<div style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: '16px',
									fontSize: '13px',
									color: darkMode ? '#777' : '#999'
								}}>
									<span>Tác giả: <strong>{item.author}</strong></span>
									<span>{new Date(item.createdAt || item.date).toLocaleDateString('vi-VN')}</span>
								</div>

								{/* Actions */}
								<div style={{
									display: 'flex',
									gap: '8px',
									marginTop: 'auto'
								}}>
									<Link 
										to={`/admin/news/${item._id}`} 
										style={{
											flex: 1,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '6px',
											background: '#667eea',
											color: '#fff',
											padding: '10px 16px',
											borderRadius: '8px',
											textDecoration: 'none',
											fontSize: '14px',
											fontWeight: '500',
											transition: 'background 0.2s'
										}}
										onMouseEnter={(e) => e.target.style.background = '#5a6fd8'}
										onMouseLeave={(e) => e.target.style.background = '#667eea'}
									>
										<HiPencil />
										Chỉnh sửa
									</Link>
									<button 
										onClick={() => handleDelete(item._id)}
										style={{
											flex: 1,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '6px',
											background: '#e74c3c',
											color: '#fff',
											padding: '10px 16px',
											borderRadius: '8px',
											border: 'none',
											fontSize: '14px',
											fontWeight: '500',
											cursor: 'pointer',
											transition: 'background 0.2s'
										}}
										onMouseEnter={(e) => e.target.style.background = '#c0392b'}
										onMouseLeave={(e) => e.target.style.background = '#e74c3c'}
									>
										<HiTrash />
										Xóa
									</button>
								</div>
							</div>
						</article>
					))}
					</div>

					{/* Pagination */}
					{(
						<div style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '8px',
							marginTop: '32px'
						}}>
							{/* Previous Button */}
							<button
								onClick={() => handlePageChange(pagination.currentPage - 1)}
								disabled={!pagination.hasPrevPage}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '6px',
									padding: '8px 12px',
									background: pagination.hasPrevPage ? '#667eea' : (darkMode ? '#222' : '#f8f9fa'),
									color: pagination.hasPrevPage ? '#fff' : '#999',
									border: 'none',
									borderRadius: '6px',
									cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed',
									fontSize: '14px',
									transition: 'all 0.2s'
								}}
								onMouseEnter={(e) => {
									if (pagination.hasPrevPage) {
										e.target.style.background = '#5a6fd8'
									}
								}}
								onMouseLeave={(e) => {
									if (pagination.hasPrevPage) {
										e.target.style.background = '#667eea'
									}
								}}
							>
								<HiChevronLeft />
								Trước
							</button>

							{/* Page Numbers */}
							<div style={{
								display: 'flex',
								gap: '4px'
							}}>
								{Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
									let pageNum;
									if (pagination.totalPages <= 5) {
										pageNum = i + 1;
									} else if (pagination.currentPage <= 3) {
										pageNum = i + 1;
									} else if (pagination.currentPage >= pagination.totalPages - 2) {
										pageNum = pagination.totalPages - 4 + i;
									} else {
										pageNum = pagination.currentPage - 2 + i;
									}

									return (
										<button
											key={pageNum}
											onClick={() => handlePageChange(pageNum)}
											style={{
												width: '40px',
												height: '40px',
												background: pageNum === pagination.currentPage ? '#667eea' : (darkMode ? '#222' : '#f8f9fa'),
												color: pageNum === pagination.currentPage ? '#fff' : (darkMode ? '#ccc' : '#666'),
												border: `1px solid ${darkMode ? '#333' : '#e1e5e9'}`,
												borderRadius: '6px',
												cursor: 'pointer',
												fontSize: '14px',
												fontWeight: pageNum === pagination.currentPage ? '600' : '400',
												transition: 'all 0.2s'
											}}
											onMouseEnter={(e) => {
												if (pageNum !== pagination.currentPage) {
													e.target.style.background = darkMode ? '#2a2a2a' : '#e9ecef'
												}
											}}
											onMouseLeave={(e) => {
												if (pageNum !== pagination.currentPage) {
													e.target.style.background = darkMode ? '#222' : '#f8f9fa'
												}
											}}
										>
											{pageNum}
										</button>
									);
								})}
							</div>

							{/* Next Button */}
							<button
								onClick={() => handlePageChange(pagination.currentPage + 1)}
								disabled={!pagination.hasNextPage}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '6px',
									padding: '8px 12px',
									background: pagination.hasNextPage ? '#667eea' : (darkMode ? '#222' : '#f8f9fa'),
									color: pagination.hasNextPage ? '#fff' : '#999',
									border: 'none',
									borderRadius: '6px',
									cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed',
									fontSize: '14px',
									transition: 'all 0.2s'
								}}
								onMouseEnter={(e) => {
									if (pagination.hasNextPage) {
										e.target.style.background = '#5a6fd8'
									}
								}}
								onMouseLeave={(e) => {
									if (pagination.hasNextPage) {
										e.target.style.background = '#667eea'
									}
								}}
							>
								Sau
								<HiChevronRight />
							</button>
						</div>

		
						
					)}
				</>
			) : (
				<div style={{
					textAlign: 'center',
					padding: '60px 20px',
					background: darkMode ? '#1a1a1a' : '#fff',
					borderRadius: '16px',
					boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
					border: `1px solid ${darkMode ? '#333' : 'transparent'}`
				}}>
					<HiNewspaper style={{ fontSize: '48px', color: darkMode ? '#555' : '#ccc', marginBottom: '16px' }} />
					<h3 style={{ margin: '0 0 8px', color: darkMode ? '#999' : '#666' }}>Chưa có bài viết nào</h3>
					<p style={{ margin: '0 0 24px', color: darkMode ? '#777' : '#999' }}>
						Bắt đầu tạo bài viết đầu tiên để quản lý tin tức
					</p>
					<Link 
						to="/admin/news/new"
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '8px',
							background: '#667eea',
							color: '#fff',
							padding: '12px 24px',
							borderRadius: '8px',
							textDecoration: 'none',
							fontWeight: '500',
							transition: 'background 0.2s'
						}}
						onMouseEnter={(e) => e.target.style.background = '#5a6fd8'}
						onMouseLeave={(e) => e.target.style.background = '#667eea'}
					>
						<HiPlus />
						Tạo bài viết đầu tiên
					</Link>
				</div>
			)}
			</div>
		</AdminLayout>
	)
}

export default AdminNewsPage
