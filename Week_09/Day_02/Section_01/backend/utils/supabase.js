/**
 * Supabase client factories for the Node server.
 *
 * - **Anon key** — safe(r) for operations that should respect RLS; we use it
 *   mainly to *verify* JWTs via `auth.getUser(token)` in requireAuth.
 * - **Service role** — full database access; bypasses RLS. Used for all inserts/
 *   selects in services. Never send this key to the browser or commit it.
 *
 * Both clients disable session persistence because this is a stateless API.
 */
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function getSupabaseAnon() {
  if (!url || !anonKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY')
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
