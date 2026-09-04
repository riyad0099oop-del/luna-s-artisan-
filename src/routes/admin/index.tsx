import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Package, Building2, MapPin, Tag, Plus, Settings } from 'lucide-react';
import { productService } from '../../services/productService';
import { brandService } from '../../services/brandService';
import { branchService } from '../../services/branchService';
import { motion } from 'motion/react';

export const Route = createFileRoute('/admin/')({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { data: products = [], isLoading: pLoading } = useQuery({ queryKey: ['adminProducts'], queryFn: productService.getAll });
  const { data: brands = [], isLoading: bLoading } = useQuery({ queryKey: ['adminBrands'], queryFn: brandService.getAll });
  const { data: branches = [], isLoading: brLoading } = useQuery({ queryKey: ['adminBranches'], queryFn: branchService.getAll });

  const isLoading = pLoading || bLoading || brLoading;

  const stats = [
    { label: 'إجمالي المنتجات', value: products.length, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'منتجات لوليتا', value: products.filter(p => p.type === 'loleta').length, icon: Package, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'منتجات العناية', value: products.filter(p => p.type === 'care').length, icon: Package, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'منتجات عليها عروض', value: products.filter(p => p.hasOffer).length, icon: Tag, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'الشركات', value: brands.length, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'الفروع', value: branches.length, icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'منتجات نافدة', value: products.filter(p => p.quantity === 0).length, icon: Package, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">لوحة القيادة</h1>
        <p className="text-muted-foreground mt-2">مرحباً بك في لوحة تحكم متجر لوليتا</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center mb-4`}>
              <stat.icon className="size-6" />
            </div>
            {isLoading ? (
              <div className="w-12 h-8 bg-muted animate-pulse rounded mb-1" />
            ) : (
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
            )}
            <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/admin/products/new" className="flex flex-col items-center justify-center p-6 bg-[#F8F4EE] rounded-xl border border-border hover:border-primary/50 transition-colors group text-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Plus className="size-5 text-primary" />
            </div>
            <span className="font-bold text-sm">إضافة منتج</span>
          </Link>
          <Link to="/admin/brands" className="flex flex-col items-center justify-center p-6 bg-[#F8F4EE] rounded-xl border border-border hover:border-primary/50 transition-colors group text-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Building2 className="size-5 text-primary" />
            </div>
            <span className="font-bold text-sm">إدارة الشركات</span>
          </Link>
          <Link to="/admin/settings" className="flex flex-col items-center justify-center p-6 bg-[#F8F4EE] rounded-xl border border-border hover:border-primary/50 transition-colors group text-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Settings className="size-5 text-primary" />
            </div>
            <span className="font-bold text-sm">تعديل الرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
