import { useState, cloneElement } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopBar from './AdminTopBar'

function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Inject darkMode prop into children
  const childrenWithProps = children && typeof children === 'object' 
    ? cloneElement(children, { darkMode })
    : children

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: darkMode ? '#0f0f0f' : '#f8f9fa'
    }}>
      <AdminSidebar 
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div style={{
        flex: 1,
        marginLeft: isCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AdminTopBar 
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          darkMode={darkMode}
        />
        
        <main style={{
          flex: 1,
          padding: '24px',
          paddingTop: '94px', // Add top padding for fixed topbar
          background: darkMode ? '#0f0f0f' : '#f8f9fa'
        }}>
          {childrenWithProps}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
