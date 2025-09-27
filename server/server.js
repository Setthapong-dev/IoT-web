const express = require('express')
const cors = require('cors')
const axios = require('axios')


const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

fetchDroneData = async () => {
    const DRONE_API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhTU9r50sb4VERyYJ9StTu1xDw2GlKPyeuPcic6pxAaDD-wxbptMMTD-Qk_dW9w1rMkMPWg51uLPd9-6jyvNKwCcYVnSFzbzK9Rz4tMGLZtGCFwpDEjKcmZqcv22SAk6YTzOXUcUjYYVhNDT_OXBF7spBygVw31aM60uu9XawiLXqpzGvRkAUaFzbn04h5pHCyKLgxijgqdUfRrJJMLPV2xiRzibKhgRyJLMQjFSDyysIZXLxGhJKJ2a7hAllOCBk2OH1c1jdluVHokLA5Ge03YK0qWBqeWf_Cqg5o9&lib=M9_yccKOaZVEQaYjEvK1gClQlFAuFWsxN"
    const response = await axios.get(`${DRONE_API_URL}`)
    
    if (response.data.status === 'ok' && response.data.data) {
        return response.data.data
    } else {
        throw new Error('Invalid API response format')
    }
}


app.get('/configs/:droneId', async (req, res) => {
   try {
     const droneId = req.params.droneId
     const allDroneData = await fetchDroneData()
     
     // หา drone ที่มี drone_id ตรงกับที่ต้องการ
     const targetDrone = allDroneData.find(drone => drone.drone_id == droneId)
     
     if (!targetDrone) {
       return res.status(404).json({ error: 'Drone not found' })
     }
     
     // กรองข้อมูลให้เหลือเฉพาะ Drone ID, Drone Name, Light, Country
     const filteredData = {
       drone_id: targetDrone.drone_id,
       drone_name: targetDrone.drone_name,
       light: targetDrone.light,
       country: targetDrone.country
     }
     
     res.json(filteredData)
   } catch (error) {
     console.error('Error fetching drone data:', error)
     res.status(500).json({ error: 'Internal server error' })
   }
})

// POST endpoint สำหรับบันทึกข้อมูลอุณหภูมิ
app.post('/logs', async (req, res) => {
  try {
    const { drone_id, drone_name, country, celsius } = req.body
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!drone_id || !drone_name || !country || celsius === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: drone_id, drone_name, country, celsius' 
      })
    }
    
    // ส่งข้อมูลไปยัง PocketHost API
    const pockethostData = {
      drone_id: parseInt(drone_id),
      drone_name: drone_name,
      country: country,
      celsius: parseFloat(celsius)
    }
    
    console.log('Sending data to PocketHost:', pockethostData)
    
    const response = await axios.post(
      'https://app-tracking.pockethost.io/api/collections/drone_logs/records',
      pockethostData,
      {
        headers: {
          'Authorization': 'Bearer 20250901efx',
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('PocketHost response:', response.data)
    
    res.json({
      success: true,
      message: 'Temperature log saved successfully',
      data: response.data
    })
    
  } catch (error) {
    console.error('Error saving temperature log:', error)
    
    if (error.response) {
      // Server responded with error status
      console.error('PocketHost API error:', error.response.data)
      res.status(error.response.status).json({ 
        error: 'Failed to save temperature log',
        details: error.response.data
      })
    } else if (error.request) {
      // Request was made but no response received
      res.status(500).json({ 
        error: 'Unable to connect to temperature log service'
      })
    } else {
      // Something else happened
      res.status(500).json({ 
        error: 'Internal server error',
        details: error.message
      })
    }
  }
})


app.get('/status/:droneId', async (req, res) => {
  try {
    const droneId = req.params.droneId
    const allDroneData = await fetchDroneData()
    
    // หา drone ที่มี drone_id ตรงกับที่ต้องการ
    const targetDrone = allDroneData.find(drone => drone.drone_id == droneId)
    
    if (!targetDrone) {
      return res.status(404).json({ error: 'Drone not found' })
    }
    
    // กรองข้อมูลให้เหลือเฉพาะ condition
    const filteredData = {
      condition:targetDrone.condition
    }
    
    res.json(filteredData)
  } catch (error) {
    console.error('Error fetching drone data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/logs/:droneId', async (req, res) => {
  try {
    const droneId = req.params.droneId
    const page = req.query.page || 1
    const perPage = 12
    
    console.log(`Fetching logs for drone ${droneId}, page ${page}`)
    
    const response = await axios.get(
      `https://app-tracking.pockethost.io/api/collections/drone_logs/records?page=${page}&perPage=${perPage}&filter=drone_id="${droneId}"`,
      {
        headers: {
          'Authorization': 'Bearer 20250901efx',
          'Content-Type': 'application/json'
        }
      }
    )
    
    
    console.log('PocketHost logs response:', response.data)
    
    res.json({
      success: true,
      data: response.data.items,
      pagination: {
        page: response.data.page,
        perPage: response.data.perPage,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages
      }
    })
    
  } catch (error) {
    console.error('Error fetching drone logs:', error)
    
    if (error.response) {
      console.error('PocketHost API error:', error.response.data)
      res.status(error.response.status).json({ 
        error: 'Failed to fetch drone logs',
        details: error.response.data
      })
    } else if (error.request) {
      res.status(500).json({ 
        error: 'Unable to connect to logs service'
      })
    } else {
      res.status(500).json({ 
        error: 'Internal server error',
        details: error.message
      })
    }
  }
})

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
