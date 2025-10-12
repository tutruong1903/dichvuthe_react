import api from './api'

class AuthService {
  async login(email, password) {
    try {
      
    
      const response = await api.post('/auth/login', {
        email,
        password
      })
      
      const { data } = response.data
      
      // Store token and user data
      localStorage.setItem('token', data?.accessToken || data?.token)
      localStorage.setItem('user', JSON.stringify(data || data?.user))
      
      return response.data
    } catch (error) {
      throw error
    }
  }

  async register(username, email, password) {
    try { 
      
      const response = await api.post('/auth/register', {
        username,
        email,
        password
      })
      
      const { data } = response.data
      
     
      
      // Store token and user data
      localStorage.setItem('token', data?.accessToken || data?.token)
      localStorage.setItem('user', JSON.stringify(data || data?.user))
      
      return response.data
    } catch (error) {
     
      throw error
    }
  }

  async getMe() {
    try {
    
      
      const response = await api.get('/user/me')
      
    
      
      return response.data
    } catch (error) {
      throw error
    }
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  isAuthenticated() {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
