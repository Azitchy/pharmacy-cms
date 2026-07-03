const API_BASE = import.meta.env.VITE_API_URL ?? '/api'
const TOKEN_KEY = 'pharmacy_admin_token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  if (!token) {
    localStorage.removeItem(TOKEN_KEY)
    return
  }

  localStorage.setItem(TOKEN_KEY, token)
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {})
  headers.set('Accept', 'application/json')

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      body:
        options.body && !(options.body instanceof FormData)
          ? JSON.stringify(options.body)
          : options.body,
    })
  } catch {
    throw new Error('Unable to reach the API server. Make sure Laravel is running.')
  }

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = payload.message || 'Request failed.'
    throw new Error(message)
  }

  return payload
}

export const api = {
  setToken,
  getToken,
  fetchPublicContent: () => request('/site-content'),
  loginAdmin: (email, password) => request('/admin/login', { method: 'POST', body: { email, password } }),
  meAdmin: () => request('/admin/me'),
  logoutAdmin: () => request('/admin/logout', { method: 'POST' }),
  listAdminSections: () => request('/admin/sections'),
  createSection: (payload) => request('/admin/sections', { method: 'POST', body: payload }),
  updateSection: (id, payload) => request(`/admin/sections/${id}`, { method: 'PUT', body: payload }),
  deleteSection: (id) => request(`/admin/sections/${id}`, { method: 'DELETE' }),
}
