import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

// สร้าง Context
const DroneContext = createContext()

// Custom Hook สำหรับใช้ Context
export const useDrone = () => {
  const context = useContext(DroneContext)
  if (!context) {
    throw new Error('useDrone ต้องใช้ภายใน DroneProvider')
  }
  return context
}

// Provider Component
export const DroneProvider = ({ children }) => {
  const [droneData, setDroneData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ฟังก์ชันสำหรับดึงข้อมูล drone
  const fetchDroneData = async (droneId = '66011495') => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`http://localhost:3000/configs/${droneId}`)
      setDroneData(response.data)
      return response.data
    } catch (err) {
      console.error('Error fetching drone data:', err)
      if (err.response) {
        setError(`Server Error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`)
      } else if (err.request) {
        setError('ไม่สามารถเชื่อมต่อกับ server ได้ กรุณาตรวจสอบว่า server กำลังทำงานอยู่')
      } else {
        setError(`เกิดข้อผิดพลาด: ${err.message}`)
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  // ฟังก์ชันสำหรับรีเฟรชข้อมูล
  const refreshDroneData = () => {
    if (droneData?.drone_id) {
      return fetchDroneData(droneData.drone_id)
    }
    return fetchDroneData()
  }

  // ฟังก์ชันสำหรับล้างข้อมูล
  const clearDroneData = () => {
    setDroneData(null)
    setError(null)
  }

  // ฟังก์ชันสำหรับอัปเดตข้อมูล drone
  const updateDroneData = (newData) => {
    setDroneData(prev => ({
      ...prev,
      ...newData
    }))
  }

  // ดึงข้อมูลเมื่อ component mount
  useEffect(() => {
    fetchDroneData()
  }, [])

  const value = {
    droneData,
    loading,
    error,
    fetchDroneData,
    refreshDroneData,
    clearDroneData,
    updateDroneData
  }

  return (
    <DroneContext.Provider value={value}>
      {children}
    </DroneContext.Provider>
  )
}
