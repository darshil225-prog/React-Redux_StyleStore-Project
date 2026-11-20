import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';

function Wishlist({ onContinueShopping }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/products/watch-1.jpg';
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">♡</div>
          <h2>Your Wishlist is Empty</h2>
          <p>You haven't saved any fashion items to your wishlist yet.</p>
          <button
            type="button"
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Wishlist</h1>
          <span className="wishlist-count-badge">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </span>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <div key={product.id} className="wishlist-card">
              <div className="wishlist-img-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wishlist-img"
                  onError={handleImageError}
                />
                <button
                  type="button"
                  className="remove-wishlist-icon-btn"
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>

              <div className="wishlist-info">
                <span className="wishlist-cat">{product.category}</span>
                <h3 className="wishlist-name">{product.name}</h3>
                <span className="wishlist-price">${product.price}</span>

                <div className="wishlist-actions">
                  <button
                    type="button"
                    className="add-to-cart-btn"
                    style={{ width: '100%' }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-footer-action">
          <button
            type="button"
            className="continue-btn-secondary"
            onClick={onContinueShopping}
          >
            ← Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
