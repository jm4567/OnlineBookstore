import { createContext, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem, quantity?: number) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  quantities: { [key: number]: number };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const addToCart = (item: CartItem, quantity = 1) => {
    setCart((prev) => [...prev, item]);
    setQuantities((prev) => ({ ...prev, [item.bookId]: quantity }));
  };

  const removeFromCart = (bookId: number) => {
    setCart((prev) => prev.filter((item) => item.bookId !== bookId));
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[bookId];
      return newQuantities;
    });
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [bookId]: quantity > 0 ? quantity : 1,
    }));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, quantities }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
