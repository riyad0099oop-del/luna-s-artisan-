import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/loleta/Header";
import { ProductCard, type Product } from "@/components/loleta/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { brandService } from "@/services/brandService";

export const Route = createFileRoute("/brands/$brandId")({
  component: BrandPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

function BrandPage() {
  const { brandId } = Route.useParams();

  // جلب بيانات الشركة من قاعدة البيانات
  const { data: brand, isLoading: isBrandLoading } = useQuery({
    queryKey: ["brand", brandId],
    queryFn: () => brandService.getBySlugOrId(brandId),
  });

  // جلب المنتجات المرتبطة بهذه الشركة
  const { data: allProducts = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });

  // تصفية المنتجات الخاصة بهذه الشركة (type === 'care' و brandId يطابق)
  const brandProducts: Product[] = allProducts
    .filter((p) => p.type === "care" && brand?.id && p.brandId === brand.id && p.isVisible)
    .map((p) => ({
      name: p.name,
      note: p.shortDescription || "",
      price: p.price + " ريال",
      oldPrice: p.oldPrice ? p.oldPrice + " ريال" : undefined,
      image: p.mainImage,
      tag: p.offerBadge || (p.isNew ? "جديد" : undefined),
      id: p.id,
    }));

  const brandName = brand?.name || brandId.replace(/-/g, " ");

  const isLoading = isBrandLoading || isProductsLoading;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream-aura pb-20">
      <Header />

      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 glass overflow-hidden rounded-4xl p-10 md:p-16 text-center flex flex-col items-center justify-center relative"
        >
          <div className="absolute inset-0 bg-primary/5" />
          {brand?.logo && (
            <img
              src={brand.logo}
              alt={brandName}
              className="relative z-10 h-20 w-auto object-contain mb-4"
            />
          )}
          <h1 className="relative z-10 text-4xl font-normal tracking-wide md:text-6xl">
            {brandName}
          </h1>
          {brand?.shortDescription && (
            <p className="relative z-10 mt-4 text-sm font-light text-muted-foreground">
              {brand.shortDescription}
            </p>
          )}
          {!brand?.shortDescription && (
            <p className="relative z-10 mt-4 text-sm font-light text-muted-foreground">
              تصفحي أحدث منتجات {brandName} المتاحة لدينا.
            </p>
          )}
        </motion.div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">جاري التحميل...</div>
        ) : brandProducts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            لا توجد منتجات متاحة لهذه الشركة حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {brandProducts.map((p, i) => (
              <ProductCard key={p.name} product={p} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
