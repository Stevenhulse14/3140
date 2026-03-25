import { getSupabaseAnon } from '../utils/supabase.js'

/**
 * Protects routes that need a logged-in user.
 *
 * How it works:
 * - Reads `Authorization: Bearer <access_token>` from the request.
 * - Calls Supabase `auth.getUser(token)` with the **anon** key — this validates
 *   the JWT signature and expiry without needing the service role.
 * - On success, attaches `req.user` { id, email } for controllers/services.
 *
 * Why anon key for verification? Supabase documents using getUser(jwt) to
 * validate access tokens issued by signIn/signUp.
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
