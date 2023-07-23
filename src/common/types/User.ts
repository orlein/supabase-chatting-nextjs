import { User as SupabaseUser } from '@supabase/auth-helpers-nextjs';

type User = {} & SupabaseUser;

export default User;
