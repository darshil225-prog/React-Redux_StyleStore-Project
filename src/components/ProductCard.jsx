import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const [added, setAdded] = useState(false);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/products/watch-1.jpg';
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={handleImageError}
          loading="lazy"
        />
        <span className="product-category-tag">{product.category}</span>
        <button
          type="button"
          className={`wishlist-heart-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-bottom">
          <span className="product-price">${product.price}</span>
          <button
            type="button"
            className={`add-to-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
