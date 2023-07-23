import { supabaseBackend } from '@/backend/backendInstance';
import getSocketInstance from '@/backend/socketInstance';
import { SupabaseClient } from '@supabase/supabase-js';

function supabaseListenAuthSession(
  onAuthStateChange: Parameters<SupabaseClient['auth']['onAuthStateChange']>[0]
) {
  const {
    data: { subscription },
  } = supabaseBackend.instance.auth.onAuthStateChange(onAuthStateChange);
  return subscription;
}

export function listenAuthSession(
  onAuthStateChange: Parameters<SupabaseClient['auth']['onAuthStateChange']>[0]
) {
  if (getSocketInstance().type === 'supabase') {
    return supabaseListenAuthSession(onAuthStateChange);
  }

  throw new Error('Unsupported backend type');
}
