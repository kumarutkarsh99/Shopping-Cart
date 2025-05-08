import React from 'react';
import { NavLink } from 'react-router-dom';

const ShopCart = () => {
  return (
    <nav className="nav" >
      <div className='navdiv'>
        <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? 'active' : 'not-active')}
        >
                Products
        </NavLink>
        <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? 'active' : 'not-active')}
        >
          Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default ShopCart;
