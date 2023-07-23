type Backend<T = unknown> = {
  type: 'supabase' | 'supabase-serverside' | 'custom' | 'socket.io';
  instance: T;
};

export default Backend;
