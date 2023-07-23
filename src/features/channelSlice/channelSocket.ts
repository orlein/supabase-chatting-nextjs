import { supabaseBackend } from '@/backend/backendInstance';
import getSocketInstance from '@/backend/socketInstance';
import { Database } from '@/common/types/database.types';

function supabaseListenAddChannel(
  onAdd: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  const result = supabaseBackend.instance.channel('public:channels').on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'channels',
    },
    (payload) => {
      onAdd(payload.new as Database['public']['Tables']['channels']['Row']);
    }
  );
  return result;
}

export function listenAddChannel(
  onAdd: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  if (getSocketInstance().type === 'supabase') {
    return supabaseListenAddChannel(onAdd);
  }

  throw new Error('Unsupported backend type');
}

function supabaseListenRemoveChannel(
  onRemove: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  const result = supabaseBackend.instance.channel('public:channels').on(
    'postgres_changes',
    {
      event: 'DELETE',
      schema: 'public',
      table: 'channels',
    },
    (payload) => {
      onRemove(payload.old as Database['public']['Tables']['channels']['Row']);
    }
  );
  return result;
}

export function listenRemoveChannel(
  onRemove: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  if (getSocketInstance().type === 'supabase') {
    return supabaseListenRemoveChannel(onRemove);
  }

  throw new Error('Unsupported backend type');
}

function supabaseListenUpdateChannel(
  onUpdate: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  const result = supabaseBackend.instance.channel('public:channels').on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'channels',
    },
    (payload) => {
      onUpdate(payload.new as Database['public']['Tables']['channels']['Row']);
    }
  );
  return result;
}

export function listenUpdateChannel(
  onUpdate: (payload: Database['public']['Tables']['channels']['Row']) => void
) {
  if (getSocketInstance().type === 'supabase') {
    return supabaseListenUpdateChannel(onUpdate);
  }

  throw new Error('Unsupported backend type');
}
