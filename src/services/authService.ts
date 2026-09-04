const AUTH_KEY = 'loleta_admin_auth';

export const authService = {
  login: async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    if (email === 'admin@loleta.com' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  },
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(AUTH_KEY) === 'true';
  }
};
