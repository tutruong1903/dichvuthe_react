import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { newsService } from '../../services/newsService'
import { authService } from '../../services/authService'
import { HiPlus, HiArrowLeft, HiNewspaper, HiSave, HiX, HiUpload, HiPhotograph, HiEye, HiTrash, HiArrowUp, HiArrowDown } from 'react-icons/hi'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TextBlock from '../../components/admin/TextBlock'
import ImageBlock from '../../components/admin/ImageBlock'
import NewsPreview from '../../components/admin/NewsPreview'

function AdminNewsEditPage() {
	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		author: '',
		coverImage: '',
		excerpt: '',
		content: '', // Keep for backward compatibility
		blocks: [], // New structured content
		published: false
	})
	const [loading, setLoading] = useState(false)
	const [initialLoading, setInitialLoading] = useState(true)
	const [error, setError] = useState('')
	const [uploadingImage, setUploadingImage] = useState(false)
	const [showPreview, setShowPreview] = useState(false)
	const fileInputRef = useRef(null)
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		if (!authService.isAuthenticated()) {
			navigate('/auth/login')
			return
		}

		fetchNews()
	}, [id, navigate])

	// Auto-generate slug from title
	const generateSlug = (title) => {
		return title
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
			.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
			.replace(/\s+/g, '-') // Replace spaces with hyphens
			.replace(/-+/g, '-') // Replace multiple hyphens with single
			.trim()
	}

	// Convert file to base64 with compression
	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()

			// Compress image if it's too large
			if (file.size > 5 * 1024 * 1024) { // If larger than 5MB
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				const img = new Image()

				img.onload = () => {
					// Calculate new dimensions (max 1920px width)
					const maxWidth = 1920
					const maxHeight = 1080
					let { width, height } = img

					if (width > maxWidth) {
						height = (height * maxWidth) / width
						width = maxWidth
					}
					if (height > maxHeight) {
						width = (width * maxHeight) / height
						height = maxHeight
					}

					canvas.width = width
					canvas.height = height

					// Draw and compress
					ctx.drawImage(img, 0, 0, width, height)
					const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8)
					resolve(compressedDataUrl)
				}

				img.onerror = () => reject(new Error('Failed to load image'))
				img.src = URL.createObjectURL(file)
			} else {
				// For smaller files, use original method
				reader.readAsDataURL(file)
				reader.onload = () => resolve(reader.result)
				reader.onerror = error => reject(error)
			}
		})
	}

	// Generate unique ID for blocks
	const generateId = () => {
		return Date.now().toString(36) + Math.random().toString(36).substr(2)
	}

	const fetchNews = async () => {
		try {
			setInitialLoading(true)
			const response = await newsService.getNewsById(id)
			const newsData = response.data
			// Convert old content to blocks if needed
			if (newsData.content && (!newsData.blocks || newsData.blocks.length === 0)) {
				newsData.blocks = [{
					id: generateId(),
					type: 'text',
					order: 0,
					text: {
						content: newsData.content,
						fontSize: 16,
						fontWeight: 'normal',
						color: '#000000',
						textAlign: 'left',
						fontFamily: 'Arial, sans-serif'
					}
				}]
			}
			setFormData(newsData)
		} catch (err) {
			setError('Có lỗi xảy ra khi tải dữ liệu')
		} finally {
			setInitialLoading(false)
		}
	}

	// Add text block
	const addTextBlock = () => {
		const newBlock = {
			id: generateId(),
			type: 'text',
			order: formData.blocks.length,
			text: {
				content: '',
				fontSize: 16,
				fontWeight: 'normal',
				color: '#000000',
				textAlign: 'left',
				fontFamily: 'Arial, sans-serif'
			}
		}
		setFormData(prev => ({
			...prev,
			blocks: [...prev.blocks, newBlock]
		}))
	}

	// Add image block
	const addImageBlock = () => {
		const newBlock = {
			id: generateId(),
			type: 'image',
			order: formData.blocks.length,
			image: {
				url: '',
				alt: '',
				caption: '',
				width: 0,
				height: 0
			}
		}
		setFormData(prev => ({
			...prev,
			blocks: [...prev.blocks, newBlock]
		}))
	}

	// Update text block
	const updateTextBlock = (blockId, textData) => {
		setFormData(prev => ({
			...prev,
			blocks: prev.blocks.map(block =>
				block.id === blockId
					? { ...block, text: { ...block.text, ...textData } }
					: block
			)
		}))
	}

	// Update image block
	const updateImageBlock = (blockId, imageData) => {
		setFormData(prev => ({
			...prev,
			blocks: prev.blocks.map(block =>
				block.id === blockId
					? { ...block, image: { ...block.image, ...imageData } }
					: block
			)
		}))
	}

	// Remove block
	const removeBlock = (blockId) => {
		setFormData(prev => ({
			...prev,
			blocks: prev.blocks.filter(block => block.id !== blockId)
		}))
	}

	// Move block up
	const moveBlockUp = (index) => {
		if (index > 0) {
			const newBlocks = [...formData.blocks]
			const temp = newBlocks[index]
			newBlocks[index] = newBlocks[index - 1]
			newBlocks[index - 1] = temp
			// Update order
			newBlocks.forEach((block, i) => {
				block.order = i
			})
			setFormData(prev => ({
				...prev,
				blocks: newBlocks
			}))
		}
	}

	// Move block down
	const moveBlockDown = (index) => {
		if (index < formData.blocks.length - 1) {
			const newBlocks = [...formData.blocks]
			const temp = newBlocks[index]
			newBlocks[index] = newBlocks[index + 1]
			newBlocks[index + 1] = temp
			// Update order
			newBlocks.forEach((block, i) => {
				block.order = i
			})
			setFormData(prev => ({
				...prev,
				blocks: newBlocks
			}))
		}
	}

	// Handle drag start
	const onDragStart = (result) => {
		console.log('onDragStart called')
		// Prevent form submission during drag
		event?.preventDefault?.()
	}

	// Handle drag update
	const onDragUpdate = (result) => {
		console.log('onDragUpdate called')
		// Prevent form submission during drag
		event?.preventDefault?.()
	}

	// Handle drag end
	const onDragEnd = (result) => {
		if (!result.destination) return

		console.log('onDragEnd called - only updating local state, not calling API')
		
		// Prevent form submission during drag
		event?.preventDefault?.()
		
		const newBlocks = Array.from(formData.blocks)
		const [reorderedItem] = newBlocks.splice(result.source.index, 1)
		newBlocks.splice(result.destination.index, 0, reorderedItem)

		// Update order
		newBlocks.forEach((block, index) => {
			block.order = index
		})

		setFormData(prev => ({
			...prev,
			blocks: newBlocks
		}))
	}

	// Handle cover image upload
	const handleCoverImageUpload = async (e) => {
		const file = e.target.files[0]
		if (!file) return

		// Validate file type
		if (!file.type.startsWith('image/')) {
			setError('Vui lòng chọn file ảnh hợp lệ')
			return
		}

		// Validate file size (max 2MB for base64)
		if (file.size > 10 * 1024 * 1024) {
			setError('Kích thước ảnh không được vượt quá 10MB')
			return
		}

		setUploadingImage(true)
		setError('')

		try {
			const base64 = await fileToBase64(file)
			setFormData(prev => ({
				...prev,
				coverImage: base64
			}))
		} catch (err) {
			setError('Có lỗi xảy ra khi xử lý ảnh: ' + err.message)
		} finally {
			setUploadingImage(false)
		}
	}

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target

		// Auto-generate slug when title changes
		if (name === 'title') {
			const slug = generateSlug(value)
			setFormData({
				...formData,
				title: value,
				slug: slug
			})
		} else {
			setFormData({
				...formData,
				[name]: type === 'checkbox' ? checked : value
			})
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log('handleSubmit called - API update triggered')
		setLoading(true)
		setError('')

		// Validation
		if (!formData.title.trim()) {
			setError('Vui lòng nhập tiêu đề bài viết')
			setLoading(false)
			return
		}
		if (!formData.slug.trim()) {
			setError('Vui lòng nhập slug bài viết')
			setLoading(false)
			return
		}
		if (!formData.author.trim()) {
			setError('Vui lòng nhập tác giả')
			setLoading(false)
			return
		}
		if (!formData.excerpt.trim()) {
			setError('Vui lòng nhập tóm tắt bài viết')
			setLoading(false)
			return
		}
		if (formData.blocks.length === 0) {
			setError('Vui lòng thêm ít nhất một block nội dung')
			setLoading(false)
			return
		}

		try {
			console.log('Updating news with data:', {
				...formData,
				content: formData.content ? `${formData.content.substring(0, 100)}...` : 'empty',
				coverImage: formData.coverImage ? `${formData.coverImage.substring(0, 50)}...` : 'empty'
			})

			const result = await newsService.updateNews(id, formData)
			console.log('News updated successfully:', result)
			navigate('/admin/news')
		} catch (err) {
			console.error('Error updating news:', err)
			if (err.code === 'ECONNABORTED') {
				setError('Request timeout - ảnh quá lớn, vui lòng chọn ảnh nhỏ hơn')
			} else if (err.response?.status === 413) {
				setError('Dữ liệu quá lớn - vui lòng giảm kích thước ảnh')
			} else {
				setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi cập nhật bài viết')
			}
		} finally {
			setLoading(false)
		}
	}

	const handleCancel = () => {
		if (formData.title || formData.content || formData.blocks.length > 0) {
			if (confirm('Bạn có chắc muốn hủy? Dữ liệu chưa lưu sẽ bị mất.')) {
				navigate('/admin/news')
			}
		} else {
			navigate('/admin/news')
		}
	}

	// Loading state
	if (initialLoading) {
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
						background: '#fff',
						borderRadius: '12px',
						boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
					}}>
						<div style={{
							width: '40px',
							height: '40px',
							border: '4px solid #f3f3f3',
							borderTop: '4px solid #667eea',
							borderRadius: '50%',
							animation: 'spin 1s linear infinite',
							margin: '0 auto 20px'
						}}></div>
						<p style={{margin: 0, color: '#666'}}>Đang tải dữ liệu bài viết...</p>
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
							<h1 style={{ margin: 0, fontSize: '24px' }}>
								Chỉnh sửa bài viết
							</h1>
							<p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
								Chỉnh sửa bài viết tin tức hiện có
							</p>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '24px'
				}}>
					<Link
						to="/admin/news"
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							color: '#667eea',
							textDecoration: 'none',
							fontWeight: '500',
							padding: '8px 16px',
							borderRadius: '8px',
							background: '#f0f8ff',
							transition: 'all 0.2s'
						}}
						onMouseEnter={(e) => {
							e.target.style.background = '#e6f3ff'
							e.target.style.transform = 'translateX(-2px)'
						}}
						onMouseLeave={(e) => {
							e.target.style.background = '#f0f8ff'
							e.target.style.transform = 'translateX(0)'
						}}
					>
						<HiArrowLeft />
						Quay lại danh sách
					</Link>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} style={{
					background: '#fff',
					padding: '32px',
					borderRadius: '16px',
					boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
					border: '1px solid #f0f0f0'
				}}>
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

					{/* Basic Info - Balanced Layout */}
					<div style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '24px',
						marginBottom: '32px'
					}}>
						{/* Left Column */}
						<div>
							{/* Title */}
							<div style={{ marginBottom: '20px' }}>
								<label style={{
									display: 'block',
									marginBottom: '8px',
									fontWeight: '600',
									color: '#333'
								}}>
									Tiêu đề bài viết *
								</label>
								<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleChange}
									placeholder="Nhập tiêu đề bài viết..."
									style={{
										width: '100%',
										padding: '12px 16px',
										border: '2px solid #e1e5e9',
										borderRadius: '8px',
										fontSize: '16px',
										transition: 'border-color 0.2s'
									}}
									onFocus={(e) => e.target.style.borderColor = '#667eea'}
									onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
								/>
							</div>

							{/* Author */}
							<div style={{ marginBottom: '20px' }}>
								<label style={{
									display: 'block',
									marginBottom: '8px',
									fontWeight: '600',
									color: '#333'
								}}>
									Tác giả *
								</label>
								<input
									type="text"
									name="author"
									value={formData.author}
									onChange={handleChange}
									placeholder="Tên tác giả..."
									style={{
										width: '100%',
										padding: '12px 16px',
										border: '2px solid #e1e5e9',
										borderRadius: '8px',
										fontSize: '16px',
										transition: 'border-color 0.2s'
									}}
									onFocus={(e) => e.target.style.borderColor = '#667eea'}
									onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
								/>
							</div>

							{/* Slug */}
							<div>
								<label style={{
									display: 'block',
									marginBottom: '8px',
									fontWeight: '600',
									color: '#333'
								}}>
									Slug *
								</label>
								<input
									type="text"
									name="slug"
									value={formData.slug}
									onChange={handleChange}
									placeholder="slug-bai-viet"
									style={{
										width: '100%',
										padding: '12px 16px',
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

						{/* Right Column */}
						<div>
							{/* Cover Image */}
							<div style={{ marginBottom: '20px' }}>
								<label style={{
									display: 'block',
									marginBottom: '8px',
									fontWeight: '600',
									color: '#333'
								}}>
									Ảnh bìa
								</label>
								<div style={{
									border: '2px dashed #e1e5e9',
									borderRadius: '8px',
									padding: '20px',
									textAlign: 'center',
									background: '#f8f9fa',
									transition: 'border-color 0.2s',
									minHeight: '200px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center'
								}}>
									{formData.coverImage ? (
										<div>
											<img
												src={formData.coverImage}
												alt="Cover preview"
												style={{
													maxWidth: '100%',
													maxHeight: '150px',
													borderRadius: '8px',
													marginBottom: '12px'
												}}
											/>
											<div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
												<button
													type="button"
													onClick={() => fileInputRef.current?.click()}
													disabled={uploadingImage}
													style={{
														display: 'flex',
														alignItems: 'center',
														gap: '6px',
														background: '#667eea',
														color: '#fff',
														padding: '8px 16px',
														borderRadius: '6px',
														border: 'none',
														fontSize: '14px',
														cursor: uploadingImage ? 'not-allowed' : 'pointer',
														opacity: uploadingImage ? 0.6 : 1
													}}
												>
													<HiUpload />
													{uploadingImage ? 'Đang upload...' : 'Thay đổi ảnh'}
												</button>
												<button
													type="button"
													onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
													style={{
														display: 'flex',
														alignItems: 'center',
														gap: '6px',
														background: '#dc3545',
														color: '#fff',
														padding: '8px 16px',
														borderRadius: '6px',
														border: 'none',
														fontSize: '14px',
														cursor: 'pointer'
													}}
												>
													<HiX />
													Xóa ảnh
												</button>
											</div>
										</div>
									) : (
										<div>
											<HiPhotograph style={{ fontSize: '48px', color: '#ccc', marginBottom: '12px' }} />
											<p style={{ margin: '0 0 12px', color: '#666' }}>
												Chọn ảnh bìa cho bài viết
											</p>
											<button
												type="button"
												onClick={() => fileInputRef.current?.click()}
												disabled={uploadingImage}
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '8px',
													background: '#667eea',
													color: '#fff',
													padding: '12px 24px',
													borderRadius: '8px',
													border: 'none',
													fontSize: '16px',
													cursor: uploadingImage ? 'not-allowed' : 'pointer',
													margin: '0 auto',
													opacity: uploadingImage ? 0.6 : 1
												}}
											>
												<HiUpload />
												{uploadingImage ? 'Đang upload...' : 'Chọn ảnh'}
											</button>
										</div>
									)}
									<input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										onChange={handleCoverImageUpload}
										style={{ display: 'none' }}
									/>
								</div>

								{/* Published Checkbox */}
								<div style={{
									display: 'flex',
									alignItems: 'center',
									gap: '12px',
									padding: '16px',
									background: '#f8f9fa',
									borderRadius: '8px',
									border: '1px solid #e9ecef'
								}}>
									<input
										type="checkbox"
										name="published"
										checked={formData.published}
										onChange={handleChange}
										style={{
											width: '18px',
											height: '18px',
											accentColor: '#667eea'
										}}
									/>
									<div>
										<label style={{
											fontWeight: '600',
											color: '#333',
											cursor: 'pointer'
										}}>
											Xuất bản ngay
										</label>
										<p style={{
											margin: '4px 0 0',
											fontSize: '14px',
											color: '#666'
										}}>
											Bỏ chọn để lưu bản nháp
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Excerpt */}
						<div style={{ marginBottom: '32px' }}>
							<label style={{
								display: 'block',
								marginBottom: '8px',
								fontWeight: '600',
								color: '#333'
							}}>
								Tóm tắt bài viết *
							</label>
							<textarea
								name="excerpt"
								value={formData.excerpt}
								onChange={handleChange}
								placeholder="Nhập tóm tắt ngắn gọn về nội dung bài viết..."
								rows="3"
								style={{
									width: '100%',
									padding: '12px 16px',
									border: '2px solid #e1e5e9',
									borderRadius: '8px',
									fontSize: '16px',
									resize: 'vertical',
									transition: 'border-color 0.2s'
								}}
								onFocus={(e) => e.target.style.borderColor = '#667eea'}
								onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
							/>
						</div>

						{/* Content Blocks */}
						<div style={{ marginBottom: '32px' }}>
							<div style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '20px'
							}}>
								<label style={{
									fontWeight: '600',
									color: '#333',
									fontSize: '18px'
								}}>
									Nội dung bài viết *
								</label>
								<div style={{ display: 'flex', gap: '12px' }}>
									<button
										type="button"
										onClick={addTextBlock}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											background: '#28a745',
											color: '#fff',
											padding: '10px 16px',
											borderRadius: '8px',
											border: 'none',
											fontSize: '14px',
											fontWeight: '500',
											cursor: 'pointer',
											transition: 'background 0.2s'
										}}
										onMouseEnter={(e) => e.target.style.background = '#218838'}
										onMouseLeave={(e) => e.target.style.background = '#28a745'}
									>
										<HiPlus />
										Thêm văn bản
									</button>
									<button
										type="button"
										onClick={addImageBlock}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											background: '#17a2b8',
											color: '#fff',
											padding: '10px 16px',
											borderRadius: '8px',
											border: 'none',
											fontSize: '14px',
											fontWeight: '500',
											cursor: 'pointer',
											transition: 'background 0.2s'
										}}
										onMouseEnter={(e) => e.target.style.background = '#138496'}
										onMouseLeave={(e) => e.target.style.background = '#17a2b8'}
									>
										<HiPhotograph />
										Thêm ảnh
									</button>
									<button
										type="button"
										onClick={() => setShowPreview(true)}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											background: '#6f42c1',
											color: '#fff',
											padding: '10px 16px',
											borderRadius: '8px',
											border: 'none',
											fontSize: '14px',
											fontWeight: '500',
											cursor: 'pointer',
											transition: 'background 0.2s'
										}}
										onMouseEnter={(e) => e.target.style.background = '#5a32a3'}
										onMouseLeave={(e) => e.target.style.background = '#6f42c1'}
									>
										<HiEye />
										Preview
									</button>
								</div>
							</div>

						{/* Blocks Container */}
						<div onClick={(e) => e.stopPropagation()}>
							<DragDropContext 
								onDragStart={onDragStart}
								onDragUpdate={onDragUpdate}
								onDragEnd={onDragEnd}
							>
								<Droppable droppableId="blocks" isDropDisabled={false}>
									{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{
											minHeight: '200px',
											background: '#f8f9fa',
											border: '2px dashed #e1e5e9',
											borderRadius: '8px',
											padding: '16px'
										}}
									>
											{formData.blocks.length > 0 ? (
												formData.blocks
													.sort((a, b) => a.order - b.order)
													.map((block, index) => (
														<Draggable key={block.id} draggableId={block.id} index={index}>
															{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															style={{
																...provided.draggableProps.style,
																marginBottom: '16px',
																opacity: snapshot.isDragging ? 0.8 : 1
															}}
														>
																	{block.type === 'text' ? (
																		<TextBlock
																			block={block}
																			onUpdate={updateTextBlock}
																			onRemove={removeBlock}
																			onMoveUp={moveBlockUp}
																			onMoveDown={moveBlockDown}
																			index={index}
																			canMoveUp={index > 0}
																			canMoveDown={index < formData.blocks.length - 1}
																			dragHandleProps={provided.dragHandleProps}
																		/>
																	) : (
																		<ImageBlock
																			block={block}
																			onUpdate={updateImageBlock}
																			onRemove={removeBlock}
																			onMoveUp={moveBlockUp}
																			onMoveDown={moveBlockDown}
																			index={index}
																			canMoveUp={index > 0}
																			canMoveDown={index < formData.blocks.length - 1}
																			onImageUpload={fileToBase64}
																			dragHandleProps={provided.dragHandleProps}
																		/>
																	)}
																</div>
															)}
														</Draggable>
													))
											) : (
												<div style={{
													textAlign: 'center',
													padding: '40px',
													color: '#999',
													fontStyle: 'italic'
												}}>
													<p style={{ margin: '0 0 16px' }}>Chưa có nội dung nào</p>
													<p style={{ margin: 0, fontSize: '14px' }}>
														Click "Thêm văn bản" hoặc "Thêm ảnh" để bắt đầu
													</p>
												</div>
											)}
											{provided.placeholder}
										</div>
									)}
							</Droppable>
						</DragDropContext>
						</div>
					</div>

						{/* Action Buttons */}
						<div style={{
							display: 'flex',
							gap: '16px',
							justifyContent: 'flex-end'
						}}>
							<button
								type="button"
								onClick={handleCancel}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									background: '#6c757d',
									color: '#fff',
									padding: '12px 24px',
									borderRadius: '8px',
									border: 'none',
									fontSize: '16px',
									fontWeight: '500',
									cursor: 'pointer',
									transition: 'background 0.2s'
								}}
								onMouseEnter={(e) => e.target.style.background = '#5a6268'}
								onMouseLeave={(e) => e.target.style.background = '#6c757d'}
							>
								<HiX />
								Hủy
							</button>
							<button
								type="submit"
								disabled={loading}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									background: loading ? '#ccc' : '#667eea',
									color: '#fff',
									padding: '12px 24px',
									borderRadius: '8px',
									border: 'none',
									fontSize: '16px',
									fontWeight: '500',
									cursor: loading ? 'not-allowed' : 'pointer',
									transition: 'background 0.2s'
								}}
								onMouseEnter={(e) => {
									if (!loading) e.target.style.background = '#5a6fd8'
								}}
								onMouseLeave={(e) => {
									if (!loading) e.target.style.background = '#667eea'
								}}
							>
								<HiSave />
								{loading ? 'Đang cập nhật...' : 'Cập nhật bài viết'}
							</button>
					</div>
				</form>

				{/* Preview Modal */}
				{showPreview && (
					<NewsPreview
						formData={formData}
						onClose={() => setShowPreview(false)}
					/>
				)}
			</div>
		</AdminLayout>
	)
}

export default AdminNewsEditPage