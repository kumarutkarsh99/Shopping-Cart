// src/App.jsx
import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider }     from './context/CartContext';
import ProductsPage         from './pages/ProductsPage';
import CartPage             from './pages/CartPage';
import Navbar from './Navbar'

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Navbar/>

        <div className="container">
          <Routes>
            <Route path="/"        element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart"     element={<CartPage />} />
            <Route path="*"         element={<h2>404: Page Not Found</h2>} />
          </Routes>
        </div>
      </CartProvider>
    </ProductsProvider>
  );
}
