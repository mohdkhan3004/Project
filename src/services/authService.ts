import { supabase, handleSupabaseError } from '../lib/supabase';

export const authService = {
  // Simple admin login (for demo purposes)
  async loginAdmin(email: string, password: string): Promise<boolean> {
    try {
      // For demo purposes, we'll use the hardcoded credentials
      // In production, this should use proper authentication
      const ADMIN_CREDENTIALS = {
        email: 'citysolve1122@gmail.com',
        password: '1122'
      };

      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Store admin session in localStorage for demo
        localStorage.setItem('citysolve_admin_logged_in', 'true');
        localStorage.setItem('citysolve_admin_email', email);
        return true;
      }

      return false;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  },

  // Check if admin is logged in
  isAdminLoggedIn(): boolean {
    return localStorage.getItem('citysolve_admin_logged_in') === 'true';
  },

  // Logout admin
  logoutAdmin(): void {
    localStorage.removeItem('citysolve_admin_logged_in');
    localStorage.removeItem('citysolve_admin_email');
  },

  // Get current admin email
  getCurrentAdminEmail(): string | null {
    return localStorage.getItem('citysolve_admin_email');
  },
};