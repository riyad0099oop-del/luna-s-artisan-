import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { type Product } from "@/components/luna/ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, delta: number) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to parse localized price strings like "??? ????" to numbers
const parsePrice = (priceStr: string): number => {
  // Convert Arabic numerals to English numerals
  const englishStr = priceStr.replace(/[?-?]/g, (d) => "0123456789"["??????????".indexOf(d)]);
  // Extract the number
  const match = englishStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("luna_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("luna_cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    toast.success("??? ????? ?????? ??? ?????", {
      style: {
        background: "#F8F4EE",
        color: "#9E3443",
        border: "1px solid #F3E4E2",
        borderRadius: "1rem",
        fontWeight: "bold",
        fontFamily: "Tajawal",
      },
      position: "bottom-center",
    });
  };

  const removeFromCart = (productName: string) => {
    setItems((prev) => prev.filter((item) => item.product.name !== productName));
  };

  const updateQuantity = (productName: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.name === productName) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: newQ > 0 ? newQ : 1 };
        }
        return item;
      }),
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
