import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Building2,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { authService } from "../../services/authService";
import { motion, AnimatePresence } from "motion/react";

const MENU_ITEMS = [
  { label: "لوحة القيادة", icon: LayoutDashboard, path: "/admin" },
  { label: "المنتجات", icon: Package, path: "/admin/products" },
  { label: "الشركات", icon: Building2, path: "/admin/brands" },
  { label: "الفروع", icon: MapPin, path: "/admin/branches" },
  { label: "الإعدادات والمحتوى", icon: Settings, path: "/admin/settings" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate({ to: "/admin/login" });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">Luna Admin</h2>
        <p className="text-xs text-muted-foreground mt-1">إدارة المحتوى</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/admin" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="size-5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed right-0 top-0 bottom-0 bg-white border-l border-border shadow-soft z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between bg-white border-b border-border p-4 sticky top-0 z-30">
        <h2 className="font-bold text-primary text-lg">Luna Admin</h2>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-foreground bg-primary/5 rounded-lg"
        >
          <Menu className="size-6" />
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white z-50 md:hidden shadow-2xl"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 left-4 p-2 bg-muted rounded-full"
              >
                <X className="size-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="md:pr-64 min-h-screen">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
