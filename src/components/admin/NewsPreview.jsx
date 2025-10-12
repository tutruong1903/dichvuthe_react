import { HiX } from 'react-icons/hi'

const NewsPreview = ({ formData, onClose }) => {
	return (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: 'rgba(0,0,0,0.8)',
			zIndex: 1000,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '20px'
		}}>
			<div style={{
				background: '#fff',
				borderRadius: '12px',
				maxWidth: '1200px',
				width: '100%',
				maxHeight: '95vh',
				overflow: 'auto',
				position: 'relative'
			}}>
				{/* Header */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '20px',
					borderBottom: '1px solid #e9ecef',
					background: '#f8f9fa',
					borderRadius: '12px 12px 0 0'
				}}>
					<h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
						Preview Bài Viết
					</h2>
					<button
						onClick={onClose}
						style={{
							background: 'none',
							border: 'none',
							fontSize: '24px',
							cursor: 'pointer',
							padding: '8px',
							borderRadius: '4px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#666'
						}}
					>
						<HiX />
					</button>
				</div>

				{/* Content - Full Page Layout like NewsDetailPage */}
				<div style={{ padding: 0 }}>
					{/* Hero Section with Cover Image */}
					<section style={{
						position: 'relative',
						minHeight: '400px',
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
					}}>
						{formData.coverImage && (
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundImage: `url(${formData.coverImage})`,
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
						
						<div style={{ 
							position: 'relative', 
							zIndex: 2, 
							padding: '60px 40px',
							maxWidth: '1200px',
							margin: '0 auto'
						}}>
							<div style={{ color: '#fff' }}>
								<h1 style={{ 
									color: '#fff', 
									textShadow: '0 2px 4px rgba(0,0,0,0.5)',
									fontSize: '36px',
									fontWeight: 'bold',
									marginBottom: '16px',
									lineHeight: 1.2
								}}>
									{formData.title || 'Tiêu đề bài viết'}
								</h1>
								{formData.excerpt && (
									<p style={{ 
										color: '#fff', 
										textShadow: '0 1px 2px rgba(0,0,0,0.5)',
										fontSize: '18px',
										lineHeight: '1.6',
										marginBottom: '16px'
									}}>
										{formData.excerpt}
									</p>
								)}
								<div style={{
									color: '#fff',
									textShadow: '0 1px 2px rgba(0,0,0,0.5)',
									fontSize: '16px'
								}}>
									<span>{formData.author || 'Tác giả'}</span>
									<span> • </span>
									<time>{new Date().toLocaleDateString('vi-VN')}</time>
								</div>
							</div>
						</div>
					</section>

					{/* Content Section */}
					<section style={{ padding: '60px 40px' }}>
						<div style={{ maxWidth: '980px', margin: '0 auto' }}>
							<article style={{
								lineHeight: 1.9,
								fontSize: 18,
								color: '#333',
								letterSpacing: 0.2
							}}>
								{/* Render blocks if available, otherwise render content */}
								{formData.blocks && formData.blocks.length > 0 ? (
									<div style={{ display: 'grid', gap: 24 }}>
										{formData.blocks
											.sort((a, b) => a.order - b.order)
											.map((block, index) => (
												<div key={block.id || index}>
													{block.type === 'text' && (
														<div
															style={{
																fontSize: `${block.text?.fontSize || 18}px`,
																fontWeight: block.text?.fontWeight || 'normal',
																color: block.text?.color || '#333',
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
																	color: '#666',
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
										<p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{formData.content || 'Chưa có nội dung nào. Hãy thêm các block văn bản hoặc ảnh.'}</p>
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
									<div style={{ fontSize: 14, color: '#666' }}>
										Tác giả: <strong>{formData.author || 'Tác giả'}</strong> • Cập nhật: <time>{new Date().toLocaleDateString('vi-VN')}</time>
									</div>
								</div>
							</article>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default NewsPreview
