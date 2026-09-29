import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { ChevronRight, Leaf, ShieldCheck, Truck, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailsPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getById(productId),
  });

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-background pb-20">
        <Header />
        <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40 flex justify-center">
          <div className="text-muted-foreground animate-pulse text-lg">جاري التحميل...</div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="relative min-h-screen bg-background pb-20">
        <Header />
        <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40 text-center">
          <h1 className="text-3xl font-bold mb-4">عذراً، المنتج غير موجود</h1>
          <Link to="/" className="text-primary hover:underline">
            العودة للصفحة الرئيسية
          </Link>
        </main>
      </div>
    );
  }

  const priceFormatted = product.price + " ريال";
  const oldPriceFormatted = product.oldPrice ? product.oldPrice + " ريال" : undefined;
  
  // Format for the cart
  const cartProduct = {
    id: product.id,
    name: product.name,
    note: product.shortDescription || "",
    price: priceFormatted,
    oldPrice: oldPriceFormatted,
    image: product.mainImage,
    tag: product.offerBadge || (product.isNew ? "جديد" : undefined),
    brand: undefined, // Could add brand name if we had it joined
  };

  return (
    <div className="relative min-h-screen bg-background pb-20 font-sans">
      <Header />

      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronRight className="size-4 mx-2" />
          <Link to="/luna-products" className="hover:text-primary transition-colors">المنتجات</Link>
          <ChevronRight className="size-4 mx-2" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </motion.nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="relative rounded-3xl overflow-hidden bg-card border border-border/50 shadow-soft group"
          >
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            <motion.img
              src={product.mainImage}
              alt={product.name}
              className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.offerBadge && (
              <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                {product.offerBadge}
              </div>
            )}
            {product.isNew && !product.offerBadge && (
              <div className="absolute top-4 right-4 bg-white text-primary px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                جديد
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
              {product.name}
            </h1>
            
            {product.shortDescription && (
              <p className="text-lg text-muted-foreground mb-6 font-medium">
                {product.shortDescription}
              </p>
            )}

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-primary">{priceFormatted}</span>
              {oldPriceFormatted && (
                <span className="text-xl text-muted-foreground/60 line-through decoration-muted-foreground/40">
                  {oldPriceFormatted}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(cartProduct)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-primary-deep transition-all active:scale-95 mb-10"
            >
              <Plus className="size-6" strokeWidth={2.5} />
              إضافة إلى السلة
            </button>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-card p-4 rounded-2xl shadow-sm border border-border/50">
                <Leaf className="size-6 text-secondary" />
                <span className="text-sm font-bold">مكونات طبيعية آمنة</span>
              </div>
              <div className="flex items-center gap-3 bg-card p-4 rounded-2xl shadow-sm border border-border/50">
                <ShieldCheck className="size-6 text-primary" />
                <span className="text-sm font-bold">جودة مضمونة</span>
              </div>
            </div>

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              {product.fullDescription && (
                <AccordionItem value="description">
                  <AccordionTrigger className="text-lg font-bold text-foreground">
                    تفاصيل المنتج
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                    {product.fullDescription}
                  </AccordionContent>
                </AccordionItem>
              )}
              
              <AccordionItem value="usage">
                <AccordionTrigger className="text-lg font-bold text-foreground">
                  طريقة الاستخدام
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  يوضع على منطقة نظيفة وجافة، ثم يدلك بلطف حتى يُمتص تماماً. يُنصح باستخدامه بشكل يومي للحصول على أفضل النتائج ولمسة فخمة تليق بك.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-lg font-bold text-foreground">
                  سياسة الشحن والاسترجاع
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  <ul className="list-disc list-inside space-y-2">
                    <li>توصيل سريع وموثوق داخل المملكة.</li>
                    <li>إرجاع مجاني خلال 7 أيام من تاريخ الاستلام في حال عدم تطابق المواصفات.</li>
                    <li>منتجاتنا مغلفة بعناية لتصلك بأبهى حُلة.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
