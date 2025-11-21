import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css' // Import all styles
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'
import AdminPage from './pages/admin/AdminPage.jsx'
import AdminNewsPage from './pages/admin/AdminNewsPage.jsx'
import AdminNewsEditPage from './pages/admin/AdminNewsEditPage.jsx'
import AdminNewsCreatePage from './pages/admin/AdminNewsCreatePage.jsx'
import AdminConsultationPage from './pages/admin/AdminConsultationPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import TestPage from './pages/TestPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 've-chung-toi', element: <AboutPage /> },
      { path: 'dich-vu', element: <ServicesPage /> },
      { path: 'tin-tuc', element: <NewsPage /> },
      { path: 'tin-tuc/:slug', element: <NewsDetailPage /> },
      { path: 'lien-he', element: <ContactPage /> },
    ],
  },
  // Test route
  { path: 'test', element: <TestPage /> },
  // Auth routes outside of App component (no header/footer)
  { path: 'auth/login', element: <LoginPage /> },
  { path: 'auth/register', element: <RegisterPage /> },
  // Admin routes outside of App component (use AdminLayout)
  { 
    path: 'admin', 
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ) 
  },
  { 
    path: 'admin/news', 
    element: (
      <ProtectedRoute>
        <AdminNewsPage />
      </ProtectedRoute>
    ) 
  },
  { 
    path: 'admin/news/new', 
    element: (
      <ProtectedRoute>
        <AdminNewsCreatePage />
      </ProtectedRoute>
    ) 
  },
  { 
    path: 'admin/news/:id', 
    element: (
      <ProtectedRoute>
        <AdminNewsEditPage />
      </ProtectedRoute>
    ) 
  },
  { 
    path: 'admin/consultation', 
    element: (
      <ProtectedRoute>
        <AdminConsultationPage />
      </ProtectedRoute>
    ) 
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
