// src/api/index.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({ baseURL: BASE_URL })

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Auto-refresh token on 401
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/admin/login'
        }
        return Promise.reject(error)
    }
)

// ── Auth ────────────────────────────────────────
export const login = (credentials) =>
    api.post('/auth/login/', credentials)

// ── Public ──────────────────────────────────────
export const getJobs = (params) =>
    api.get('/jobs/', { params })

export const getJob = (id) =>
    api.get(`/jobs/${id}/`)

export const applyForJob = (id, formData) =>
    api.post(`/jobs/${id}/apply/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })

export const getDepartments = () =>
    api.get('/departments/')

export const sendContactMessage = (data) =>
    api.post('/contact/', data)
export const getContactMessages = () =>
    api.get('/admin/contacts/')


// ── Admin ────────────────────────────────────────
export const getAdminStats = () =>
    api.get('/admin/stats/')

export const getAdminJobs = (params) =>
    api.get('/admin/jobs/', { params })

export const createJob = (data) =>
    api.post('/admin/jobs/', data)

export const updateJob = (id, data) =>
    api.patch(`/admin/jobs/${id}/`, data)

export const deleteJob = (id) =>
    api.delete(`/admin/jobs/${id}/`)

export const getApplications = (params) =>
    api.get('/admin/applications/', { params })

export const updateApplication = (id, data) =>
    api.patch(`/admin/applications/${id}/`, data)

export const deleteContactMessage = (id) =>
    api.delete(`/admin/contacts/${id}/`)

export const deleteApplication = (id) =>
    api.delete(`/admin/applications/${id}/`)


export default api