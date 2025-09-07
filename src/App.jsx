import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import FloatingContact from './components/FloatingContact.jsx'

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
