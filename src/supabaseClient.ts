/// <reference types="vite/client" />
// supabaseClient.ts
// Connessione Supabase con anti-cheat

import { createClient } from '@supabase/supabase-js'

// ⚠️ SOSTITUISCI CON I TUOI VALORI DA SUPABASE
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://devygqyacutmhwtaresy.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_K8dY43kHsipH24CYej3o-A_les7y_5d'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Test connessione
export async function testConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.auth.getSession()
    console.log('🔐 Supabase connection:', error ? '❌ Failed' : '✅ Connected')
    return !error
  } catch (err) {
    console.error('❌ Supabase error:', err)
    return false
  }
}

// Registrazione con email
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

// Login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

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

// Calcola reddito lato server (anti-cheat!)
export async function calculatePlayerIncomeServer(userId: string) {
  const { data, error } = await supabase
    .rpc('calculate_player_income', {
      p_user_id: userId
    })

  return { income: data as number || 0, error }
}

// Calcola prestige milestone
export async function calculatePrestigeMilestone(userId: string, level: number) {
  const { data, error } = await supabase
    .rpc('calculate_prestige_milestone', {
      p_user_id: userId,
      p_level: level
    })

  return { data, error }
}
