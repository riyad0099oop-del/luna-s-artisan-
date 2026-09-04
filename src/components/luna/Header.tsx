import { motion } from "motion/react";
import { useState } from "react";
import { Menu, ShoppingBag, Search, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

import logoUrl from "@/assets/loleta-logo.jpg";

import { useCart } from "@/context/CartContext";

const LINKS = [
  { label: "الرئيسية", to: "/" },
  { label: "منتجات لوليتا", to: "/loleta-products" },
  { label: "منتجات العناية", to: "/brands" },
  { label: "العروض", to: "/offers" },
  { label: "من نحن", to: "/about" },
  { label: "الفروع", to: "/branches" },
  { label: "تواصل معنا", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4"
    >
      <nav className="bg-[#F3EBDD]/90 backdrop-blur-md shadow-sm border border-[#E9DDCE] mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoUrl}
            alt="شعار Loleta Store الرسمي"
            className="size-11 rounded-full object-cover bg-white ring-1 ring-border/40"
            loading="eager"
          />
          <span className="text-lg font-normal tracking-tight">
            Loleta <span className="text-primary">Store</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-light md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="line-underline text-foreground/80 hover:text-foreground [&.active]:text-foreground [&.active]:font-normal"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="بحث"
            className="organic-pulse hidden size-10 items-center justify-center rounded-full text-foreground/70 hover:text-primary sm:flex"
          >
            <Search className="size-5" strokeWidth={1.3} />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label="سلة المشتريات"
            className="organic-pulse relative flex size-10 items-center justify-center rounded-full text-foreground/70 hover:text-primary transition-colors"
          >
            <ShoppingBag className="size-5" strokeWidth={1.3} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -end-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="organic-pulse flex size-10 items-center justify-center rounded-full text-foreground/70 md:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.3} />
            ) : (
              <Menu className="size-5" strokeWidth={1.3} />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <motion.ul
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#F3EBDD]/90 backdrop-blur-md shadow-sm border border-[#E9DDCE]-olive mx-auto mt-2 max-w-6xl space-y-1 rounded-3xl p-3 text-sm md:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                className="organic-pulse block rounded-2xl px-4 py-3 text-foreground/85 [&.active]:bg-secondary/10 [&.active]:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      ) : null}
    </motion.header>
  );
}
