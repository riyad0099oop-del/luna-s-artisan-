import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit2, Trash2, Tag, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { productService } from '../../../services/productService';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/products/')({
  component: ProductsList,
});

function ProductsList() {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useQuery({ queryKey: ['adminProducts'], queryFn: productService.getAll });
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
      toast.success('تم حذف المنتج بنجاح');
      setDeleteId(null);
    }
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.includes(search) || p.slug.includes(search);
    const matchesType = filterType === 'all' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة المنتجات</h1>
          <p className="text-sm text-muted-foreground mt-1">عرض وتعديل منتجات المتجر</p>
        </div>
        <Link 
          to="/admin/products/new"
          className="bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="size-5" />
          إضافة منتج
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#F8F4EE] border border-border rounded-xl pr-10 pl-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 text-right"
            />
          </div>
          <select 
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:outline-none font-bold text-sm"
          >
            <option value="all">جميع الأنواع</option>
            <option value="loleta">منتجات لوليتا</option>
            <option value="care">منتجات العناية</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[#F8F4EE] text-muted-foreground">
              <tr>
                <th className="p-4 font-bold">المنتج</th>
                <th className="p-4 font-bold">النوع</th>
                <th className="p-4 font-bold">السعر</th>
                <th className="p-4 font-bold">المخزون</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">جاري التحميل...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">لا توجد منتجات مطابقة</td></tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-black/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.mainImage} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-muted" />
                        <div>
                          <p className="font-bold text-foreground">{product.name}</p>
                          {product.hasOffer && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1"><Tag className="size-3" /> عرض</span>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {product.type === 'loleta' ? (
                        <span className="text-pink-600 font-bold bg-pink-50 px-2 py-1 rounded-lg text-xs">لوليتا</span>
                      ) : (
                        <span className="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-lg text-xs">عناية</span>
                      )}
                    </td>
                    <td className="p-4 font-bold">{product.price} ر.س</td>
                    <td className="p-4">
                      {product.quantity > 0 ? (
                        <span className="font-bold">{product.quantity}</span>
                      ) : (
                        <span className="text-red-500 font-bold flex items-center gap-1 text-xs"><AlertCircle className="size-3" /> نافد</span>
                      )}
                    </td>
                    <td className="p-4">
                      {product.isVisible ? (
                        <span className="text-green-600 font-bold text-xs">ظاهر</span>
                      ) : (
                        <span className="text-muted-foreground font-bold text-xs">مخفي</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit2 className="size-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteId(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="حذف المنتج"
        message="هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء."
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
