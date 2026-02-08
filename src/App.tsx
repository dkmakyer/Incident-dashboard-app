import './App.css'
import Layout from './component/Layout/Layout'
import { IncidentProvider } from './context/IncidentProvider'
import IncidentListPage from './pages/IncidentListPage/IncidentListPage'
import IncidentDetailPage from './pages/IncidentDetailPage/IncidentDetailPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <IncidentProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<IncidentListPage />} />
            <Route path="/incidents/:id" element={<IncidentDetailPage />} />
          </Routes>
        </Layout>
      </IncidentProvider>
    </BrowserRouter>
  )
}

export default App
