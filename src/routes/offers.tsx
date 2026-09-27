import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { ProductCard, type Product } from "@/components/luna/ProductCard";

import productOil from "@/assets/product-oil.jpg";
import productBlend from "@/assets/product-blend.jpg";

export const Route = createFileRoute("/offers")({
  component: OffersPage,
});

const LOLETA_OFFERS: Product[] = [
  {
    name: "باقة النضارة المتكاملة",
    note: "سيروم + كريم ترطيب",
    price: "١٩٩ ريال",
    oldPrice: "٢٦٥ ريال",
    image: productOil,
    tag: "عرض خاص",
  },
  {
    name: "مجموعة الطين والعناية",
    note: "ماسك + صابون شيا",
    price: "٩٩ ريال",
    oldPrice: "١١٧ ريال",
    image: productBlend,
    tag: "٢٠٪ خصم",
  },
];

const BRANDS_OFFERS: Product[] = [
  {
    name: "غسول يومي عميق",
    note: "للبشرة الدهنية",
    price: "١٢٠ ريال",
    oldPrice: "١٥٠ ريال",
    image: productOil,
    tag: "خصم",
    brand: "Bioderma",
  },
  {
    name: "تونر التفتيح",
    note: "توحيد لون البشرة",
    price: "٨٥ ريال",
    oldPrice: "١٠٥ ريال",
    image: productBlend,
    tag: "خصم",
    brand: "Byphasse",
  },
  {
    name: "كريم الترطيب الفائق",
    note: "مع فيتامين هـ",
    price: "١٤٠ ريال",
    oldPrice: "١٧٠ ريال",
    image: productOil,
    tag: "خصم",
    brand: "Bio Balance",
  },
  {
    name: "سيروم الكولاجين",
    note: "لمقاومة التجاعيد",
    price: "٢١٠ ريال",
    oldPrice: "٢٨٠ ريال",
    image: productBlend,
    tag: "٢٥٪ خصم",
    brand: "Cavali",
  },
];

function OffersPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans pb-20">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">أحدث العروض</h1>
          <p className="text-muted-foreground font-medium">
            اكتشفي أفضل العروض الحصرية على منتجاتنا ومنتجات الشركات العالمية.
          </p>
        </motion.div>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-foreground relative inline-block">
            عروض منتجات لوليتا
            <div className="absolute -bottom-2 right-0 w-12 h-1 bg-primary rounded-full" />
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {LOLETA_OFFERS.map((p, i) => (
              <ProductCard key={p.name} product={p} index={i} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8 text-foreground relative inline-block">
            عروض منتجات العناية
            <div className="absolute -bottom-2 right-0 w-12 h-1 bg-primary rounded-full" />
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {BRANDS_OFFERS.map((p, i) => (
              <ProductCard key={p.name} product={p} index={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
