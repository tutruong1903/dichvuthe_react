import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

function ProtectedRoute({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuth = async () => {
			if (!authService.isAuthenticated()) {
				navigate('/auth/login')
				return
			}

			try {
				await authService.getMe()
				setIsAuthenticated(true)
			} catch (error) {
				authService.logout()
				navigate('/auth/login')
			} finally {
				setLoading(false)
			}
		}

		checkAuth()
	}, [navigate])

	if (loading) {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				background: '#f8f9fa'
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
						borderTop: '4px solid var(--primary)',
						borderRadius: '50%',
						animation: 'spin 1s linear infinite',
						margin: '0 auto 20px'
					}}></div>
					<p style={{margin: 0, color: 'var(--text-light)'}}>Đang xác thực...</p>
				</div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return null
	}

	return children
}

export default ProtectedRoute
