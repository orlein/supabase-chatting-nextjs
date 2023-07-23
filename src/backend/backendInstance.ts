import Backend from '@/backend/Backend';
import { Database } from '@/common/types/database.types';
import {
  SupabaseClient,
  createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';

export const supabaseBackend: Backend<SupabaseClient> = {
  type: 'supabase',
  instance: createPagesBrowserClient<Database>(),
};

function createBackendInstance(backend: Pick<Backend, 'type'>) {
  if (backend.type === 'supabase') {
    return supabaseBackend;
  }

  throw new Error('Unsupported backend type');
}

const backendInstance = createBackendInstance({ type: 'supabase' });

export default function getBackendInstance() {
  return backendInstance;
}
