import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../redux/cartSlice';

function Cart({ onContinueShopping, onProceedToCheckout }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/products/watch-1.jpg';
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any fashion accessories yet.</p>
          <button
            type="button"
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <button
            type="button"
            className="clear-cart-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-layout">
                    <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    onError={handleImageError}
                  />
                </div>

                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <span className="cart-item-unit-price">${item.price} each</span>
                </div>

                                <div className="cart-item-quantity">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    title="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                                <div className="cart-item-total">
                  ${item.price * item.quantity}
                </div>

                                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

                    <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="free-shipping-tip">
                Add <strong>${100 - subtotal}</strong> more to qualify for FREE shipping!
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button
              type="button"
              className="checkout-btn"
              onClick={onProceedToCheckout}
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              className="continue-btn-secondary"
              onClick={onContinueShopping}
            >
              ← Back to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

