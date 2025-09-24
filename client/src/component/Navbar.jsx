import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="w-full border-b navbar-glass">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
            <Home className="h-4 w-4" />
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-lg font-extrabold text-transparent">
            KMITL Web Dev
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            หน้าแรก
          </Link>
          <Link 
            to="/View-Config" 
            className={`text-sm font-medium transition-colors ${isActive('/View-Config') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            การตั้งค่า
          </Link>
          <Link 
            to="/Tempereature-Log-Form" 
            className={`text-sm font-medium transition-colors ${isActive('/Tempereature-Log-Form') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            บันทึกอุณหภูมิ
          </Link>
          <Link 
            to="/View-Logs" 
            className={`text-sm font-medium transition-colors ${isActive('/View-Logs') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            ดูข้อมูล
          </Link>
        </div>

        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setIsOpen(v => !v)}>
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {isOpen && (
        <div className="mx-auto block max-w-7xl px-4 pb-4 md:hidden">
          <div className="space-y-1 rounded-lg border bg-white p-3 shadow-sm">
            <Link 
              to="/" 
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              onClick={() => setIsOpen(false)}
            >
              หน้าแรก
            </Link>
            <Link 
              to="/View-Config" 
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive('/View-Config') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              onClick={() => setIsOpen(false)}
            >
              การตั้งค่า
            </Link>
            <Link 
              to="/Tempereature-Log-Form" 
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive('/Tempereature-Log-Form') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              onClick={() => setIsOpen(false)}
            >
              บันทึกอุณหภูมิ
            </Link>
            <Link 
              to="/View-Logs" 
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive('/View-Logs') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              onClick={() => setIsOpen(false)}
            >
              ดูข้อมูล
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar


