import { createClient } from '@supabase/supabase-js';

// Read environment variables instead of hardcoding credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Determine if Supabase is properly configured
const SUPABASE_READY = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key-here')
);

// Create Supabase client; disable auto-refresh when not configured to avoid noisy network errors
export const supabase = SUPABASE_READY
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : createClient('https://invalid.supabase.local', 'invalid', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });

// Helper to check configuration status (for UI/diagnostics)
export const isSupabaseConfigured = () => SUPABASE_READY;

// Guard to provide clear feedback when Supabase is not configured
const ensureConfigured = () => {
  if (!SUPABASE_READY) {
    throw new Error(
      'Supabase chưa được cấu hình. Vui lòng thiết lập VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env.'
    );
  }
};

// Types for user registration
export interface UserRegistration {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}

// Function to register a new user
export const registerUser = async (userData: UserRegistration) => {
  try {
    ensureConfigured();
    // First, create the user account with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.full_name,
          phone: userData.phone,
        }
      }
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // If auth is successful, save additional user info to profiles table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name: userData.full_name,
            email: userData.email,
            phone: userData.phone,
            created_at: new Date().toISOString(),
          }
        ]);

      if (profileError) {
        // console.error('Error creating profile:', profileError);
        // Don't throw error here as auth was successful
      }
    }

    return {
      success: true,
      user: authData.user,
      message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.'
    };

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific Supabase errors
    if (error instanceof Error) {
      if (error.message.includes('User already registered')) {
        throw new Error('Email này đã được đăng ký. Vui lòng sử dụng email khác.');
      }
      if (error.message.includes('Invalid email')) {
        throw new Error('Email không hợp lệ.');
      }
      if (error.message.includes('Password should be at least 6 characters')) {
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự.');
      }
      // Config guard message
      if (error.message.includes('Supabase chưa được cấu hình')) {
        throw new Error('Hệ thống đăng ký chưa được cấu hình Supabase. Vui lòng thiết lập .env.');
      }
      throw new Error(error.message);
    }
    
    throw new Error('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
  }
};

// Function to check if user is logged in
export const getCurrentUser = async () => {
  try {
    ensureConfigured();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Function to sign in user
export const signInUser = async (email: string, password: string) => {
  try {
    ensureConfigured();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Handle specific authentication errors
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Email hoặc mật khẩu không chính xác.');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Vui lòng xác thực email trước khi đăng nhập.');
      } else {
        throw new Error(error.message);
      }
    }

    // Get user profile information
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }

      return {
        success: true,
        user: data.user,
        profile: profile,
        session: data.session,
        message: 'Đăng nhập thành công!'
      };
    }

    throw new Error('Có lỗi xảy ra khi đăng nhập.');

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Function to sign out
export const signOut = async () => {
  try {
    ensureConfigured();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Có lỗi xảy ra khi đăng xuất.');
  }
};

// Function to get user session
export const getSession = async () => {
  try {
    ensureConfigured();
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    ensureConfigured();
    const redirectUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) {
      // Handle specific OAuth errors
      if (error.message.includes('Invalid provider')) {
        throw new Error('Google OAuth chưa được kích hoạt trong Supabase. Vui lòng kích hoạt Google provider trong Authentication > Providers.');
      } else if (error.message.includes('redirect_uri_mismatch')) {
        throw new Error('URL chuyển hướng không khớp. Vui lòng kiểm tra cấu hình OAuth trong Supabase.');
      }
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data,
      message: 'Đang chuyển hướng đến Google...'
    };

  } catch (error) {
    console.error('Google sign in error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Có lỗi xảy ra khi đăng nhập với Google.');
  }
};

// Function to sign up with Google (same as sign in for OAuth)
export const signUpWithGoogle = async () => {
  return signInWithGoogle();
};

// Function to listen to auth state changes
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  if (!SUPABASE_READY) {
    return { data: { subscription: { unsubscribe: () => {} } } } as any;
  }
  return supabase.auth.onAuthStateChange(callback);
};