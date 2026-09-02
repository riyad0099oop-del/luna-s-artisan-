
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/luna/Header";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans pb-20">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-32 md:pt-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">تواصل معنا</h1>
          <p className="text-muted-foreground font-medium">نحن هنا للإجابة على جميع استفساراتك ومساعدتك في العناية بجمالك.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
            <div className="glass bg-white p-8 rounded-3xl flex items-center gap-6">
              <div className="bg-secondary/10 p-4 rounded-full text-secondary"><Phone className="size-6" /></div>
              <div>
                <h3 className="font-bold text-foreground">اتصل بنا</h3>
                <p className="text-muted-foreground font-medium mt-1">٠٥٠٠٠٠٠٠٠٠</p>
              </div>
            </div>
            <div className="glass bg-white p-8 rounded-3xl flex items-center gap-6">
              <div className="bg-primary/10 p-4 rounded-full text-primary"><MessageCircle className="size-6" /></div>
              <div>
                <h3 className="font-bold text-foreground">واتساب</h3>
                <p className="text-muted-foreground font-medium mt-1">٠٥٠٠٠٠٠٠٠٠</p>
              </div>
            </div>
            <div className="glass bg-white p-8 rounded-3xl flex items-center gap-6">
              <div className="bg-secondary/10 p-4 rounded-full text-secondary"><Mail className="size-6" /></div>
              <div>
                <h3 className="font-bold text-foreground">البريد الإلكتروني</h3>
                <p className="text-muted-foreground font-medium mt-1">info@loletastore.com</p>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass bg-white p-8 md:p-12 rounded-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">أرسل رسالة</h2>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">الاسم</label>
                <input type="text" className="w-full rounded-xl border-border bg-muted/30 px-4 py-3 font-medium outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="الاسم الكريم" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">رقم التواصل أو الإيميل</label>
                <input type="text" className="w-full rounded-xl border-border bg-muted/30 px-4 py-3 font-medium outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="كيف يمكننا التواصل معك؟" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">عنوان الرسالة</label>
                <input type="text" className="w-full rounded-xl border-border bg-muted/30 px-4 py-3 font-medium outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="موضوع الرسالة" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">الرسالة</label>
                <textarea rows={4} className="w-full rounded-xl border-border bg-muted/30 px-4 py-3 font-medium outline-none focus:border-secondary focus:ring-1 focus:ring-secondary resize-none" placeholder="اكتب رسالتك هنا..."></textarea>
              </div>
              <button className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors mt-2">
                إرسال الرسالة
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
