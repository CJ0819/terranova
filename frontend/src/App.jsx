import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage.jsx'
import CareersPage from './pages/CareerPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import JobDetailPage from './pages/JobDetailPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'


// Admin pages
import { AdminLogin } from './admin/AdminLogin'
import { AdminLayout } from './admin/AdminLayout'
import { AdminDashboard } from './admin/AdminDashboard'
import { AdminJobs } from './admin/AdminJobs'
import AdminJobForm from './admin/AdminJobForm'
import { AdminApplications } from './admin/AdminApplications'
import { AdminContacts } from './admin/AdminContacts'

// Auth guard
function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token')
  return token ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers/:id" element={<JobDetailPage />} />
        <Route path="/careers" element={<CareersPage />} />


        {/* ── Admin Routes ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="jobs/new" element={<AdminJobForm />} />
          <Route path="jobs/:id/edit" element={<AdminJobForm />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
