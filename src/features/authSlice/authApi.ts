import getBackendInstance, { supabaseBackend } from '@/backend/backendInstance';

export type SignInParams = {
  email: string;
  password: string;
};

async function supabaseSignIn(params: SignInParams) {
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

export async function signIn(params: SignInParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseSignIn(params);
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

async function supabaseReadUserRoles() {
  const { data, error } = await supabaseBackend.instance
    .from('user_roles')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function readUserRoles() {
  if (getBackendInstance().type === 'supabase') {
    return supabaseReadUserRoles();
  }

  throw new Error('Unsupported backend type');
}

async function supabaseReadUserAuth() {
  const { data, error } = await supabaseBackend.instance.auth.getUser();

  if (error) {
    throw error;
  }

  return data;
}

export async function readUserAuth() {
  if (getBackendInstance().type === 'supabase') {
    return supabaseReadUserAuth();
  }

  throw new Error('Unsupported backend type');
}
