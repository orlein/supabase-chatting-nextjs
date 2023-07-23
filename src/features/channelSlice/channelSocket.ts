import { supabaseBackend } from '@/backend/backendInstance';
import getSocketInstance from '@/backend/socketInstance';
import { Database } from '@/common/types/database.types';

function supabaseListenChannel(
  onAdd: (payload: Database['public']['Tables']['channels']['Row']) => void,
  onUpdate: (payload: Database['public']['Tables']['channels']['Row']) => void,
  onRemove: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  const result = supabaseBackend.instance
    .channel('public:channels')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'channels',
      },
      (payload) => {
        onAdd(payload.new as Database['public']['Tables']['channels']['Row']);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'channels',
      },
      (payload) => {
        onUpdate(
          payload.new as Database['public']['Tables']['channels']['Row']
        );
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'channels',
      },
      (payload) => {
        onRemove(
          payload.old as Database['public']['Tables']['channels']['Row']
        );
      }
    );
  return result;
}

export function listenChannel(
  onAdd: (payload: Database['public']['Tables']['channels']['Row']) => void,
  onUpdate: (payload: Database['public']['Tables']['channels']['Row']) => void,
  onRemove: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  if (getSocketInstance().type === 'supabase') {
    return supabaseListenChannel(onAdd, onUpdate, onRemove);
  }

  throw new Error('Unsupported backend type');
}
