import { Outlet } from 'react-router-dom'
import Header from './components/landing/Header.jsx'
import Footer from './components/landing/Footer.jsx'
import FloatingContact from './components/landing/FloatingContact.jsx'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <FloatingContact />
    </>
  )
}

export default App
