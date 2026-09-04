import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { authService } from '../../services/authService';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    
    setIsLoading(true);
    try {
      await authService.login(email, password);
      toast.success('تم تسجيل الدخول بنجاح');
      navigate({ to: '/admin' });
    } catch (err: any) {
      toast.error(err.message || 'خطأ في تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 font-sans" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-border"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">تسجيل الدخول للإدارة</h1>
          <p className="text-muted-foreground text-sm">أدخل بياناتك للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@loleta.com"
                className="w-full bg-[#F8F4EE] border border-border rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-right transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                dir="ltr"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8F4EE] border border-border rounded-xl pr-10 pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-right transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-md hover:bg-primary-deep transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
