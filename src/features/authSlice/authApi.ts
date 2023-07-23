import getBackendInstance, { supabaseBackend } from '@/backend/backendInstance';

export type LoginParams = {
  email: string;
  password: string;
};

async function supabaseLogin(params: LoginParams) {
  const { email, password } = params;
  const { data, error } =
    await supabaseBackend.instance.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function login(params: LoginParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseLogin(params);
  }

  throw new Error('Unsupported backend type');
}

export type SignUpParams = {
  email: string;
  password: string;
};

async function supabaseSignUp(params: SignUpParams) {
  const { data, error } = await supabaseBackend.instance.auth.signUp(params);

  if (error) {
    throw error;
  }

  return data;
}

export async function signUp(params: SignUpParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseSignUp(params);
  }

  throw new Error('Unsupported backend type');
}

async function supabaseSignOut() {
  const { error } = await supabaseBackend.instance.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function signOut() {
  if (getBackendInstance().type === 'supabase') {
    return supabaseSignOut();
  }

  throw new Error('Unsupported backend type');
}
