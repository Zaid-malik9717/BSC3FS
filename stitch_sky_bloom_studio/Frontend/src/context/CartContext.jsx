import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('flora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [giftNote, setGiftNote] = useState(() => {
    try {
      const saved = localStorage.getItem('flora_gift_note');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('flora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (giftNote) {
        localStorage.setItem('flora_gift_note', JSON.stringify(giftNote));
      } else {
        localStorage.removeItem('flora_gift_note');
      }
    } catch (e) {
      console.error(e);
    }
  }, [giftNote]);

  const addToCart = (item) => {
    setCartItems(prev => {
      // If it's a standard item with same id and options, increase quantity
      const existingIndex = prev.findIndex(i => 
        i.id === item.id && 
        i.selectedOption?.label === item.selectedOption?.label &&
        i.includeVase === item.includeVase &&
        !i.isCustomBouquet
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }

      return [...prev, { ...item, uniqueKey: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, quantity: item.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (uniqueKey) => {
    setCartItems(prev => prev.filter(item => (item.uniqueKey || item.id) !== uniqueKey));
  };

  const updateQuantity = (uniqueKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(uniqueKey);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if ((item.uniqueKey || item.id) === uniqueKey) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    setGiftNote(null);
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FLORA10' || clean === 'WELCOME10') {
      setPromoCode(clean);
      setDiscountPercent(0.10);
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'AZURE20') {
      setPromoCode(clean);
      setDiscountPercent(0.20);
      return { success: true, message: '20% special discount applied!' };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountPercent;
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      giftNote,
      setGiftNote,
      isCartOpen,
      setIsCartOpen,
      promoCode,
      discountPercent,
      applyPromo,
      subtotal,
      discountAmount,
      shippingFee,
      estimatedTax,
      total,
      totalItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
