'use client';

import useAuthSlice from '@/features/authSlice/useAuthSlice';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const { signUpState, authState } = useAuthSlice();
  const router = useRouter();

  return (
    <div>
      <h1>Sign Up Form</h1>
      <p>Email</p>
      <input
        type="email"
        onChange={signUpState.handleChangeNewAuthSignUpEmail}
      />
      <p>Password</p>
      <input
        type="password"
        onChange={signUpState.handleChangeNewAuthSignUpPassword}
        onKeyDown={signUpState.handleKeyEnterSignUp}
      />
      <p />
      <button onClick={authState.handleSignUp}>Sign Up</button>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
}
