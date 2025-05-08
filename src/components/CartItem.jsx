import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="item-main">
        <div className="image-wrapper">
          <img
            src={item.image}
            alt={item.name}
            onError={e => (e.currentTarget.src = '/assets/placeholder.png')}
          />
        </div>

        <div className="item-info">
          <strong>{item.name}</strong>
          <p>₹{item.price.toFixed(2)} each</p>
          <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
          <div className="qty-controls">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              –
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => updateQuantity(item.id, +e.target.value)}
            />
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
          <button 
            className="remove-btn" 
            aria-label={`Remove ${item.name} from cart`} 
            onClick={() => removeFromCart(item.id)}>
              Remove
          </button>
        </div>
        </div>
    </div>
  );
}