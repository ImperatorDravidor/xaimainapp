'use server'

import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  // Simple redirect to dashboard - authentication disabled for now
  redirect('/platform/dashboard')
}
