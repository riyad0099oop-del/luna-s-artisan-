import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { ProductCard, type Product } from "@/components/luna/ProductCard";

import productCone from "@/assets/product-cone.jpg";
import productBlend from "@/assets/product-blend.jpg";
import productOil from "@/assets/product-oil.jpg";
import productSoap from "@/assets/product-soap.jpg";

export const Route = createFileRoute("/loleta-products")({
  head: () => ({
    meta: [
      { title: "منتجات لوليتا — Loleta Store" },
      { name: "description", content: "اكتشفي منتجات Loleta الخاصة والمميزة للعناية بالبشرة والجمال الطبيعي." },
    ],
  }),
  component: LoletaProducts,
});

const PRODUCTS: Product[] = [
  {
    name: "سيروم النضارة الفاخر",
    note: "خلاصة فيتامين سي والهيالورونيك",
    price: "١٢٠ ر.س",
    image: productOil,
    tag: "الأكثر طلباً",
  },
  {
    name: "ماسك الطين الوردي",
    note: "لتنقية المسام وتنعيم البشرة",
    price: "٨٥ ر.س",
    image: productBlend,
    tag: "جديد",
  },
  { name: "زيت الترطيب العضوي", note: "مزيج الزيوت الطبيعية", price: "٦٥ ر.س", image: productCone },
  { name: "صابون زبدة الشيا", note: "مصنوع يدوياً للترطيب العميق", price: "٣٢ ر.س", image: productSoap },
];

function LoletaProducts() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream-aura pb-20">
      <Header />
      
      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:text-start"
        >
          <h1 className="text-3xl font-light tracking-tight md:text-5xl">
            منتجات <span className="text-secondary">لوليتا</span>
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground md:max-w-xl md:text-base">
            مجموعتنا الحصرية من المنتجات المصنوعة بكل حب واهتمام لتبرز جمالك الطبيعي وتحافظ على نضارة بشرتك.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
