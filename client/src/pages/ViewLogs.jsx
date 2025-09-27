import React, { useState, useEffect } from 'react'
import { useDrone } from '../context/DroneContext.jsx'
import { BarChart3, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

const ViewLogs = () => {
  const { droneData, loading, error } = useDrone()
  const [logs, setLogs] = useState([])
  const [logsLoading, setLogsLoading] = useState(false)
  const [logsError, setLogsError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 4,
    totalItems: 0,
    totalPages: 0
  })

  const fetchLogs = async (page = 1) => {
    if (!droneData?.drone_id) return

    try {
      setLogsLoading(true)
      setLogsError('')
      
      const response = await axios.get(`http://localhost:3000/logs/${droneData.drone_id}?page=${page}`)
      
      console.log('Logs response:', response.data)
      
      setLogs(response.data.data)
      setPagination(response.data.pagination)
      setCurrentPage(page)
      
    } catch (err) {
      console.error('Error fetching logs:', err)
      setLogsError('ไม่สามารถโหลดข้อมูล logs ได้')
    } finally {
      setLogsLoading(false)
    }
  }

  useEffect(() => {
    if (droneData?.drone_id) {
      fetchLogs(1)
    }
  }, [droneData])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchLogs(newPage)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">View Logs</h1>
          <p className="text-gray-600">ดูประวัติการบันทึกข้อมูล</p>
        </div>

        {droneData && (
          <div className="space-y-6">
            {/* แสดงข้อมูล Drone ปัจจุบัน */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูล Drone ปัจจุบัน</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{droneData.drone_id}</div>
                  <div className="text-sm text-gray-600">Drone ID</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600 truncate">{droneData.drone_name}</div>
                  <div className="text-sm text-gray-600">Name</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{droneData.country}</div>
                  <div className="text-sm text-gray-600">Country</div>
                </div>
                <div className="text-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    droneData.light === 'on' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {droneData.light === 'on' ? 'เปิด' : 'ปิด'}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Light</div>
                </div>
              </div>
            </div>

            {/* ตาราง Logs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">ประวัติการบันทึกข้อมูล</h3>
                {pagination.totalItems > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    แสดง {logs.length} จาก {pagination.totalItems} รายการ
                  </p>
                )}
              </div>
              
              {logsLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
                </div>
              ) : logsError ? (
                <div className="p-8 text-center">
                  <p className="text-red-600">{logsError}</p>
                </div>
              ) : logs.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">ไม่พบข้อมูลการบันทึก</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drone ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drone Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celsius</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {logs.map((log, index) => (
                          <tr key={log.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(log.created)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.country}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.drone_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.drone_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                log.celsius > 50 
                                  ? 'bg-red-100 text-red-800'
                                  : log.celsius > 30
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {log.celsius}°C
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          หน้า {pagination.page} จาก {pagination.totalPages}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            ก่อนหน้า
                          </button>
                          
                          <div className="flex space-x-1">
                            {Array.from({ length: Math.min(3, pagination.totalPages) }, (_, i) => {
                              const pageNum = Math.max(1, Math.min(pagination.totalPages - 2, currentPage - 1)) + i
                              if (pageNum > pagination.totalPages) return null
                              
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => handlePageChange(pageNum)}
                                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                    pageNum === currentPage
                                      ? 'bg-purple-600 text-white'
                                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              )
                            })}
                          </div>
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= pagination.totalPages}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ถัดไป
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewLogs
