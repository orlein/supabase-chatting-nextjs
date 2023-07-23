import Backend from '@/backend/Backend';
import { supabaseBackend } from '@/backend/backendInstance';

function createSocketInstance(backend: Pick<Backend, 'type'>) {
  if (backend.type === 'supabase') {
    return {
      type: backend.type,
      instance: supabaseBackend.instance,
    };
  }

  throw new Error('Unsupported backend type');
}

const socketInstance = createSocketInstance({ type: 'supabase' });

export default function getSocketInstance() {
  return socketInstance;
}
