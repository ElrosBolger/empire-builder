/// <reference types="vite/client" />
// supabaseClient.ts
// Connessione Supabase con anti-cheat

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xxx.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGc...'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Verifica azione (anti-cheat server-side)
export async function verifyBuildingAction(
  userId: string,
  action: string,
  buildingType: string,
  cost: number,
  clientTimestamp: Date
) {
  const { data, error } = await supabase
    .rpc('verify_building_action', {
      p_user_id: userId,
      p_action: action,
      p_building_type: buildingType,
      p_cost: cost,
      p_client_timestamp: clientTimestamp
    })

  return { data, error }
}
