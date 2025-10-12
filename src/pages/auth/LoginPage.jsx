import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

function LoginPage() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			await authService.login(formData.email, formData.password)
			navigate('/admin')
		} catch (err) {
			setError(err.response?.data?.message || 'Có lỗi xảy ra khi đăng nhập')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={{
			minHeight: '100vh',
			background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '20px'
		}}>
			<div style={{
				background: '#fff',
				borderRadius: '20px',
				boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
				padding: '40px',
				width: '100%',
				maxWidth: '400px',
				position: 'relative'
			}}>
				{/* Header */}
				<div style={{textAlign: 'center', marginBottom: '30px'}}>
					<h2 style={{
						fontSize: '28px',
						fontWeight: 'bold',
						color: '#333',
						margin: '0 0 8px',
						position: 'relative'
					}}>
						Đăng nhập
						<div style={{
							width: '50px',
							height: '3px',
							background: 'var(--primary-color)',
							margin: '8px auto 0',
							borderRadius: '2px'
						}}></div>
					</h2>
				</div>

				{/* Error message */}
				{error && (
					<div style={{
						background: '#fee',
						color: '#c33',
						padding: '12px',
						borderRadius: '8px',
						marginBottom: '20px',
						fontSize: '14px',
						textAlign: 'center'
					}}>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					{/* Email field */}
					<div style={{marginBottom: '20px'}}>
						<div style={{
							display: 'flex',
							alignItems: 'center',
							borderBottom: '2px solid #e0e0e0',
							paddingBottom: '8px',
							transition: 'border-color 0.3s'
						}} className="auth-form-input">
							<span style={{color: '#666', marginRight: '12px', fontSize: '18px'}}>📧</span>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Nhập email của bạn"
								required
								style={{
									border: 'none',
									outline: 'none',
									flex: 1,
									fontSize: '16px',
									background: 'transparent',
									color: '#333'
								}}
							/>
						</div>
					</div>

					{/* Password field */}
					<div style={{marginBottom: '20px'}}>
						<div style={{
							display: 'flex',
							alignItems: 'center',
							borderBottom: '2px solid #e0e0e0',
							paddingBottom: '8px',
							transition: 'border-color 0.3s'
						}}>
							<span style={{color: '#666', marginRight: '12px', fontSize: '18px'}}>🔒</span>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Nhập mật khẩu"
								required
								style={{
									border: 'none',
									outline: 'none',
									flex: 1,
									fontSize: '16px',
									background: 'transparent',
									color: '#333'
								}}
							/>
							<span style={{color: '#666', cursor: 'pointer', fontSize: '18px'}}>👁️</span>
						</div>
					</div>

					{/* Remember me and forgot password */}
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '30px',
						fontSize: '14px'
					}}>
						<label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
							<input type="checkbox" style={{marginRight: '8px'}} />
							Ghi nhớ đăng nhập
						</label>
						<a href="#" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>
							Quên mật khẩu?
						</a>
					</div>

					{/* Submit button */}
					<button
						type="submit"
						disabled={loading}
						className="auth-form-button"
						style={{
							width: '100%',
							background: 'var(--primary-color)',
							color: '#fff',
							border: 'none',
							padding: '16px',
							borderRadius: '12px',
							fontSize: '16px',
							fontWeight: '600',
							cursor: loading ? 'not-allowed' : 'pointer',
							transition: 'all 0.3s',
							marginBottom: '20px'
						}}
					>
						{loading ? 'Đang đăng nhập...' : 'Đăng nhập ngay'}
					</button>

					{/* Sign up link */}
					<div style={{textAlign: 'center'}}>
						<span style={{color: '#666', fontSize: '14px'}}>
							Chưa có tài khoản? 
						</span>
						<a href="/auth/register" style={{
							color: 'var(--primary-color)',
							textDecoration: 'none',
							fontWeight: '600',
							marginLeft: '4px'
						}}>
							Đăng ký ngay
						</a>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
