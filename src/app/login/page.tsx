'use client';

import useAuthSlice from '@/features/authSlice/useAuthSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { loginState, authState } = useAuthSlice();
  const router = useRouter();
  return (
    <div>
      <h1>Login Form</h1>
      <p>Email</p>
      <input type="email" onChange={loginState.handleChangeNewAuthLoginEmail} />
      <p>Password</p>
      <input
        type="password"
        onChange={loginState.handleChangeNewAuthLoginPassword}
        onKeyDown={loginState.handleKeyEnterLogin}
      />
      <p />
      <button onClick={authState.handleLogin}>Login</button>
      <button onClick={() => router.push('/sign-up')}>Sign up</button>
    </div>
  );
}
