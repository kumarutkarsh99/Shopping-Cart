import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleProducts } from '../data/sampleProducts';

export const ProductsContext = createContext(null);
ProductsContext.displayName = 'ProductsContext';

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return {
    ...context,
    getProductById: id => context.products.find(p => p.id === id),
  };
}


const STORAGE_KEY = 'products_stock';

export function ProductsProvider({ children }) {
  // 1) init from localStorage or fallback:
  const [products, setProducts] = useState(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : sampleProducts;
  });

  // 2) sync back to localStorage on every change:
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // 3) called on checkout
  function decrementStock(cartItems) {
    setProducts(current =>
      current.map(prod => {
        const inCart = cartItems.find(ci => ci.id === prod.id);
        if (!inCart) return prod;
        return {
          ...prod,
          quantity: Math.max(0, prod.quantity - inCart.quantity),
        };
      })
    );
  }

  return (
    <ProductsContext.Provider value={{ products, decrementStock }}>
      {children}
    </ProductsContext.Provider>
  );
}
