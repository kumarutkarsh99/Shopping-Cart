import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function CartPage() {
  const { cart, total, handleCheckout } = useCart();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty. <a href="/products">Browse products</a>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Grand Total: ₹{total.toFixed(2)}</h3>
            <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
