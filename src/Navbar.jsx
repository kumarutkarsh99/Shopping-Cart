import React from 'react';
import { NavLink } from 'react-router-dom';

const ShopCart = () => {
  return (
    <nav className="nav" >
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Products
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Cart
              </NavLink>
              </nav>
  );
};

export default ShopCart;
