import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logoUrl from "@/assets/luna-logo.jpg";

export function Footer() {
  return (
    <footer className="bg-primary text-white px-5 pt-20 pb-10 mt-20 relative overflow-hidden">
      {/* Botanical decorative accent in background */}
      <svg
        className="absolute -top-24 -right-24 w-96 h-96 text-white opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100 0C100 0 150 40 180 100C210 160 150 200 100 200C50 200 -10 160 20 100C50 40 100 0 100 0Z" />
      </svg>
      <svg
        className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] text-primary-deep opacity-30 pointer-events-none"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100 0C100 0 150 40 180 100C210 160 150 200 100 200C50 200 -10 160 20 100C50 40 100 0 100 0Z" />
      </svg>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16">
          <div className="flex flex-col items-start">
            <Link
              to="/"
              className="inline-block mb-6 bg-white p-3 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform"
            >
              <img src={logoUrl} alt="Luna Store" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-sm font-medium leading-relaxed text-white/90">
              منتجات مختارة بعناية لتمتعي ببشرة صحية ونضارة طبيعية كل يوم. الجمال العضوي بين يديك.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-white/95 border-b border-white/20 pb-2 inline-block">
              روابط سريعة
            </h3>
            <ul className="space-y-3 text-sm font-medium text-white/85">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> من نحن
                </Link>
              </li>
              <li>
                <Link
                  to="/branches"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> الفروع
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-white/95 border-b border-white/20 pb-2 inline-block">
              التسوق
            </h3>
            <ul className="space-y-3 text-sm font-medium text-white/85">
              <li>
                <Link
                  to="/luna-products"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> منتجات لونا
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> منتجات العناية
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> العروض الخاصة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-white/95 border-b border-white/20 pb-2 inline-block">
              تابعونا
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 hover:-translate-y-1 transition-all shadow-sm"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 hover:-translate-y-1 transition-all shadow-sm"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 hover:-translate-y-1 transition-all shadow-sm"
              >
                <Twitter className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-white/80">
          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} Luna Store. جميع الحقوق محفوظة.</p>
            <p className="text-white/60 text-xs">
              تم التطوير بواسطة{" "}
              <a
                href="https://wa.me/967714191142"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-white/80 transition-colors inline-flex items-center gap-1"
                title="تواصل معنا عبر واتساب"
              >
                شركة تكنيك
                <span
                  dir="ltr"
                  className="inline-block text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full ml-1"
                >
                  +967 714191142
                </span>
              </a>
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to="/admin/login"
              className="hover:text-white transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
            >
              دخول الإدارة
            </Link>
            <span className="opacity-40">|</span>
            <span>سياسة الخصوصية</span>
            <span>الشروط والأحكام</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
