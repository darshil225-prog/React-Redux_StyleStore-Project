import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Home({ searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Watches', 'Sunglasses', 'Bags', 'Wallets'];

  // Combined search and category filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
            <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tag">New Collection 2026</span>
            <h1 className="hero-title">Discover Your Style</h1>
            <p className="hero-description">
              Find the perfect accessories for your everyday look. Carefully curated watches, sunglasses, bags, and leather wallets.
            </p>
            <a href="#products-section" className="hero-cta-btn">
              Explore Collection
            </a>
          </div>
          <div className="hero-image-wrapper">
            <img
              src="/hero-banner.jpg"
              alt="Fashion Accessories Banner"
              className="hero-banner-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

            <section id="products-section" className="products-section">
        <div className="section-header">
          <h2 className="section-title">Our Accessories</h2>
          <p className="section-subtitle">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </p>
        </div>

                <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

                {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-card">
            <div className="no-products-icon">🔍</div>
            <h3>No products found</h3>
            <p>
              No accessories match "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;

