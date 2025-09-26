import React from 'react'
import { useDrone } from '../context/DroneContext.jsx'

const TemperatureLogForm = () => {
  const { droneData, loading, error } = useDrone()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">กำลังโหลดข้อมูล</h1>
          <p className="text-gray-600">กรุณารอสักครู่...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">เกิดข้อผิดพลาด</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Temperature Log Form</h1>
          <p className="text-gray-600">บันทึกข้อมูลอุณหภูมิ</p>
        </div>

        {droneData && (
          <div className="space-y-6">
            {/* แสดงข้อมูล Drone ปัจจุบัน */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">ข้อมูล Drone ปัจจุบัน</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">ID:</span>
                  <span className="ml-2 font-semibold text-blue-600">{droneData.drone_id}</span>
                </div>
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-semibold text-blue-600">{droneData.drone_name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Country:</span>
                  <span className="ml-2 font-semibold text-blue-600">{droneData.country}</span>
                </div>
                <div>
                  <span className="text-gray-600">Light:</span>
                  <span className={`ml-2 font-semibold px-2 py-1 rounded-full text-xs ${
                    droneData.light === 'on' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {droneData.light === 'on' ? 'เปิด' : 'ปิด'}
                  </span>
                </div>
              </div>
            </div>

            {/* ฟอร์มบันทึกอุณหภูมิ */}
            <form className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  อุณหภูมิ (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                  placeholder="กรุณาใส่อุณหภูมิ"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                บันทึกข้อมูลอุณหภูมิ
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemperatureLogForm
