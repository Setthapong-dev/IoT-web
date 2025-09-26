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

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
