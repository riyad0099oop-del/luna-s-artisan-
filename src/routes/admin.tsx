import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { AdminLayout } from '../components/admin/AdminLayout';

export const Route = createFileRoute('/admin')({
  component: AdminGuard,
});

function AdminGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = authService.isAuthenticated();
      const isLoginRoute = location.pathname.includes('/login');
      
      if (!isAuth && !isLoginRoute) {
        navigate({ to: '/admin/login' });
      } else if (isAuth && isLoginRoute) {
        navigate({ to: '/admin' });
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [location.pathname, navigate]);

  if (isChecking) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-primary font-bold">???? ???????...</div>;
  }

  // The login route doesn't need the AdminLayout
  if (location.pathname.includes('/login')) {
    return <Outlet />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
