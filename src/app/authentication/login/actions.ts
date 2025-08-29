'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  // Simple redirect to dashboard - authentication disabled for now
  redirect('/platform/dashboard')
}

export async function signup(formData: FormData) {
  // Simple redirect to dashboard - authentication disabled for now
  redirect('/platform/dashboard')
}
