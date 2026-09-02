
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { MapPin, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/branches")({
  component: BranchesPage,
});

const BRANCHES = [
  { name: "فرع الرياض بارك", city: "الرياض", area: "العقيق", address: "الرياض بارك مول، البوابة ٢", phone: "٠٥٠٠٠٠٠٠٠١", hours: "١٠ ص - ١١ م" },
  { name: "فرع جدة", city: "جدة", area: "الشاطئ", address: "رد سي مول، الدور الأرضي", phone: "٠٥٠٠٠٠٠٠٠٢", hours: "٩ ص - ١١:٣٠ م" },
];

function BranchesPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans pb-20">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">فروعنا</h1>
          <p className="text-muted-foreground font-medium">نسعد بزيارتكم في أقرب فرع إليكم لتجربة منتجاتنا الفاخرة.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass bg-[#F3E4E2] border-white/50 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold text-foreground mb-1">{branch.name}</h2>
              <p className="text-sm font-bold text-primary mb-6">{branch.city} - {branch.area}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-muted-foreground font-medium">
                  <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground font-medium">
                  <Phone className="size-5 text-primary shrink-0" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground font-medium">
                  <Clock className="size-5 text-primary shrink-0" />
                  <span>{branch.hours}</span>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                عرض على الخريطة
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
