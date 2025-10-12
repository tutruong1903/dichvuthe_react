import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  HiHome, 
  HiNewspaper, 
  HiMoon, 
  HiLogout,
  HiMenu,
  HiPhone
} from 'react-icons/hi'

function AdminSidebar({ isCollapsed, toggleCollapse, darkMode, toggleDarkMode }) {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HiHome, path: '/admin' },
    { id: 'news', label: 'Tin tức', icon: HiNewspaper, path: '/admin/news' },
    { id: 'consultation', label: 'Yêu cầu tư vấn', icon: HiPhone, path: '/admin/consultation' }
  ]

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside style={{
      width: isCollapsed ? '80px' : '280px',
      height: '100vh',
      background: darkMode ? '#1a1a1a' : '#fff',
      borderRight: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          DT
        </div>
        {!isCollapsed && (
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
              color: darkMode ? '#fff' : '#333'
            }}>
              DichVuThe
            </h2>
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: darkMode ? '#999' : '#666'
            }}>
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav style={{
        flex: 1,
        padding: '20px 0',
        overflowY: 'auto'
      }}>
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              cursor: 'pointer',
              background: isActive(item.path) ? (darkMode ? '#333' : '#f0f8ff') : 'transparent',
              borderRight: isActive(item.path) ? '3px solid #667eea' : '3px solid transparent',
              transition: 'all 0.2s ease',
              color: isActive(item.path) ? '#667eea' : (darkMode ? '#fff' : '#333')
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.target.style.background = darkMode ? '#333' : '#f8f9fa'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.target.style.background = 'transparent'
              }
            }}
          >
            <item.icon style={{ 
              fontSize: '18px', 
              marginRight: isCollapsed ? '0' : '12px',
              minWidth: '18px'
            }} />
            {!isCollapsed && (
              <span style={{
                fontSize: '14px',
                fontWeight: isActive(item.path) ? '600' : '400'
              }}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '20px',
        borderTop: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Dark Mode Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <HiMoon style={{ fontSize: '16px' }} />
            {!isCollapsed && (
              <span style={{
                fontSize: '14px',
                color: darkMode ? '#fff' : '#333'
              }}>
                Dark Mode
              </span>
            )}
          </div>
          <label style={{
            position: 'relative',
            display: 'inline-block',
            width: '44px',
            height: '24px'
          }}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: darkMode ? '#667eea' : '#ccc',
              borderRadius: '24px',
              transition: '0.3s'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '18px',
                width: '18px',
                left: darkMode ? '22px' : '3px',
                bottom: '3px',
                background: '#fff',
                borderRadius: '50%',
                transition: '0.3s'
              }}></span>
            </span>
          </label>
        </div>

        {/* Logout */}
        <div
          onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/auth/login')
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 0',
            cursor: 'pointer',
            color: darkMode ? '#fff' : '#333',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#e74c3c'}
          onMouseLeave={(e) => e.target.style.color = darkMode ? '#fff' : '#333'}
        >
          <HiLogout style={{ fontSize: '16px' }} />
          {!isCollapsed && (
            <span style={{ fontSize: '14px' }}>Đăng xuất</span>
          )}
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
