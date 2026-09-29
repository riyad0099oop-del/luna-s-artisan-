import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { brandService } from "@/services/brandService";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "منتجات العناية — شركات عالمية" },
      { name: "description", content: "تسوقي منتجات العناية بالبشرة من أفضل الشركات العالمية." },
    ],
  }),
  component: BrandsIndex,
});

const ease = [0.22, 1, 0.36, 1] as const;

function BrandsIndex() {
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: brandService.getAll,
  });

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

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">جاري التحميل...</div>
        ) : brands.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">لا توجد شركات مضافة حالياً.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2">
            {brands.map((brand, i) => (
              <Link key={brand.id} to={`/brands/${brand.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 shadow-sm border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 min-h-[160px] sm:min-h-[300px] active:shadow-sm bg-card border-border"
                >
                  <div className="absolute inset-0 transition-colors duration-500 group-hover:bg-primary/5" />

                  {/* Decorative corner accent */}
                  <div className="absolute -top-12 -left-12 w-24 h-24 sm:-top-24 sm:-left-24 sm:w-48 sm:h-48 rounded-full opacity-10 blur-xl sm:blur-2xl transition-transform duration-700 group-hover:scale-150 bg-primary" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between items-start gap-3 sm:gap-0">
                    <div className="order-2 sm:order-1">
                      <h2 className="text-lg sm:text-3xl font-bold tracking-wide text-foreground uppercase mb-1 sm:mb-2">
                        {brand.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none leading-relaxed">
                        {brand.shortDescription || "منتجات عناية بالبشرة"}
                      </p>
                    </div>
                    {/* Brand Logo or initials */}
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white flex items-center justify-center shrink-0 overflow-hidden order-1 sm:order-2">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-sm sm:text-xl font-bold text-primary">
                          {brand.name[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-1 sm:gap-2 mt-4 sm:mt-8 font-bold text-primary">
                    <span className="text-[10px] sm:text-sm hidden sm:inline">عرض المنتجات</span>
                    <span className="text-[10px] sm:hidden">عرض</span>
                    <ChevronLeft
                      className="size-3 sm:size-4 transition-transform duration-300 group-hover:-translate-x-1 sm:group-hover:-translate-x-2"
                      strokeWidth={2.5}
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
