import React, { useState } from 'react'
import { useDrone } from '../context/DroneContext.jsx'
import { Thermometer } from 'lucide-react'
import axios from 'axios'

const TemperatureLogForm = () => {
  const { droneData, loading, error } = useDrone()
  const [temperature, setTemperature] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // เช็คข้อมูล drone ก่อน
    if (!droneData) {
      setSubmitMessage('ไม่พบข้อมูล drone กรุณารีเฟรชหน้า')
      return
    }
    
    // เช็คข้อมูล drone แต่ละฟิลด์
    if (!droneData.drone_id) {
      setSubmitMessage('ไม่พบ Drone ID')
      return
    }
    
    if (!droneData.drone_name) {
      setSubmitMessage('ไม่พบ Drone Name')
      return
    }
    
    if (!droneData.country) {
      setSubmitMessage('ไม่พบ Country')
      return
    }
    
    // เช็คอุณหภูมิ
    if (!temperature || temperature.trim() === '') {
      setSubmitMessage('กรุณากรอกอุณหภูมิ')
      return
    }
    
    const tempValue = parseFloat(temperature)
    if (isNaN(tempValue)) {
      setSubmitMessage('กรุณากรอกอุณหภูมิเป็นตัวเลข')
      return
    }
    
    if (tempValue < -50 || tempValue > 100) {
      setSubmitMessage('กรุณากรอกอุณหภูมิระหว่าง -50 ถึง 100 องศาเซลเซียส')
      return
    }

    try {
      setSubmitting(true)
      setSubmitMessage('')

      const logData = {
        drone_id: droneData.drone_id,
        drone_name: droneData.drone_name,
        country: droneData.country,
        celsius: tempValue
      }

      console.log('Sending log data:', logData)
      console.log('Drone data check:', {
        drone_id: !!droneData.drone_id,
        drone_name: !!droneData.drone_name,
        country: !!droneData.country,
        celsius: !isNaN(tempValue)
      })

      const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'
      const response = await axios.post(`${serverUrl}/logs`, logData)
      
      console.log('Server response:', response.data)
      
      setSubmitMessage('บันทึกข้อมูลอุณหภูมิสำเร็จ!')
      setTemperature('') // ล้างฟิลด์
      
    } catch (error) {
      console.error('Error submitting temperature log:', error)
      
      if (error.response) {
        setSubmitMessage(`เกิดข้อผิดพลาด: ${error.response.data.error || 'ไม่สามารถบันทึกข้อมูลได้'}`)
      } else if (error.request) {
        setSubmitMessage('ไม่สามารถเชื่อมต่อกับ server ได้')
      } else {
        setSubmitMessage('เกิดข้อผิดพลาดที่ไม่คาดคิด')
      }
    } finally {
      setSubmitting(false)
    }
  }

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
            <Thermometer className="w-10 h-10 text-white" />
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  อุณหภูมิ (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                  placeholder="กรุณาใส่อุณหภูมิ"
                  required
                />
              </div>
              
              {submitMessage && (
                <div className={`p-4 rounded-xl text-center ${
                  submitMessage.includes('สำเร็จ') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <button
                type="submit"
                disabled={submitting || !temperature}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูลอุณหภูมิ'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemperatureLogForm
