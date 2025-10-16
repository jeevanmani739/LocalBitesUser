import { supabase } from './supabase';

// export async function signUp(email: string, password: string, fullName: string) {
//   const { data: authData, error: authError } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: undefined,
//       data: {
//         full_name: fullName,
//       },
//     },
//   });

//   if (authError) throw authError;

//   return authData;
// }

export async function signUp(email: string, password: string, fullName: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        user_type: "customer",
        email_verified: false,
      },
    },
  });

  if (authError) throw authError;

  // Optional check for profile creation
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (profileError) console.warn("Profile check failed:", profileError);
  else console.log("Created profile:", profile);

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
