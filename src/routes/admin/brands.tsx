import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { brandService } from "../../services/brandService";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Image as ImageIcon } from "lucide-react";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { ImageUpload } from "../../components/admin/ImageUpload";
import type { AdminBrand } from "../../types/admin";

export const Route = createFileRoute("/admin/brands")({
  component: BrandsManager,
});

function BrandsManager() {
  const queryClient = useQueryClient();
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["adminBrands"],
    queryFn: brandService.getAll,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Partial<AdminBrand> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: brandService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBrands"] });
      toast.success("تمت إضافة الشركة بنجاح");
      setIsFormOpen(false);
      setEditingBrand(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AdminBrand> }) =>
      brandService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBrands"] });
      toast.success("تم التعديل بنجاح");
      setIsFormOpen(false);
      setEditingBrand(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: brandService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBrands"] });
      toast.success("تم حذف الشركة");
      setDeleteId(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand?.name || !editingBrand?.slug) {
      toast.error("الرجاء إدخال اسم الشركة والرابط (Slug)");
      return;
    }

    if (editingBrand.id) {
      updateMutation.mutate({ id: editingBrand.id, updates: editingBrand });
    } else {
      createMutation.mutate(editingBrand as Omit<AdminBrand, "id" | "createdAt" | "updatedAt">);
    }
  };

  const handleEdit = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingBrand({
      name: "",
      slug: "",
      logo: "",
      coverImage: "",
      shortDescription: "",
      fullDescription: "",
      order: brands.length + 1,
      isVisible: true,
    });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الشركات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            أضف وعدل الشركات/الماركات المتوفرة في المتجر
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleAddNew}
            className="bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors flex items-center gap-2"
          >
            <Plus className="size-5" /> إضافة شركة
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm max-w-3xl">
          <h2 className="text-xl font-bold mb-6 border-b border-border pb-2">
            {editingBrand?.id ? "تعديل بيانات الشركة" : "إضافة شركة جديدة"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col items-center sm:items-start gap-4">
                <ImageUpload
                  label="شعار الشركة (Logo)"
                  value={editingBrand?.logo || ""}
                  onChange={(url) => setEditingBrand({ ...editingBrand, logo: url })}
                  className="w-40"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">اسم الشركة *</label>
                <input
                  type="text"
                  value={editingBrand?.name || ""}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "");
                    setEditingBrand({
                      ...editingBrand,
                      name,
                      slug: editingBrand.id ? editingBrand.slug : slug,
                    });
                  }}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="مثال: Bioderma"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">الرابط (Slug) *</label>
                <input
                  type="text"
                  value={editingBrand?.slug || ""}
                  onChange={(e) => setEditingBrand({ ...editingBrand, slug: e.target.value })}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none font-mono text-left"
                  dir="ltr"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">وصف قصير</label>
                <input
                  type="text"
                  value={editingBrand?.shortDescription || ""}
                  onChange={(e) =>
                    setEditingBrand({ ...editingBrand, shortDescription: e.target.value })
                  }
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="مثال: ماركة فرنسية طبية للعناية بالبشرة"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">الترتيب (رقم)</label>
                <input
                  type="number"
                  value={editingBrand?.order || 0}
                  onChange={(e) =>
                    setEditingBrand({ ...editingBrand, order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none max-w-xs"
                />
              </div>

              <div className="md:col-span-2 pt-2 border-t border-border mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingBrand?.isVisible ?? true}
                    onChange={(e) =>
                      setEditingBrand({ ...editingBrand, isVisible: e.target.checked })
                    }
                    className="rounded text-primary focus:ring-primary size-5"
                  />
                  <span className="text-sm font-bold">الشركة مرئية للعملاء في الموقع</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors"
              >
                {editingBrand?.id ? "حفظ التعديلات" : "إضافة الشركة"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingBrand(null);
                }}
                className="px-8 py-3 font-bold text-muted-foreground hover:bg-muted rounded-xl transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      ) : isLoading ? (
        <div className="p-12 text-center text-muted-foreground">جاري التحميل...</div>
      ) : brands.length === 0 ? (
        <div className="bg-[#F8F4EE] rounded-2xl p-12 border border-dashed border-border text-center flex flex-col items-center">
          <ImageIcon className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2">لا توجد شركات مضافة</h3>
          <p className="text-muted-foreground mb-6">لم تقم بإضافة أي شركات/ماركات للمتجر بعد.</p>
          <button
            onClick={handleAddNew}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors"
          >
            إضافة أول شركة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className={`bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col relative overflow-hidden transition-all ${!brand.isVisible ? "opacity-60 grayscale-[30%]" : ""}`}
            >
              {!brand.isVisible && (
                <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                  مخفي
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#F8F4EE] border border-border flex items-center justify-center shrink-0 overflow-hidden">
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-primary/40">
                      {brand.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{brand.name}</h3>
                  <div className="text-xs bg-[#F8F4EE] text-muted-foreground px-2 py-1 rounded-md inline-block font-mono">
                    ترتيب: {brand.order}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[40px]">
                {brand.shortDescription || "لا يوجد وصف قصير"}
              </p>

              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
                <button
                  onClick={() => handleEdit(brand)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-bold transition-colors text-sm"
                >
                  <Edit2 className="size-4" /> تعديل
                </button>
                <button
                  onClick={() => setDeleteId(brand.id)}
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
        title="حذف الشركة"
        message="هل أنت متأكد من حذف هذه الشركة؟ تأكد من عدم وجود منتجات مرتبطة بها قبل الحذف."
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
