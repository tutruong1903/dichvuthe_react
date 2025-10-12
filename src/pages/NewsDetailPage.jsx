import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { newsService } from '../services/newsService'

function NewsDetailPage() {
	const { slug } = useParams()
	const [item, setItem] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchNews()
	}, [slug])

	const fetchNews = async () => {
		try {
			const response = await newsService.getNewsBySlug(slug)
			setItem(response.data)
		} catch (error) {
			console.error('Error fetching news:', error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">Đang tải...</h2>
						</div>
					</div>
				</div>
			</section>
		)
	}

	if (!item) {
		return (
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">Không tìm thấy bài viết</h2>
							<p className="hero-description">Bài viết có thể đã bị xóa hoặc đường dẫn không đúng.</p>
							<Link to="/tin-tuc" className="btn btn-primary">Quay lại trang Tin tức</Link>
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<>
			{/* Hero Section with Cover Image */}
			<section className="hero hero-solid" style={{
				position: 'relative',
				minHeight: '400px'
			}}>
				{item.coverImage && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundImage: `url(${item.coverImage})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							opacity: 0.5,
							zIndex: 0
						}}
					></div>
				)}
				{/* Overlay for better text readability */}
				<div style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'rgba(0, 0, 0, 0.4)',
					zIndex: 1
				}}></div>
				
				<div className="container" style={{ position: 'relative', zIndex: 2 }}>
					<div className="hero-content">
						<div className="hero-text" style={{ color: '#fff' }}>
							<h2 className="hero-title" style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
								{item.title}
							</h2>
							<p className="hero-description" style={{ 
								color: '#fff', 
								textShadow: '0 1px 2px rgba(0,0,0,0.5)',
								fontSize: '18px',
								lineHeight: '1.6'
							}}>
								{item.excerpt}
							</p>
							<div style={{
								marginTop: 16,
								color: '#fff',
								textShadow: '0 1px 2px rgba(0,0,0,0.5)',
								fontSize: '16px'
							}}>
								<span>{item.author}</span>
								<span> • </span>
								<time dateTime={item.date}>{new Date(item.date).toLocaleDateString('vi-VN')}</time>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Content Section */}
			<section className="news-detail" style={{ padding: '60px 0' }}>
				<div className="container" style={{ maxWidth: '980px' }}>
					<article style={{
						lineHeight: 1.9,
						fontSize: 18,
						color: 'var(--text)',
						letterSpacing: 0.2
					}}>
						{/* Render blocks if available, otherwise render content */}
						{item.blocks && item.blocks.length > 0 ? (
							<div style={{ display: 'grid', gap: 24 }}>
								{item.blocks
									.sort((a, b) => a.order - b.order)
									.map((block, index) => (
										<div key={block.id || index}>
											{block.type === 'text' && (
												<div
													style={{
														fontSize: `${block.text?.fontSize || 18}px`,
														fontWeight: block.text?.fontWeight || 'normal',
														color: block.text?.color || 'var(--text)',
														textAlign: block.text?.textAlign || 'left',
														fontFamily: block.text?.fontFamily || 'inherit',
														lineHeight: 1.9,
														whiteSpace: 'pre-wrap'
													}}
												>
													{block.text?.content || ''}
												</div>
											)}
											
											{block.type === 'image' && block.image?.url && (
												<div style={{ textAlign: 'center', margin: '32px 0' }}>
													<img 
														src={block.image.url} 
														alt={block.image.alt || ''} 
														style={{
															maxWidth: '100%',
															height: 'auto',
															borderRadius: '12px',
															boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
														}}
													/>
													{block.image.caption && (
														<p style={{
															fontSize: '14px',
															color: 'var(--text-light)',
															fontStyle: 'italic',
															marginTop: '8px',
															marginBottom: 0
														}}>
															{block.image.caption}
														</p>
													)}
												</div>
											)}
										</div>
									))
								}
							</div>
						) : (
							<div style={{ display: 'grid', gap: 16 }}>
								<p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{item.content}</p>
							</div>
						)}
						
						<hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />
						
						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 12,
							flexWrap: 'wrap'
						}}>
							<Link to="/tin-tuc" className="btn btn-secondary">← Quay lại Tin tức</Link>
							<div style={{ fontSize: 14, color: 'var(--text-light)' }}>
								Tác giả: <strong>{item.author}</strong> • Cập nhật: <time dateTime={item.date}>{new Date(item.date).toLocaleDateString('vi-VN')}</time>
							</div>
						</div>
					</article>
				</div>
			</section>
		</>
	)
}

export default NewsDetailPage 