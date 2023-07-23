import Backend from '@/backend/Backend';
import { Database } from '@/common/types/database.types';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

function createBackendInstance(backend: Backend) {
  if (backend.type === 'supabase') {
    return {
      type: backend.type,
      instance: createPagesBrowserClient<Database>(),
    };
  }

  throw new Error('Unsupported backend type');
}

const backendInstance = createBackendInstance({ type: 'supabase' });

export default backendInstance;
