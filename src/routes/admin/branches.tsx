import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { branchService } from '../../services/branchService';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, MapPin, Phone, Clock } from 'lucide-react';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import type { AdminBranch } from '../../types/admin';

export const Route = createFileRoute('/admin/branches')({
  component: BranchesManager,
});

function BranchesManager() {
  const queryClient = useQueryClient();
  const { data: branches = [], isLoading } = useQuery({ queryKey: ['adminBranches'], queryFn: branchService.getAll });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Partial<AdminBranch> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: branchService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBranches'] });
      toast.success('تمت إضافة الفرع بنجاح');
      setIsFormOpen(false);
      setEditingBranch(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<AdminBranch> }) => branchService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBranches'] });
      toast.success('تم التعديل بنجاح');
      setIsFormOpen(false);
      setEditingBranch(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: branchService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBranches'] });
      toast.success('تم حذف الفرع');
      setDeleteId(null);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch?.name || !editingBranch?.address) {
      toast.error('الرجاء إدخال اسم الفرع والعنوان');
      return;
    }
    
    if (editingBranch.id) {
      updateMutation.mutate({ id: editingBranch.id, updates: editingBranch });
    } else {
      createMutation.mutate(editingBranch as Omit<AdminBranch, 'id' | 'createdAt' | 'updatedAt'>);
    }
  };

  const handleEdit = (branch: AdminBranch) => {
    setEditingBranch(branch);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingBranch({
      name: '',
      city: '',
      region: '',
      address: '',
      phone: '',
      workingHours: '',
      order: branches.length + 1,
      isVisible: true
    });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الفروع</h1>
          <p className="text-sm text-muted-foreground mt-1">أضف فروع المتجر ليتمكن العملاء من الاستلام منها</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={handleAddNew}
            className="bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors flex items-center gap-2"
          >
            <Plus className="size-5" /> إضافة فرع
          </button>
        )}
      </div>
      
      {isFormOpen ? (
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm max-w-2xl">
          <h2 className="text-xl font-bold mb-6 border-b border-border pb-2">
            {editingBranch?.id ? 'تعديل بيانات الفرع' : 'إضافة فرع جديد'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">اسم الفرع *</label>
                <input 
                  type="text" 
                  value={editingBranch?.name || ''}
                  onChange={e => setEditingBranch({...editingBranch, name: e.target.value})}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="مثال: الفرع الرئيسي"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">المدينة</label>
                <input 
                  type="text" 
                  value={editingBranch?.city || ''}
                  onChange={e => setEditingBranch({...editingBranch, city: e.target.value})}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">المنطقة / الحي</label>
                <input 
                  type="text" 
                  value={editingBranch?.region || ''}
                  onChange={e => setEditingBranch({...editingBranch, region: e.target.value})}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">العنوان التفصيلي *</label>
                <input 
                  type="text" 
                  value={editingBranch?.address || ''}
                  onChange={e => setEditingBranch({...editingBranch, address: e.target.value})}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">رقم الهاتف (للتواصل)</label>
                <input 
                  type="text" 
                  dir="ltr"
                  value={editingBranch?.phone || ''}
                  onChange={e => setEditingBranch({...editingBranch, phone: e.target.value})}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none text-left"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">أوقات العمل</label>
                <input 
                  type="text" 
                  value={editingBranch?.workingHours || ''}
                  onChange={e => setEditingBranch({...editingBranch, workingHours: e.target.value})}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="مثال: 9:00 ص - 10:00 م"
                />
              </div>

              <div className="md:col-span-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={editingBranch?.isVisible ?? true}
                    onChange={e => setEditingBranch({...editingBranch, isVisible: e.target.checked})}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-bold">الفرع متاح حالياً لاستلام الطلبات</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-6 mt-6 border-t border-border">
              <button 
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors"
              >
                {editingBranch?.id ? 'حفظ التعديلات' : 'إضافة الفرع'}
              </button>
              <button 
                type="button"
                onClick={() => { setIsFormOpen(false); setEditingBranch(null); }}
                className="px-6 py-2 font-bold text-muted-foreground hover:bg-muted rounded-xl transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      ) : isLoading ? (
        <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
      ) : branches.length === 0 ? (
        <div className="bg-[#F8F4EE] rounded-2xl p-12 border border-dashed border-border text-center flex flex-col items-center">
          <MapPin className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2">لا توجد فروع مضافة</h3>
          <p className="text-muted-foreground mb-6">لم تقم بإضافة أي فروع للمتجر بعد. الفروع تسمح للعملاء باختيار "استلام من الفرع" عند إتمام الطلب.</p>
          <button 
            onClick={handleAddNew}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors"
          >
            إضافة أول فرع
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map(branch => (
            <div key={branch.id} className={`bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4 relative overflow-hidden transition-all ${!branch.isVisible ? 'opacity-70 grayscale-[50%]' : ''}`}>
              {!branch.isVisible && (
                <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  مغلق مؤقتاً
                </div>
              )}
              
              <div>
                <h3 className="font-bold text-lg mb-1">{branch.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="size-3.5 shrink-0" />
                  {branch.city}{branch.region ? ` - ${branch.region}` : ''}
                </p>
              </div>
              
              <div className="space-y-2 text-sm bg-[#F8F4EE] p-3 rounded-xl border border-border/50">
                <p className="font-medium text-foreground">{branch.address}</p>
                {branch.phone && (
                  <p className="flex items-center gap-2 text-muted-foreground font-mono" dir="ltr">
                    <Phone className="size-3.5" /> {branch.phone}
                  </p>
                )}
                {branch.workingHours && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3.5" /> {branch.workingHours}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-auto pt-2">
                <button 
                  onClick={() => handleEdit(branch)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-bold transition-colors text-sm"
                >
                  <Edit2 className="size-4" /> تعديل
                </button>
                <button 
                  onClick={() => setDeleteId(branch.id)}
                  className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="حذف الفرع"
        message="هل أنت متأكد من حذف هذا الفرع؟ لن يتمكن العملاء من اختياره كنقطة استلام للطلبات الجديدة."
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
