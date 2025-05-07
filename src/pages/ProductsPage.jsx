import React, { useState, useMemo } from 'react';
import { Slider, Box, Typography } from '@mui/material';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const { products } = useProducts();
  const [filter, setFilter] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [search, setSearch] = useState('');

  const categories = useMemo(
    () => ['All', ...new Set(products.map(p => p.category))],
    [products]
  );

  const filtered = useMemo(
    () =>
      products.filter(p => {
        const okCat = filter === 'All' || p.category === filter;
        const okPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const okText = p.name.toLowerCase().includes(search.toLowerCase());
        return okCat && okPrice && okText;
      }),
    [products, filter, priceRange, search]
  );

  return (
    <div className="product-list">
      <div className="products-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Explore Products</h1>
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search products"
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '250px'
          }}
        />
      </div>

      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <div style={{ width: '40%'}}>
          <label>
            Category: 
            <select
              className="select-menu"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              aria-label="Filter products by category"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Box sx={{ width: '60%', mr: 3 }}>
          <Typography gutterBottom>Price (₹)</Typography>
          <Slider
            value={priceRange}
            onChange={(_, v) => setPriceRange(v)}
            min={0}
            max={1500}
            step={50}
            marks={[
              { value: 0, label: '₹0' },
              { value: 1500, label: '₹1500' }
            ]}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>

      <div className="grid" role="list">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}