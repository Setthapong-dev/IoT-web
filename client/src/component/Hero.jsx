import React from 'react'
import { Link } from 'react-router-dom'
import { Settings, Thermometer, BarChart3 } from 'lucide-react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 flex-1 flex items-center justify-center py-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Title */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            IoT Web Development
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            โปรเจคฝึกเขียน frontend และ backend ของวิชา Web Application Development
          </p>
          
          {/* Three Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* View Config Button */}
            <Link
              to="/View-Config"
              className="group flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              <Settings className="h-5 w-5" />
              View Config
            </Link>

            {/* Temperature Log Form Button */}
            <Link
              to="/Tempereature-Log-Form"
              className="group flex items-center gap-3 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200 transform hover:scale-105"
            >
              <Thermometer className="h-5 w-5" />
              Temperature Log Form
            </Link>

            {/* View Logs Button */}
            <Link
              to="/View-Logs"
              className="group flex items-center gap-3 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              <BarChart3 className="h-5 w-5" />
              View Logs
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">View Config</h3>
              <p className="mt-2 text-sm text-gray-600">
                ดูและจัดการการตั้งค่าระบบ
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Thermometer className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Temperature Log Form</h3>
              <p className="mt-2 text-sm text-gray-600">
                บันทึกข้อมูลอุณหภูมิและข้อมูลอุปกรณ์
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">View Logs</h3>
              <p className="mt-2 text-sm text-gray-600">
                ดูและวิเคราะห์ข้อมูลที่บันทึกไว้
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero