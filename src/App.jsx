import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowLeads from './components/showLeads/ShowLeads';
import LeadsPage from './pages/LeadsPage';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LeadsPage />} />
          <Route path='/leads' element={<LeadsPage />} />
          {/* Legacy routes redirect to new module */}
          <Route path='/showLeads' element={<Navigate to="/leads" replace />} />
          <Route path='/legacy-form' element={<Navigate to="/leads" replace />} />
          {/* Fallback */}
          <Route path='*' element={<Navigate to="/leads" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  )
}

export default App
