import getBackendInstance, { supabaseBackend } from '@/backend/backendInstance';

export type ReadUserParams = {
  user_id: string;
};

async function supabaseReadUser(params: ReadUserParams) {
  const result = await supabaseBackend.instance
    .from('users')
    .select('*')
    .eq('id', params.user_id);
  return result?.data?.[0];
}

export async function readUser(params: ReadUserParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseReadUser(params);
  }

  throw new Error('Unsupported backend type');
}
