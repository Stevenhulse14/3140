import { getSupabaseAnon } from '../utils/supabase.js'

/**
 * Verifies Supabase JWT and attaches req.user = { id, email }.
 * Use after optionalAuth if you need strict protection.
 */
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid authorization' })
  }
  try {
    const supabase = getSupabaseAnon()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired session' })
    }
    req.user = { id: user.id, email: user.email }
    req.accessToken = token
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Authentication failed' })
  }
}
