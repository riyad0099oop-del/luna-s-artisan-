import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronLeft, Heart, Sparkles, ShieldCheck, Leaf, Sparkle, Tag } from "lucide-react";

import { Header } from "@/components/luna/Header";
import { SilkReveal } from "@/components/luna/SilkReveal";
import { ProductCard, type Product } from "@/components/luna/ProductCard";

import logoUrl from "@/assets/loleta-logo.jpg";
import heroImg from "@/assets/product-oil.jpg";
import productBlend from "@/assets/product-blend.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loleta Store — منتجات العناية بالبشرة" },
      {
        name: "description",
        content: "Loleta Store: منتجات مختارة بعناية لبشرة صحية ونضارة طبيعية كل يوم.",
      },
    ],
  }),
  component: HomePage,
});

const ease = [0.22, 1, 0.36, 1] as const;

const FEATURED_PRODUCTS: Product[] = [
  {
    name: "زيت النضارة الفائق",
    note: "عناية ليلية",
    price: "١٢٠ ريال",
    image: heroImg,
    tag: "الأكثر مبيعاً",
  },
  { name: "سيروم الإشراقة", note: "تفتيح وتوحيد لون", price: "١٤٥ ريال", image: productBlend },
  { name: "كريم الترطيب العميق", note: "للبشرة الجافة", price: "٩٥ ريال", image: heroImg },
  {
    name: "مجموعة العناية المتكاملة",
    note: "غسول + تونر + مرطب",
    price: "٢٩٠ ريال",
    oldPrice: "٣٥٠ ريال",
    image: productBlend,
    tag: "عرض",
  },
];

const PREVIEW_BRANDS = [
  { id: "bioderma", name: "Bioderma", desc: "عناية طبية موثوقة لحماية بشرتك." },
  { id: "byphasse", name: "Byphasse", desc: "مستحضرات تجميلية بلمسة احترافية." },
  { id: "bio-balance", name: "Bio Balance", desc: "توازن طبيعي ونضارة فائقة." },
  { id: "cavali", name: "Cavali", desc: "فخامة العناية اليومية المتكاملة." },
];

const FEATURES = [
  {
    icon: Heart,
    title: "منتجات مختارة بعناية",
    desc: "ننتقي أفضل المكونات لضمان الفعالية والأمان لبشرتك.",
  },
  {
    icon: ShieldCheck,
    title: "علامات موثوقة",
    desc: "نوفر لكِ منتجات من أقوى الشركات العالمية الموثوقة طبياً وتجميلياً.",
  },
  {
    icon: Leaf,
    title: "عناية تناسب احتياجك",
    desc: "حلول متكاملة تناسب جميع أنواع البشرة وروتينها اليومي.",
  },
  {
    icon: Sparkle,
    title: "تجربة تسوق فاخرة",
    desc: "نسعى لتقديم تجربة تسوق سهلة، سريعة، وممتعة تليق بكِ.",
  },
];

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";

function HomePage() {
  const { data: dbProducts } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll
  });

  const productsToDisplay: Product[] = dbProducts?.slice(0, 4).map(p => ({
    name: p.name,
    note: p.shortDescription || "",
    price: p.price + " ريال",
    oldPrice: p.oldPrice ? p.oldPrice + " ريال" : undefined,
    image: p.mainImage || heroImg,
    tag: p.offerBadge || (p.isNew ? "جديد" : undefined),
    id: p.id,
  })) || FEATURED_PRODUCTS;

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans isolate">
      <SilkReveal />
      <Header />

      {/* Hero Section - Background: Warm Off White (bg-background) */}
      <section id="hero" className="relative bg-background px-5 pb-20 pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl grid items-center gap-10 md:grid-cols-2 md:gap-8">
          {/* النص (الجهة اليمنى) */}
          <div className="order-2 text-center md:order-1 md:text-start flex flex-col items-center md:items-start z-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground"
            >
              اهتمي بنفسك
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease }}
              className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl"
            >
              لأنك تستحقين الأفضل
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease }}
              className="my-6 flex items-center justify-center gap-4 text-primary/40 w-full md:justify-start"
            >
              <div className="h-[1px] w-16 bg-primary/20" />
              <Heart className="size-5 text-primary/60" strokeWidth={1.5} />
              <div className="h-[1px] w-16 bg-primary/20" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease }}
              className="text-3xl font-bold text-primary md:text-4xl"
            >
              متجر لوليتا
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease }}
              className="mt-4 max-w-sm text-base leading-relaxed font-medium text-foreground/80"
            >
              منتجات مختارة بعناية
              <br />
              لتمتعي ببشرة صحية
              <br />
              ونضارة طبيعية كل يوم
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7, ease }}
              className="mt-8"
            >
              <a
                href="#categories"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-deep active:scale-95"
              >
                تسوقي الآن
                <ChevronLeft className="size-5" strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>

          {/* الصورة والأشكال (الجهة اليسرى) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease }}
            className="order-1 relative flex items-center justify-center md:order-2 h-[450px] md:h-[550px]"
          >
            {/* الدائرة الخضراء الكبيرة (Soft Olive) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-10 right-0 w-80 h-80 md:w-[450px] md:h-[450px] bg-secondary rounded-full z-0 translate-x-10 -translate-y-4 pointer-events-none"
            />

            {/* خطوط نباتية تجميلية */}
            <motion.svg
              initial={{ rotate: -5, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 0.2 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-0 right-0 w-64 h-64 text-primary z-0 pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                d="M100,200 Q150,100 180,20 M180,20 Q160,40 140,30 M180,20 Q190,50 170,70"
                strokeLinecap="round"
              />
              <circle cx="180" cy="20" r="3" fill="currentColor" />
              <circle cx="140" cy="30" r="2" fill="currentColor" />
              <circle cx="170" cy="70" r="2" fill="currentColor" />
            </motion.svg>

            {/* الصورة الرئيسية للمنتجات */}
            <div className="relative z-10 w-64 md:w-80 rounded-[3rem] bg-white overflow-hidden shadow-2xl border-4 border-white/50 p-4">
              <img
                src={logoUrl}
                alt="Loleta Store"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* شكل متموج خمري في الأسفل */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.8 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -bottom-0 left-0 w-[80%] md:w-[60%] h-32 bg-primary rounded-tr-[100px] z-0 shadow-lg pointer-events-none"
        />
      </section>

      {/* Categories Cards - Background: Very Light Sage Green */}
      <section id="categories" className="bg-[#EEF1E3] py-24 relative z-20">
        <div className="mx-auto max-w-6xl px-5 grid gap-8 md:grid-cols-2">
          {/* Card 1: Loleta Products */}
          <Link to="/loleta-products">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.7, ease }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-sm border border-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2 min-h-[380px] active:shadow-sm"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-2 bg-primary transition-all duration-500 group-hover:w-full" />
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 0.05, rotate: 0 }}
                transition={{ duration: 1 }}
                className="absolute -bottom-10 -left-10 group-hover:opacity-10 transition-opacity duration-500"
              >
                <Heart className="w-48 h-48 text-primary" strokeWidth={1} />
              </motion.div>

              <div className="relative z-10">
                <div className="inline-flex rounded-2xl bg-[#F3E4E2] p-4 shadow-sm mb-8 border border-white">
                  <Heart className="size-8 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold md:text-4xl text-foreground mb-4">
                  منتجات لوليتا
                </h2>
                <p className="text-base font-medium text-muted-foreground leading-relaxed max-w-sm">
                  مجموعتنا الخاصة والحصرية المصنوعة بشغف وحب. مستحضرات عناية طبيعية تدلل بشرتك وتبرز
                  جمالك الأصيل.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 mt-12 text-primary font-bold">
                <span className="text-lg relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all group-hover:after:w-full">
                  استكشفي الآن
                </span>
                <ChevronLeft
                  className="size-5 transition-transform duration-300 group-hover:-translate-x-2"
                  strokeWidth={2.5}
                />
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Brands */}
          <Link to="/brands">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#F4EEE6] p-10 shadow-sm border border-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2 min-h-[380px] active:shadow-sm"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-2 bg-primary transition-all duration-500 group-hover:w-full" />
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#E8EDDA] blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 0.05, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -bottom-10 -left-10 group-hover:opacity-10 transition-opacity duration-500"
              >
                <Sparkles className="w-48 h-48 text-primary" strokeWidth={1} />
              </motion.div>

              <div className="relative z-10">
                <div className="inline-flex rounded-2xl bg-white p-4 shadow-sm mb-8 border border-white">
                  <Sparkles className="size-8 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold md:text-4xl text-foreground mb-4">
                  منتجات العناية
                </h2>
                <p className="text-base font-medium text-muted-foreground leading-relaxed max-w-sm">
                  تشكيلة واسعة ومختارة من أفضل العلامات التجارية العالمية الموثوقة. عناية طبية
                  وتجميلية متكاملة تناسب جميع احتياجاتك.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 mt-12 text-primary font-bold">
                <span className="text-lg relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all group-hover:after:w-full">
                  عرض الشركات
                </span>
                <ChevronLeft
                  className="size-5 transition-transform duration-300 group-hover:-translate-x-2"
                  strokeWidth={2.5}
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* 1. Featured Loleta Products - Background: Soft Cream */}
      <section className="bg-card py-24 relative z-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-primary">
                مختارات لوليتا
              </h2>
              <p className="text-muted-foreground font-medium max-w-md">
                المنتجات الأكثر مبيعاً والأكثر طلباً لتجربة عناية استثنائية.
              </p>
            </div>
            <Link
              to="/loleta-products"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary group"
            >
              عرض جميع المنتجات
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                <ChevronLeft className="size-4" strokeWidth={2.5} />
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {productsToDisplay.map((p, i) => (
              <ProductCard key={i} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Brands Preview - Background: Blush Beige */}
      <section className="bg-[#F3E4E2] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-white/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-white/50 to-transparent" />

        <div className="mx-auto max-w-6xl px-5 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col items-center"
          >
            <div className="relative inline-block mb-3">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">علامات عناية نثق بها</h2>
              <div className="absolute -bottom-2 right-1/4 w-1/2 h-1 bg-primary/20 rounded-full" />
            </div>
            <p className="text-muted-foreground font-medium max-w-md">
              ننتقي لكِ أفضل الشركات لضمان الجودة العالية والنتائج الملحوظة.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-start">
            {PREVIEW_BRANDS.map((brand, i) => (
              <Link key={brand.id} to={`/brands/${brand.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-[2rem] border border-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden min-h-[220px] flex items-center"
                >
                  {/* Hover Border/Accent */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-[2rem] transition-colors duration-300 pointer-events-none" />

                  {/* Decorative Elements on the left (since RTL) */}
                  <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-10 -left-10 opacity-0 group-hover:opacity-5 transition-opacity duration-500 transform group-hover:scale-110">
                    <Sparkles className="w-40 h-40 text-primary" strokeWidth={1} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-start z-10 w-full relative">
                    {/* Logo Placeholder Box instead of a circle */}
                    <div className="mb-4 bg-background px-5 py-2.5 rounded-xl border border-border text-foreground font-bold tracking-widest text-lg md:text-xl group-hover:text-primary transition-colors shadow-sm inline-block">
                      {brand.name}
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base font-medium mb-6 leading-relaxed max-w-[280px]">
                      {brand.desc}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm md:text-base mt-auto">
                      <span className="relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all group-hover:after:w-full">
                        استكشفي المنتجات
                      </span>
                      <ChevronLeft
                        className="size-4 md:size-5 transition-transform duration-300 group-hover:-translate-x-2"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 text-sm font-bold bg-primary text-white px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:bg-primary-deep transition-all active:scale-95"
            >
              اكتشفي منتجات العناية
              <ChevronLeft className="size-4" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. Offers Banner - Background: Warm Off White */}
      <section className="bg-background py-24 relative z-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden bg-primary px-8 py-16 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 shadow-float"
          >
            {/* Banner Decorative Shapes */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <svg
              className="absolute -top-10 -right-10 w-64 h-64 text-white opacity-10 pointer-events-none"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path d="M100 0C100 0 150 40 180 100C210 160 150 200 100 200C50 200 -10 160 20 100C50 40 100 0 100 0Z" />
            </svg>

            <div className="relative z-10 text-center md:text-start">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-white text-sm font-bold mb-6 backdrop-blur-md">
                <Tag className="size-4" /> فرصة ذهبية
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">عروض مختارة لكِ</h2>
              <p className="text-white/80 font-medium text-lg max-w-md">
                استمتعي بخصومات حصرية ولفترة محدودة على منتجاتك المفضلة من لوليتا ومنتجات العناية
                العالمية.
              </p>
            </div>

            <div className="relative z-10">
              <Link
                to="/offers"
                className="inline-flex items-center gap-3 bg-white text-primary px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                شاهدي العروض
                <ChevronLeft className="size-5" strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Loleta - Background: Soft Cream */}
      <section className="bg-card py-24 relative z-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 relative inline-block">
              لماذا لوليتا؟
              <div className="absolute -bottom-3 right-1/4 w-1/2 h-1 bg-primary/20 rounded-full" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center flex flex-col items-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-white group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300">
                  <feature.icon className="size-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-[200px]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA - Background: Very Light Sage Green -> Blush Beige Gradient */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#EEF1E3] to-[#F3E4E2]">
        {/* Soft Organic Background */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 bg-white/60 rounded-full backdrop-blur-md shadow-sm border border-white flex items-center justify-center mb-8"
          >
            <Sparkles className="size-10 text-primary" strokeWidth={1.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight"
          >
            جمالك يبدأ بعناية تناسبك
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg font-medium text-foreground/80 max-w-xl mb-12"
          >
            سواء كنتِ تبحثين عن التفتيح، الترطيب العميق، أو محاربة علامات التقدم بالسن، لدينا الحل
            الأمثل لبشرتك.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/loleta-products"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-primary-deep active:scale-95 transition-all"
            >
              تسوقي منتجات لوليتا
            </Link>
            <Link
              to="/brands"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-bold shadow-sm border border-white hover:shadow-md hover:bg-white/80 active:scale-95 transition-all"
            >
              اكتشفي منتجات العناية
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
