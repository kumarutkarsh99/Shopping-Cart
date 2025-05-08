import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  function onAdd() {
    if (product.quantity <= 0) {
      alert(`${product.name} is out of stock.`);
      return;
    }
    addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  return (
    <div className="card" role="listitem" style={{ position: 'relative' }}>
      {product.quantity > 0 && product.quantity <= 6 && (
        <div className="badge">Finishing Fast</div>
      )}
      <div className="product-wrapper">
      <img
        src={product.image}
        alt={product.name}
        onError={e => (e.currentTarget.src = '/assets/placeholder.png')}
      />
      </div>
      <h3>{product.name}</h3>
      <p className='category-pro'>{product.category}</p>
      <p>₹{product.price.toFixed(2)}</p>
      <p>Available: {product.quantity}</p>
      <button className='add-button' onClick={onAdd} disabled={product.quantity <= 0}>
        {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}