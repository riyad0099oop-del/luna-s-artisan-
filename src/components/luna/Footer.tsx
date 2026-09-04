import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logoUrl from "@/assets/loleta-logo.jpg";

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
              className="flex items-center gap-3 mb-6 bg-white/10 p-2 pr-2 pl-6 rounded-full backdrop-blur-sm"
            >
              <img
                src={logoUrl}
                alt="Loleta Store"
                className="h-12 w-12 rounded-full object-cover shadow-md"
              />
              <span className="text-xl font-bold tracking-wide">Loleta Store</span>
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
                  to="/loleta-products"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> منتجات لوليتا
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
          <p>© {new Date().getFullYear()} Loleta Store. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 items-center">
            <Link to="/admin/login" className="hover:text-white transition-colors flex items-center gap-1 opacity-70 hover:opacity-100">
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
