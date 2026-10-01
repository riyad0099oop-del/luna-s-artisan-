import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import heroImg from "@/assets/product-blend.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-sans pb-20">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px]"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] translate-x-4 translate-y-4" />
            <img
              src={heroImg}
              alt="عن لونا"
              className="relative z-10 w-full h-full object-cover rounded-[3rem]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl font-bold text-primary">عن Luna Store</h1>
            <p className="text-muted-foreground font-medium leading-relaxed">
              تأسس متجر لونا بشغف تقديم الأفضل في عالم العناية بالبشرة والجمال العضوي. نحن نؤمن بأن
              الطبيعة تحمل أسرار النضارة الحقيقية، ولذلك ننتقي كل منتج بعناية فائقة لضمان الجودة
              والفعالية.
            </p>
            <h2 className="text-2xl font-bold text-foreground mt-4">رؤيتنا</h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              أن نكون الوجهة الأولى لكل امرأة تبحث عن منتجات عناية آمنة، طبيعية، وفاخرة تدلل بها
              بشرتها وتعزز ثقتها بجمالها.
            </p>
            <h2 className="text-2xl font-bold text-foreground mt-4">لماذا لونا؟</h2>
            <ul className="list-disc list-inside text-muted-foreground font-medium space-y-2">
              <li>منتجات عضوية خالية من المواد الضارة.</li>
              <li>اختيارات حصرية من أفضل العلامات العالمية.</li>
              <li>جودة مضمونة ونتائج ملحوظة.</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
