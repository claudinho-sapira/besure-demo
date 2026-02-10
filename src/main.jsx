import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import ViewA from './views/ViewA'
import ViewB from './views/ViewB'
import Nav from './components/Nav'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="h-full flex flex-col">
        <Nav />
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/borja" element={<ViewA />} />
            <Route path="/eduardo" element={<ViewB />} />
            <Route path="*" element={<Navigate to="/borja" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
)
