/**
 * Thin fetch wrapper for the Express API.
 *
 * - `base` is VITE_API_URL or `/api` (Vite dev server proxies /api → backend).
 * - Pass `token` to send Authorization: Bearer for protected routes.
 * - Non-OK responses throw Error with .status and .data for callers (e.g. toast).
 */
const base = import.meta.env.VITE_API_URL || '/api'

async function parseJson(res) {
  const text = await res.text()
  try {
    return text ? JSON.parse(text) : {}
  } catch {
    return { error: text }
  }
}

export async function apiFetch(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  })
  const data = await parseJson(res)
  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'Request failed')
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}
