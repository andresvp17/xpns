import { createClient } from '@supabase/supabase-js'
import { auth } from '@/app/api/auth/options'
import { randomUUID } from 'crypto'

const supabaseURL = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string

export const supabase = createClient(supabaseURL, supabaseKey)

const BUCKETS_NAME = {
  avatars: 'profile-avatar'
}

export async function uploadProfile (file: File) {
  const userSession = await auth()

  const { data, error } = await supabase.storage
    .from(BUCKETS_NAME.avatars)
    .upload(userSession?.user.userID + '/' + randomUUID(), file)
}

export async function updateUsername (username: string) {
  const userSession = await auth()

  if (userSession?.user?.name === username) return

  await supabase
    .from('User')
    .update({ username })
    .eq('username', userSession?.user?.name)
}
