type Backend<T = unknown> = {
  type: 'supabase' | 'supabase-edgefunction' | 'custom' | 'socket.io';
  instance: T;
};

export default Backend;
