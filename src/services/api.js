import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000, // 60 seconds for large base64 uploads
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('REQUEST_ERROR', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('RESPONSE', response.config.method?.toUpperCase(), {
      url: response.config.url,
      status: response.status,
      data: response.data
    })
    
    return response
  },
  (error) => {
    console.error('RESPONSE_ERROR', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    })
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      console.error('TOKEN_EXPIRED')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth/login'
    }
    
    return Promise.reject(error)
  }
)

export default api
