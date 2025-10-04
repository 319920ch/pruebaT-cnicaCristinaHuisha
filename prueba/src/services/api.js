const BASE = 'https://dummyjson.com'

export async function apiFetch(path, { method = 'GET', body = null, token = null } = {}) {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const opts = { method, headers }
  if (body) opts.body = JSON.stringify(body)

  const res = await fetch(`${BASE}${path}`, opts)
  const text = await res.text()
  let data = null
  try { data = text ? JSON.parse(text) : {} } catch (e) { data = { raw: text } }
  if (!res.ok) {
    const message = data?.message || data?.error || res.statusText || 'Error API'
    const err = new Error(message)
    err.response = data
    throw err
  }
  return data
}
