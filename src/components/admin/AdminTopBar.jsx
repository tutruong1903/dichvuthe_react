import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HiMenu, HiUser, HiHome, HiNewspaper, HiPhone } from 'react-icons/hi'

function AdminTopBar({ isCollapsed, toggleCollapse, darkMode }) {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Menu items mapping
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: HiHome },
    { path: '/admin/news', label: 'Tin tức', icon: HiNewspaper },
    { path: '/admin/consultation', label: 'Yêu cầu tư vấn', icon: HiPhone }
  ]

  // Get current active menu item
  const getCurrentMenuItem = () => {
    // Check for exact match first
    const exactMatch = menuItems.find(item => location.pathname === item.path)
    if (exactMatch) return exactMatch
    
    // Check for prefix match (for sub-routes like /admin/news/edit)
    const prefixMatch = menuItems.find(item => 
      item.path !== '/admin' && location.pathname.startsWith(item.path)
    )
    if (prefixMatch) return prefixMatch
    
    // Default to dashboard
    return menuItems[0]
  }

  const currentMenuItem = getCurrentMenuItem()

  return (
    <header style={{
      height: '70px',
      background: darkMode ? '#1a1a1a' : '#fff',
      borderBottom: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'fixed',
      top: 0,
      left: isCollapsed ? '80px' : '280px',
      right: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'left 0.3s ease'
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={toggleCollapse}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: darkMode ? '#fff' : '#333',
            padding: '8px',
            borderRadius: '4px',
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.target.style.background = darkMode ? '#333' : '#f0f0f0'}
          onMouseLeave={(e) => e.target.style.background = 'none'}
        >
          <HiMenu />
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: darkMode ? '#fff' : '#333'
        }}>
          <currentMenuItem.icon style={{ fontSize: '20px', color: '#667eea' }} />
          <h1 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {currentMenuItem.label}
          </h1>
        </div>
      </div>

      {/* Right side - User Profile */}
      <div style={{
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
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <HiUser style={{ fontSize: '20px' }} />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: darkMode ? '#fff' : '#333'
          }}>
            {user.username || 'Admin'}
          </span>
          <span style={{
            fontSize: '12px',
            color: darkMode ? '#999' : '#666'
          }}>
            Quản trị viên
          </span>
        </div>
      </div>
    </header>
  )
}

export default AdminTopBar
