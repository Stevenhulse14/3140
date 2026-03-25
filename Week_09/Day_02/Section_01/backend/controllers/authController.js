/**
 * Auth controllers — bridge HTTP ↔ Supabase Auth.
 *
 * The React app does not talk to Supabase directly; it POSTs here. Supabase
 * returns `user` plus `session` (access_token, refresh_token). The client
 * persists those and sends the access token on protected routes.
 *
 * Note: If your Supabase project requires email confirmation, signUp may
 * return user without session until the user confirms.
 */
import { getSupabaseAnon } from '../utils/supabase.js'

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' })
    }
    const supabase = getSupabaseAnon()
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    return res.status(201).json({
      user: data.user,
      session: data.session,
    })
  } catch (e) {
    next(e)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' })
    }
    const supabase = getSupabaseAnon()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      return res.status(401).json({ error: error.message })
    }
    return res.json({
      user: data.user,
      session: data.session,
    })
  } catch (e) {
    next(e)
  }
}

/**
 * Stateless logout: client deletes stored tokens. We acknowledge so the UI
 * can complete the flow; revoking refresh tokens server-side is optional extra.
 */
export async function logout(req, res) {
  return res.json({ ok: true, message: 'Session cleared on client' })
}
