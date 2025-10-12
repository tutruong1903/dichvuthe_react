import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { newsService } from '../services/newsService'
import { HiSearch, HiFilter, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

function NewsPage() {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		total: 0,
		hasNextPage: false,
		hasPrevPage: false
	})
	const [filters, setFilters] = useState({
		sortBy: 'date',
		sortOrder: 'desc',
		search: ''
	})
	const [showFilters, setShowFilters] = useState(false)

	useEffect(() => {
		fetchNews()
	}, [pagination.currentPage, filters])

	const fetchNews = async () => {
		try {
			setLoading(true)
			const params = new URLSearchParams({
				page: pagination.currentPage.toString(),
				limit: '9',
				...filters
			})
			
			// Remove empty filters
			Object.keys(filters).forEach(key => {
				if (filters[key] === '' || filters[key] === undefined) {
					params.delete(key)
				}
			})

			const response = await newsService.getPublishedNews(params.toString())
			setNews(response.data.items || [])
			setPagination({
				currentPage: response.data.currentPage,
				totalPages: response.data.totalPages,
				total: response.data.total,
				hasNextPage: response.data.hasNextPage,
				hasPrevPage: response.data.hasPrevPage
			})
		} catch (error) {
			console.error('Error fetching news:', error)
		} finally {
			setLoading(false)
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
			sortBy: 'date',
			sortOrder: 'desc',
			search: ''
		})
		setPagination(prev => ({
			...prev,
			currentPage: 1
		}))
	}


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
					</div>

					{/* Search and Filters */}
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '24px',
						flexWrap: 'wrap',
						gap: '16px'
					}}>
						{/* Search */}
						<div style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							flex: '1',
							minWidth: '300px'
						}}>
							<div style={{ position: 'relative', flex: '1' }}>
								<HiSearch style={{
									position: 'absolute',
									left: '12px',
									top: '50%',
									transform: 'translateY(-50%)',
									color: '#999',
									fontSize: '18px'
								}} />
								<input
									type="text"
									placeholder="Tìm kiếm bài viết..."
									value={filters.search}
									onChange={(e) => handleFilterChange('search', e.target.value)}
									style={{
										width: '100%',
										padding: '12px 12px 12px 40px',
										border: '2px solid #e1e5e9',
										borderRadius: '8px',
										fontSize: '16px',
										transition: 'border-color 0.2s'
									}}
									onFocus={(e) => e.target.style.borderColor = '#667eea'}
									onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
								/>
							</div>
						</div>

						{/* Filter Toggle */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '6px',
								background: showFilters ? '#667eea' : '#f8f9fa',
								color: showFilters ? '#fff' : '#666',
								padding: '12px 16px',
								borderRadius: '8px',
								border: '1px solid #e1e5e9',
								cursor: 'pointer',
								fontSize: '14px',
								transition: 'all 0.2s'
							}}
						>
							<HiFilter />
							Bộ lọc
						</button>
					</div>

					{/* Filters Panel */}
					{showFilters && (
						<div style={{
							background: '#fff',
							padding: '20px',
							borderRadius: '12px',
							boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
							marginBottom: '24px',
							border: '1px solid #f0f0f0'
						}}>
							<div style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
								gap: '16px',
								marginBottom: '16px'
							}}>
								{/* Sort By Filter */}
								<div>
									<label style={{
										display: 'block',
										marginBottom: '6px',
										fontWeight: '600',
										color: '#333',
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
											border: '1px solid #e1e5e9',
											borderRadius: '6px',
											fontSize: '14px',
											background: '#fff'
										}}
									>
										<option value="date">Ngày xuất bản</option>
										<option value="createdAt">Ngày tạo</option>
										<option value="updatedAt">Ngày cập nhật</option>
										<option value="title">Tiêu đề</option>
									</select>
								</div>

								{/* Sort Order Filter */}
								<div>
									<label style={{
										display: 'block',
										marginBottom: '6px',
										fontWeight: '600',
										color: '#333',
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
											border: '1px solid #e1e5e9',
											borderRadius: '6px',
											fontSize: '14px',
											background: '#fff'
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

					{/* Loading State */}
					{loading ? (
						<div style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '60px 20px',
							background: '#fff',
							borderRadius: '16px',
							boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
						}}>
							<div style={{
								textAlign: 'center',
								padding: '40px',
								background: '#fff',
								borderRadius: '12px',
								boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
							}}>
								<div 
									style={{
										width: '40px',
										height: '40px',
										border: '4px solid #f3f3f3',
										borderTop: '4px solid #667eea',
										borderRadius: '50%',
										margin: '0 auto 20px',
										animation: 'spin 1s linear infinite'
									}}
								></div>
								<p style={{margin: 0, color: '#666'}}>Đang tải bài viết...</p>
							</div>
						</div>
					) : news.length > 0 ? (
						<>
							<div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'24px',marginBottom:'32px'}}>
								{news.map(item => (
									<article key={item._id} className="card" style={{background:'#fff',borderRadius:'12px',boxShadow:'0 4px 14px rgba(0,0,0,0.06)',overflow:'hidden',display:'flex',flexDirection:'column',height:'100%'}}>
										{item.coverImage && (
											<div style={{height:220,background:'#f2f3f5'}}>
												<img src={item.coverImage} alt={item.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
											</div>
										)}
										<div style={{padding:'16px',display:'flex',flexDirection:'column',flexGrow:1}}>
											<h3 style={{margin:'0 0 8px'}}>{item.title}</h3>
											<p style={{margin:'0 0 12px',color:'var(--text-light)'}}>{item.excerpt}</p>
											<div style={{display:'flex',justifyContent:'space-between',fontSize:14,color:'var(--text-light)'}}>
												<span>{item.author}</span>
												<time dateTime={item.date}>{new Date(item.date).toLocaleDateString('vi-VN')}</time>
											</div>
											<div style={{marginTop:'auto',paddingTop:12}}>
												<Link to={`/tin-tuc/${item.slug}`} className="btn btn-primary" style={{width:'fit-content'}}>Đọc tiếp</Link>
											</div>
										</div>
									</article>
								))}
							</div>

							{/* Pagination */}
							{pagination.totalPages > 1 && (
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
											background: pagination.hasPrevPage ? '#667eea' : '#f8f9fa',
											color: pagination.hasPrevPage ? '#fff' : '#999',
											border: 'none',
											borderRadius: '6px',
											cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed',
											fontSize: '14px',
											transition: 'all 0.2s'
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
														background: pageNum === pagination.currentPage ? '#667eea' : '#f8f9fa',
														color: pageNum === pagination.currentPage ? '#fff' : '#666',
														border: '1px solid #e1e5e9',
														borderRadius: '6px',
														cursor: 'pointer',
														fontSize: '14px',
														fontWeight: pageNum === pagination.currentPage ? '600' : '400',
														transition: 'all 0.2s'
													}}
													onMouseEnter={(e) => {
														if (pageNum !== pagination.currentPage) {
															e.target.style.background = '#e9ecef'
														}
													}}
													onMouseLeave={(e) => {
														if (pageNum !== pagination.currentPage) {
															e.target.style.background = '#f8f9fa'
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
											background: pagination.hasNextPage ? '#667eea' : '#f8f9fa',
											color: pagination.hasNextPage ? '#fff' : '#999',
											border: 'none',
											borderRadius: '6px',
											cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed',
											fontSize: '14px',
											transition: 'all 0.2s'
										}}
									>
										Sau
										<HiChevronRight />
									</button>
								</div>
							)}

							{/* Page Info */}
							<div style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								marginTop: '16px',
								color: '#666',
								fontSize: '14px',
								justifyContent: 'center'
							}}>
								<span>
									Trang <strong>{pagination.currentPage}</strong> / <strong>{pagination.totalPages}</strong>
								</span>
								<span style={{ color: '#999' }}>•</span>
								<span>
									Hiển thị <strong>{news.length}</strong> / <strong>{pagination.total}</strong> bài viết
								</span>
							</div>
						</>
					) : (
						<div style={{
							textAlign: 'center',
							padding: '60px 20px',
							background: '#fff',
							borderRadius: '16px',
							boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
						}}>
							<h3 style={{ margin: '0 0 8px', color: '#666' }}>Không tìm thấy bài viết</h3>
							<p style={{ margin: '0 0 24px', color: '#999' }}>
								{filters.search ? 'Không có bài viết nào phù hợp với từ khóa tìm kiếm' : 'Chưa có bài viết nào được xuất bản'}
							</p>
							{filters.search && (
								<button
									onClick={clearFilters}
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
										transition: 'background 0.2s',
										border: 'none',
										cursor: 'pointer'
									}}
								>
									Xóa bộ lọc
								</button>
							)}
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default NewsPage 