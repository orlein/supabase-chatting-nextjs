import { supabaseBackend } from '@/backend/backendInstance';
import getSocketInstance from '@/backend/socketInstance';
import { Database } from '@/common/types/database.types';

type Message = Database['public']['Tables']['messages']['Row'];

function supabaseListenMessage(
  onAdd: (payload: Message) => void,
  onUpdate: (payload: Message) => void,
  onRemove: (payload: Message) => void
) {
  const result = supabaseBackend.instance
    .channel('public:messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      },
      (payload) => {
        onAdd(payload.new as Message);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'messages',
      },
      (payload) => {
        onUpdate(payload.new as Message);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'messages',
      },
      (payload) => {
        onRemove(payload.old as Message);
      }
    );
  return result;
}

export function listenMessage(
  onAdd: (payload: Message) => void,
  onUpdate: (payload: Message) => void,
  onRemove: (payload: Message) => void
) {
  if (getSocketInstance().type === 'supabase') {
    return supabaseListenMessage(onAdd, onUpdate, onRemove);
  }

  throw new Error('Unsupported backend type');
}
