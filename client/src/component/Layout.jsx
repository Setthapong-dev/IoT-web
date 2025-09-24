import React from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
