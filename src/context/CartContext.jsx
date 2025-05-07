import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useProducts } from './ProductsContext';

export const CartContext = createContext(null);
CartContext.displayName = 'CartContext';

export function useCart() {
  return useContext(CartContext);
}

const CART_KEY = 'shopping_cart';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id);
      if (exists) {
        return state.map(i =>
          i.id === action.product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'UPDATE':
      return state.map(i =>
        i.id === action.id
          ? { ...i, quantity: Math.max(1, action.quantity) }
          : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { decrementStock, getProductById } = useProducts();

  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      const raw = window.localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    }
  );

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const safeDispatch = action => {
    if (action.type === 'ADD') {
      const product = getProductById(action.product.id);
      const itemInCart = cart.find(i => i.id === product.id);
      const currentQty = itemInCart ? itemInCart.quantity : 0;

      if (currentQty + 1 > product.quantity) {
        alert(`Only ${product.quantity} items in stock.`);
        return;
      }
    }

    if (action.type === 'UPDATE') {
      const product = getProductById(action.id);
      if (action.quantity > product.quantity) {
        alert(`Only ${product.quantity} items in stock.`);
        return;
      }
    }

    dispatch(action);
  };

  const addToCart      = product => safeDispatch({ type: 'ADD', product });
  const removeFromCart = id      => safeDispatch({ type: 'REMOVE', id });
  const updateQuantity = (id, quantity) =>
    safeDispatch({ type: 'UPDATE', id, quantity });
  const clearCart      = ()      => safeDispatch({ type: 'CLEAR' });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function handleCheckout() {
    decrementStock(cart);
    clearCart();
    alert('Checkout successful!');
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
