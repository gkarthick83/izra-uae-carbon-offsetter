import { supabase } from '../lib/supabase';

export const authService = {
  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  },

  /**
   * Sign up with email, password, and profile data
   * Trigger automatically creates user_profiles entry
   */
  async signUp(email, password, fullName, role = 'buyer', phone = '', country = 'UAE') {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            phone: phone,
            country: country,
            avatar_url: ''
          }
        }
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  },

  /**
   * Sign out current user
   */
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  },

  /**
   * Get current user profile
   */
  async getUserProfile() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) return { data: null, error: new Error('Not authenticated') };

      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', user?.id)?.single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get user profile error:', error);
      return { data: null, error };
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(updates) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) return { data: null, error: new Error('Not authenticated') };

      const { data, error } = await supabase?.from('user_profiles')?.update({
          full_name: updates?.fullName,
          phone: updates?.phone,
          country: updates?.country,
          avatar_url: updates?.avatarUrl
        })?.eq('id', user?.id)?.select()?.single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error };
    }
  }
};