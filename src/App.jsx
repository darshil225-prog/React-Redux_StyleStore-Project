import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import './App.css';

function App() {
  // Navigation tabs: 'home' | 'wishlist' | 'cart' | 'checkout' | 'confirmation' | 'profile'
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleOrderPlaced = (orderDetails) => {
    setCompletedOrder(orderDetails);
    setActiveTab('confirmation');
  };

  return (
    <div className="app">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main>
        {activeTab === 'home' && (
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onGoToCart={() => setActiveTab('cart')}
          />
        )}
        {activeTab === 'wishlist' && (
          <Wishlist onContinueShopping={() => setActiveTab('home')} />
        )}
        {activeTab === 'cart' && (
          <Cart
            onContinueShopping={() => setActiveTab('home')}
            onProceedToCheckout={() => setActiveTab('checkout')}
          />
        )}
        {activeTab === 'checkout' && (
          <Checkout
            onBackToCart={() => setActiveTab('cart')}
            onOrderPlaced={handleOrderPlaced}
          />
        )}
        {activeTab === 'confirmation' && (
          <OrderConfirmation
            orderDetails={completedOrder}
            onContinueShopping={() => setActiveTab('home')}
          />
        )}
        {activeTab === 'profile' && (
          <Profile />
        )}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 StyleStore — Fashion Accessories Shopping. All rights reserved.</p>
          <p>Handcrafted accessories for your unique everyday style.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
