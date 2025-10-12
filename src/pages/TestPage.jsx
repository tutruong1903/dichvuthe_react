import React from 'react'

function TestPage() {
  return (
    <div style={{
      padding: '20px',
      background: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          Test Page - React đang hoạt động!
        </h1>
        <p style={{ color: '#666' }}>
          Nếu bạn thấy trang này, React đã load thành công.
        </p>
        <div style={{
          marginTop: '20px',
          padding: '10px',
          background: '#e8f5e8',
          borderRadius: '4px',
          color: '#2d5a2d'
        }}>
          ✅ React hoạt động bình thường
        </div>
      </div>
    </div>
  )
}

export default TestPage
