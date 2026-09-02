import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "منتجات العناية — شركات عالمية" },
      { name: "description", content: "تسوقي منتجات العناية بالبشرة من أفضل الشركات العالمية." },
    ],
  }),
  component: BrandsIndex,
});

const BRANDS = [
  { id: "bioderma", name: "Bioderma", desc: "العناية الطبية بالبشرة", color: "primary" },
  { id: "byphasse", name: "Byphasse", desc: "منتجات تجميل وعناية عالية الجودة", color: "secondary" },
  { id: "bio-balance", name: "Bio Balance", desc: "توازن الطبيعة والعلوم", color: "primary" },
  { id: "cavali", name: "Cavali", desc: "لمسات الأناقة والجمال", color: "secondary" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function BrandsIndex() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background pb-20">
      <Header />
      
      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 text-center md:text-start"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            منتجات <span className="text-primary">العناية</span>
          </h1>
          <p className="mt-4 text-base font-medium leading-relaxed text-muted-foreground md:max-w-xl">
            اكتشفي تشكيلتنا المختارة بعناية من أفضل العلامات التجارية العالمية لروتين عنايتك اليومي.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {BRANDS.map((brand, i) => {
            const isPrimary = brand.color === 'primary';
            const bgClass = isPrimary ? 'bg-card border-border' : 'bg-[#F1F4EE] border-secondary/20';
            const accentClass = isPrimary ? 'text-primary' : 'text-secondary';
            const hoverBgClass = isPrimary ? 'group-hover:bg-primary/5' : 'group-hover:bg-secondary/5';

            return (
              <Link key={brand.id} to={`/brands/${brand.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] p-10 shadow-sm border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 min-h-[300px] active:shadow-sm ${bgClass}`}
                >
                  <div className={`absolute inset-0 transition-colors duration-500 ${hoverBgClass}`} />
                  
                  {/* Decorative corner accent */}
                  <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-10 blur-2xl transition-transform duration-700 group-hover:scale-150 ${isPrimary ? 'bg-primary' : 'bg-secondary'}`} />

                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold tracking-wide text-foreground uppercase mb-2">{brand.name}</h2>
                      <p className="text-sm font-medium text-muted-foreground">{brand.desc}</p>
                    </div>
                    {/* Placeholder for Brand Logo / Icon */}
                    <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white flex items-center justify-center shrink-0">
                      <span className={`text-xl font-bold ${accentClass}`}>{brand.name[0]}</span>
                    </div>
                  </div>

                  <div className={`relative z-10 flex items-center gap-2 mt-8 font-bold ${accentClass}`}>
                    <span className="text-sm">عرض المنتجات</span>
                    <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-2" strokeWidth={2.5} />
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  );
}
