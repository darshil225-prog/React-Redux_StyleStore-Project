import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
                <button
          type="button"
          className="logo-btn"
          onClick={() => handleNavClick('home')}
        >
          Style<span>Store</span>
        </button>

                <div className="nav-search-wrapper desktop-search">
          <span className="nav-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search watches, sunglasses, bags, wallets..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'home') {
                setActiveTab('home');
              }
            }}
            className="nav-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="nav-clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

                <nav className="nav-links desktop-nav">
          <button
            type="button"
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-btn wishlist-btn-nav ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => handleNavClick('wishlist')}
          >
            Wishlist {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
          </button>
          <button
            type="button"
            className={`nav-btn cart-btn-nav ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => handleNavClick('cart')}
          >
            Cart <span className="cart-badge">{totalCartCount}</span>
          </button>
          <button
            type="button"
            className={`nav-btn profile-btn-nav ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavClick('profile')}
          >
            👤 Profile
          </button>
        </nav>

                <div className="mobile-actions-right">
          <button
            type="button"
            className="mobile-quick-cart-btn"
            onClick={() => handleNavClick('cart')}
            title="Cart"
          >
            🛒 <span className="cart-badge">{totalCartCount}</span>
          </button>
          <button
            type="button"
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

            <div className="mobile-search-row">
        <div className="nav-search-wrapper mobile-search">
          <span className="nav-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search watches, bags, wallets..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'home') {
                setActiveTab('home');
              }
            }}
            className="nav-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="nav-clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

            {mobileMenuOpen && (
        <nav className="mobile-menu-dropdown">
          <button
            type="button"
            className={`mobile-menu-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            🏠 Home
          </button>
          <button
            type="button"
            className={`mobile-menu-item ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => handleNavClick('wishlist')}
          >
            ♡ Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </button>
          <button
            type="button"
            className={`mobile-menu-item ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => handleNavClick('cart')}
          >
            🛒 Shopping Cart {totalCartCount > 0 && `(${totalCartCount})`}
          </button>
          <button
            type="button"
            className={`mobile-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavClick('profile')}
          >
            👤 Customer Profile
          </button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;

