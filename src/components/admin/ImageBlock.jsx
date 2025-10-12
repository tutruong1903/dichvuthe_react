import { useState, useRef } from 'react'
import { HiTrash, HiArrowUp, HiArrowDown, HiUpload, HiPhotograph, HiMenu } from 'react-icons/hi'

const ImageBlock = ({ block, onUpdate, onRemove, onMoveUp, onMoveDown, index, canMoveUp, canMoveDown, onImageUpload, dragHandleProps }) => {
	const [uploading, setUploading] = useState(false)
	const fileInputRef = useRef(null)

	const handleImageUpload = async (e) => {
		const file = e.target.files[0]
		if (!file) return

		// Validate file type
		if (!file.type.startsWith('image/')) {
			alert('Vui lòng chọn file ảnh hợp lệ')
			return
		}

		// Validate file size (max 10MB)
		if (file.size > 10 * 1024 * 1024) {
			alert('Kích thước ảnh không được vượt quá 10MB')
			return
		}

		setUploading(true)
		try {
			const base64 = await onImageUpload(file)
			onUpdate(block.id, { url: base64 })
		} catch (error) {
			alert('Có lỗi xảy ra khi upload ảnh: ' + error.message)
		} finally {
			setUploading(false)
		}
	}

	const handleFieldChange = (field, value) => {
		onUpdate(block.id, { [field]: value })
	}

	return (
		<div style={{
			border: '2px solid #e1e5e9',
			borderRadius: '8px',
			padding: '16px',
			marginBottom: '16px',
			background: '#fff',
			position: 'relative'
		}}>
			{/* Drag Handle */}
			<div 
				{...dragHandleProps}
				style={{
					position: 'absolute',
					top: '8px',
					left: '8px',
					padding: '4px',
					background: '#667eea',
					color: '#fff',
					borderRadius: '4px',
					cursor: 'grab',
					zIndex: 10,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<HiMenu size={16} />
			</div>

			{/* Block Controls */}
			<div style={{
				position: 'absolute',
				top: '8px',
				right: '8px',
				display: 'flex',
				gap: '4px',
				zIndex: 10
			}}>
				<button
					type="button"
					onClick={() => onMoveUp(index)}
					disabled={!canMoveUp}
					style={{
						padding: '4px',
						border: 'none',
						background: canMoveUp ? '#667eea' : '#ccc',
						color: '#fff',
						borderRadius: '4px',
						cursor: canMoveUp ? 'pointer' : 'not-allowed'
					}}
				>
					<HiArrowUp size={16} />
				</button>
				<button
					type="button"
					onClick={() => onMoveDown(index)}
					disabled={!canMoveDown}
					style={{
						padding: '4px',
						border: 'none',
						background: canMoveDown ? '#667eea' : '#ccc',
						color: '#fff',
						borderRadius: '4px',
						cursor: canMoveDown ? 'pointer' : 'not-allowed'
					}}
				>
					<HiArrowDown size={16} />
				</button>
				<button
					type="button"
					onClick={() => onRemove(block.id)}
					style={{
						padding: '4px',
						border: 'none',
						background: '#e74c3c',
						color: '#fff',
						borderRadius: '4px',
						cursor: 'pointer'
					}}
				>
					<HiTrash size={16} />
				</button>
			</div>

			{/* Image Upload/Display */}
			<div style={{ marginBottom: '16px' }}>
				<label style={{
					display: 'block',
					marginBottom: '8px',
					fontWeight: '600',
					color: '#333'
				}}>
					Ảnh
				</label>
				
				{block.image?.url ? (
					<div>
						<img 
							src={block.image.url} 
							alt={block.image.alt || 'Uploaded image'} 
							style={{
								maxWidth: '100%',
								maxHeight: '300px',
								borderRadius: '8px',
								marginBottom: '12px',
								objectFit: 'contain'
							}}
						/>
						<div style={{ display: 'flex', gap: '8px' }}>
							<button
								onClick={() => {
									if (fileInputRef && fileInputRef.current) {
										fileInputRef.current.click()
									}
								}}
								disabled={uploading}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '6px',
									background: '#667eea',
									color: '#fff',
									padding: '8px 16px',
									borderRadius: '6px',
									border: 'none',
									cursor: uploading ? 'not-allowed' : 'pointer',
									opacity: uploading ? 0.6 : 1
								}}
							>
								<HiUpload />
								{uploading ? 'Đang upload...' : 'Thay đổi ảnh'}
							</button>
							<button
								onClick={() => onUpdate(block.id, { url: '', alt: '', caption: '' })}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '6px',
									background: '#e74c3c',
									color: '#fff',
									padding: '8px 16px',
									borderRadius: '6px',
									border: 'none',
									cursor: 'pointer'
								}}
							>
								<HiTrash />
								Xóa ảnh
							</button>
						</div>
					</div>
				) : (
					<div style={{
						border: '2px dashed #e1e5e9',
						borderRadius: '8px',
						padding: '40px',
						textAlign: 'center',
						background: '#f8f9fa',
						cursor: 'pointer'
					}}
					onClick={(e) => {
						e.stopPropagation()
						if (fileInputRef && fileInputRef.current) {
							fileInputRef.current.click()
						}
					}}
					>
						<HiPhotograph style={{ fontSize: '48px', color: '#ccc', marginBottom: '12px' }} />
						<p style={{ margin: '0 0 12px', color: '#666' }}>
							{uploading ? 'Đang upload ảnh...' : 'Click để chọn ảnh'}
						</p>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation()
								if (fileInputRef && fileInputRef.current) {
									fileInputRef.current.click()
								}
							}}
							disabled={uploading}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								background: '#667eea',
								color: '#fff',
								padding: '12px 24px',
								borderRadius: '8px',
								border: 'none',
								cursor: uploading ? 'not-allowed' : 'pointer',
								margin: '0 auto',
								opacity: uploading ? 0.6 : 1
							}}
						>
							<HiUpload />
							{uploading ? 'Đang upload...' : 'Chọn ảnh'}
						</button>
					</div>
				)}
				
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					style={{ display: 'none' }}
				/>
			</div>

			{/* Image Details */}
			<div style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '16px',
				marginBottom: '16px'
			}}>
				<div>
					<label style={{
						display: 'block',
						marginBottom: '8px',
						fontWeight: '600',
						color: '#333'
					}}>
						Alt Text *
					</label>
					<input
						type="text"
						value={block.image?.alt || ''}
						onChange={(e) => handleFieldChange('alt', e.target.value)}
						placeholder="Mô tả ảnh cho accessibility..."
						style={{
							width: '100%',
							padding: '12px',
							border: '1px solid #ddd',
							borderRadius: '6px',
							fontSize: '16px'
						}}
					/>
				</div>
				<div>
					<label style={{
						display: 'block',
						marginBottom: '8px',
						fontWeight: '600',
						color: '#333'
					}}>
						Caption
					</label>
					<input
						type="text"
						value={block.image?.caption || ''}
						onChange={(e) => handleFieldChange('caption', e.target.value)}
						placeholder="Chú thích ảnh (tùy chọn)..."
						style={{
							width: '100%',
							padding: '12px',
							border: '1px solid #ddd',
							borderRadius: '6px',
							fontSize: '16px'
						}}
					/>
				</div>
			</div>

		</div>
	)
}

export default ImageBlock
