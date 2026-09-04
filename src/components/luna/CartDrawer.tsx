import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, totalItems, subtotal } =
    useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate({ to: "/checkout" });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-border">
              <div className="flex items-center gap-3 text-primary">
                <ShoppingBag className="size-6" strokeWidth={2} />
                <h2 className="text-xl font-bold">سلة المشتريات</h2>
                {totalItems > 0 && (
                  <span className="bg-primary/10 text-primary text-sm font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-black/5 transition-colors active:scale-95"
              >
                <X className="size-6 text-foreground/70" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
                  <div className="w-24 h-24 bg-[#F3E4E2] rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="size-10 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">سلتك ما زالت فارغة</h3>
                  <p className="text-muted-foreground font-medium mb-8 max-w-[200px]">
                    اختاري منتجاتك المفضلة وابدئي التسوق الآن
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-primary-deep active:scale-95 transition-all"
                  >
                    ابدئي التسوق
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.name}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-4 bg-white p-4 rounded-2xl border border-border/50 shadow-sm relative group"
                    >
                      {/* Image */}
                      <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden bg-[#F4EEE6]">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col flex-1 justify-between py-1">
                        <div>
                          <h4 className="font-bold text-foreground line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-sm font-medium text-primary mt-1">
                            {item.product.price}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-background rounded-full border border-border px-3 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.name, -1)}
                              className="text-foreground/70 hover:text-primary transition-colors active:scale-90"
                            >
                              <Minus className="size-4" strokeWidth={2.5} />
                            </button>
                            <span className="font-bold text-sm w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.name, 1)}
                              className="text-foreground/70 hover:text-primary transition-colors active:scale-90"
                            >
                              <Plus className="size-4" strokeWidth={2.5} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.name)}
                            className="p-2 text-foreground/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors active:scale-90"
                          >
                            <Trash2 className="size-5" strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/70 font-bold text-lg">المجموع الفرعي</span>
                  <span className="text-2xl font-bold text-primary">
                    {subtotal} <span className="text-sm">ر.س</span>
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg shadow-md hover:shadow-lg hover:bg-primary-deep active:scale-95 transition-all"
                  >
                    إتمام الطلب
                  </button>
                  <button
                    onClick={closeCart}
                    className="w-full bg-background text-foreground/80 py-4 rounded-full font-bold hover:bg-[#EEF1E3] hover:text-primary active:scale-95 transition-all"
                  >
                    متابعة التسوق
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
