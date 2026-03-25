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

/** Client should discard tokens; Supabase refresh tokens expire server-side naturally. */
export async function logout(req, res) {
  return res.json({ ok: true, message: 'Session cleared on client' })
}
