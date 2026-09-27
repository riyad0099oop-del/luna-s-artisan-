import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { ProductCard, type Product } from "@/components/luna/ProductCard";

import productCone from "@/assets/product-cone.jpg";
import productBlend from "@/assets/product-blend.jpg";
import productOil from "@/assets/product-oil.jpg";
import productSoap from "@/assets/product-soap.jpg";

export const Route = createFileRoute("/brands/$brandId")({
  component: BrandPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

// منتجات وهمية للتوضيح
const generateBrandProducts = (brandName: string): Product[] => [
  {
    name: `${brandName} غسول الوجه`,
    note: "منظف لطيف للبشرة الحساسة",
    price: "٨٥ ريال",
    image: productOil,
  },
  {
    name: `${brandName} كريم الترطيب`,
    note: "ترطيب عميق يدوم طويلاً",
    price: "١٤٥ ريال",
    image: productBlend,
    tag: "الأكثر مبيعاً",
  },
  {
    name: `${brandName} سيروم الإشراقة`,
    note: "لإضاءة وتوحيد لون البشرة",
    price: "١٨٠ ريال",
    image: productCone,
  },
  {
    name: `${brandName} تونر منعش`,
    note: "لاستعادة توازن البشرة",
    price: "٧٥ ريال",
    image: productSoap,
  },
];

function BrandPage() {
  const { brandId } = Route.useParams();

  // تنسيق اسم الشركة للعرض
  const brandName = brandId.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const products = generateBrandProducts(brandName);

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
          <h1 className="relative z-10 text-4xl font-normal tracking-wide md:text-6xl uppercase">
            {brandName}
          </h1>
          <p className="relative z-10 mt-4 text-sm font-light text-muted-foreground">
            تصفحي أحدث منتجات {brandName} المتاحة لدينا.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
