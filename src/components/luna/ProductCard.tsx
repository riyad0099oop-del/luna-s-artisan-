import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "@tanstack/react-router";

export interface Product {
  id?: string;
  name: string;
  note: string;
  price: string;
  oldPrice?: string;
  image: string;
  tag?: string;
  brand?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only navigate if we have a product ID and the click was not on the "Add to cart" button
    if (product.id) {
      navigate({ to: '/products/$productId', params: { productId: product.id } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "50px" }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        cursor: product.id ? "pointer" : "default"
      }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-[1.5rem] bg-card p-3 sm:p-4 shadow-sm border border-border/50 hover:shadow-float transition-all duration-300 active:shadow-sm"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative mb-3 sm:mb-4 aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted/40 isolate"
      >
        {/* Soft decorative background shape inside image container */}
        <div className="absolute inset-0 bg-primary/5 -z-10 mix-blend-multiply" />

        <motion.img
          initial={{ opacity: 0.8, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          loading="lazy"
        />
        {product.tag && (
          <div className="absolute left-2 sm:left-3 top-2 sm:top-3 rounded-full bg-white/90 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-primary shadow-sm backdrop-blur-md">
            {product.tag}
          </div>
        )}
        {product.brand && (
          <div className="absolute right-2 sm:right-3 top-2 sm:top-3 rounded-full bg-white/90 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-foreground shadow-sm backdrop-blur-md">
            {product.brand}
          </div>
        )}
        <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 flex translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex h-9 sm:h-11 w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary/90 backdrop-blur-md md:bg-primary text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-primary-deep transition-colors active:scale-95"
          >
            <Plus className="size-3.5 sm:size-4" strokeWidth={2.5} />{" "}
            <span className="hidden sm:inline">إضافة للسلة</span>
            <span className="sm:hidden">إضافة</span>
          </button>
        </div>
      </div>
      <div className="px-1" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-sm sm:text-base font-bold text-foreground truncate">{product.name}</h3>
        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-medium text-muted-foreground line-clamp-2 break-words">
          {product.note}
        </p>
        <div className="mt-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold">
          <span className="text-primary text-sm sm:text-base">{product.price}</span>
          {product.oldPrice && (
            <span className="text-[10px] sm:text-xs text-muted-foreground/60 line-through decoration-muted-foreground/40">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
