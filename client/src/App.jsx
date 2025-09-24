import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './component/Layout.jsx'
import Home from './pages/็็Home.jsx'
import ViewConfig from './pages/ViewConfig.jsx'
import TemperatureLogForm from './pages/TemperatureLogForm.jsx'
import ViewLogs from './pages/ViewLogs.jsx'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/View-Config" element={<ViewConfig />} />
          <Route path="/Tempereature-Log-Form" element={<TemperatureLogForm />} />
          <Route path="/View-Logs" element={<ViewLogs />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
