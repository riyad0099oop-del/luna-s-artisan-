import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Save, X } from "lucide-react";
import { ImageUpload } from "../../../components/admin/ImageUpload";
import { productService } from "../../../services/productService";
import { brandService } from "../../../services/brandService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products/$productId/edit")({
  component: ProductForm,
});

import { useEffect } from "react";

function ProductForm() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { data: brands = [] } = useQuery({
    queryKey: ["adminBrands"],
    queryFn: brandService.getAll,
  });
  const { data: product } = useQuery({
    queryKey: ["adminProducts", productId],
    queryFn: () => productService.getById(productId),
  });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    mainImage: "",
    shortDescription: "",
    fullDescription: "",
    price: 0,
    quantity: 1,
    type: "luna" as "luna" | "care",
    brandId: "",
    isNew: false,
    isBestseller: false,
    showInFeatured: false,
    hasOffer: false,
    oldPrice: 0,
    offerBadge: "",
    isVisible: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        mainImage: product.mainImage,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        price: product.price,
        quantity: product.quantity,
        type: product.type as "luna" | "care",
        brandId: product.brandId || "",
        isNew: product.isNew,
        isBestseller: product.isBestseller,
        showInFeatured: product.showInFeatured,
        hasOffer: product.hasOffer,
        oldPrice: product.oldPrice || 0,
        offerBadge: product.offerBadge,
        isVisible: product.isVisible,
      });
    }
  }, [product]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mainImage || formData.price <= 0) {
      toast.error("الرجاء تعبئة الحقول الأساسية (الاسم، الصورة، السعر)");
      return;
    }

    setIsSaving(true);
    try {
      await productService.update(productId, {
        ...formData,
      });
      toast.success("تم تحديث المنتج بنجاح");
      navigate({ to: "/admin/products" });
    } catch (err) {
      toast.error("حدث خطأ أثناء الحفظ");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إضافة منتج جديد</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate({ to: "/admin/products" })}
            className="px-4 py-2 font-bold text-muted-foreground hover:bg-muted rounded-xl transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors flex items-center gap-2"
          >
            <Save className="size-5" />
            {isSaving ? "جاري الحفظ..." : "حفظ"}
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
              <h2 className="text-lg font-bold border-b border-border pb-2">المعلومات الأساسية</h2>

              <div>
                <label className="block text-sm font-bold mb-2">اسم المنتج</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug =
                      name
                        .toLowerCase()
                        .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
                        .replace(/(^-|-$)+/g, "") +
                      "-" +
                      Math.random().toString(36).substring(2, 6);
                    setFormData({ ...formData, name, slug });
                  }}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">السعر (ريال)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">الكمية في المخزون</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">وصف مختصر</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">التصنيف</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="luna">منتجات لونا</option>
                  <option value="care">منتجات العناية (شركات)</option>
                </select>
              </div>

              {formData.type === "care" && (
                <div>
                  <label className="block text-sm font-bold mb-2">الشركة</label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="">اختر الشركة...</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h2 className="text-lg font-bold">العروض</h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm font-bold">تفعيل العرض</span>
                  <input
                    type="checkbox"
                    checked={formData.hasOffer}
                    onChange={(e) => setFormData({ ...formData, hasOffer: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                </label>
              </div>

              {formData.hasOffer && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">السعر قبل الخصم</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.oldPrice || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, oldPrice: Number(e.target.value) || 0 })
                      }
                      className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      شارة العرض (مثال: خصم 20%)
                    </label>
                    <input
                      type="text"
                      value={formData.offerBadge}
                      onChange={(e) => setFormData({ ...formData, offerBadge: e.target.value })}
                      className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <ImageUpload
                label="الصورة الرئيسية"
                value={formData.mainImage}
                onChange={(url) => setFormData({ ...formData, mainImage: url })}
              />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
              <h2 className="text-lg font-bold border-b border-border pb-2">خيارات الظهور</h2>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm font-bold">مرئي للعملاء</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm font-bold">منتج جديد</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBestseller}
                  onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm font-bold">الأكثر طلباً</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showInFeatured}
                  onChange={(e) => setFormData({ ...formData, showInFeatured: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm font-bold">يظهر في مختارات الرئيسية</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
