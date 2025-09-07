import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'

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
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
