// for server-side auth,
// https://github.com/supabase/supabase/blob/master/examples/auth/nextjs/app/%5Bid%5D/page.tsx

import { Database } from '@/common/types/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function serverSideAuth() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }
}
