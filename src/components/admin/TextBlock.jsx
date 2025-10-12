import { useState } from 'react'
import { HiTrash, HiArrowUp, HiArrowDown, HiMenu } from 'react-icons/hi'

const TextBlock = ({ block, onUpdate, onRemove, onMoveUp, onMoveDown, index, canMoveUp, canMoveDown, dragHandleProps }) => {
	const [isEditing, setIsEditing] = useState(false)

	const handleTextChange = (e) => {
		onUpdate(block.id, { content: e.target.value })
	}

	const handleStyleChange = (property, value) => {
		onUpdate(block.id, { [property]: value })
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

			{/* Text Editor */}
			<div style={{ marginBottom: '16px' }}>
				<label style={{
					display: 'block',
					marginBottom: '8px',
					fontWeight: '600',
					color: '#333'
				}}>
					Nội dung văn bản
				</label>
				<textarea
					value={block.text?.content || ''}
					onChange={handleTextChange}
					placeholder="Nhập nội dung văn bản..."
					rows="4"
					style={{
						width: '100%',
						padding: '12px',
						border: '1px solid #ddd',
						borderRadius: '6px',
						fontSize: '16px',
						resize: 'vertical'
					}}
				/>
			</div>

			{/* Style Controls */}
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
				gap: '12px',
				marginBottom: '16px'
			}}>
				<div>
					<label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
						Font Size
					</label>
					<select
						value={block.text?.fontSize || 16}
						onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #ddd',
							borderRadius: '4px'
						}}
					>
						<option value={12}>12px</option>
						<option value={14}>14px</option>
						<option value={16}>16px</option>
						<option value={18}>18px</option>
						<option value={20}>20px</option>
						<option value={24}>24px</option>
						<option value={28}>28px</option>
						<option value={32}>32px</option>
					</select>
				</div>

				<div>
					<label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
						Font Weight
					</label>
					<select
						value={block.text?.fontWeight || 'normal'}
						onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #ddd',
							borderRadius: '4px'
						}}
					>
						<option value="normal">Normal</option>
						<option value="bold">Bold</option>
						<option value="lighter">Lighter</option>
					</select>
				</div>

				<div>
					<label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
						Text Align
					</label>
					<select
						value={block.text?.textAlign || 'left'}
						onChange={(e) => handleStyleChange('textAlign', e.target.value)}
						style={{
							width: '100%',
							padding: '8px',
							border: '1px solid #ddd',
							borderRadius: '4px'
						}}
					>
						<option value="left">Left</option>
						<option value="center">Center</option>
						<option value="right">Right</option>
						<option value="justify">Justify</option>
					</select>
				</div>

				<div>
					<label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
						Color
					</label>
					<input
						type="color"
						value={block.text?.color || '#000000'}
						onChange={(e) => handleStyleChange('color', e.target.value)}
						style={{
							width: '100%',
							height: '40px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					/>
				</div>
			</div>

		</div>
	)
}

export default TextBlock
