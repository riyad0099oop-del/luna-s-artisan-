import { supabase } from "../lib/supabase";

export const authService = {
  login: async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
    return !!data.session;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  isAuthenticated: () => {
    // Check synchronously from local storage cache
    const storageKey = `sb-rzpjurczgjzbpbstjfht-auth-token`;
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(storageKey);
    if (!stored) return false;
    try {
      const parsed = JSON.parse(stored);
      return !!parsed?.access_token;
    } catch {
      return false;
    }
  },

  isAuthenticatedAsync: async (): Promise<boolean> => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },
};
