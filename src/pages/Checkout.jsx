import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

function Checkout({ onBackToCart, onOrderPlaced }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod', // Cash on Delivery (ideal for college demo)
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderDetails = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customer: formData,
      items: cartItems,
      totalAmount: total,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    // Clear cart in Redux and localStorage
    dispatch(clearCart());

    // Trigger success screen with order details
    onOrderPlaced(orderDetails);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-card">
          <h2>No items to checkout</h2>
          <p>Your cart is empty. Please add items before checking out.</p>
          <button
            type="button"
            className="continue-shopping-btn"
            onClick={onBackToCart}
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <button
            type="button"
            className="back-btn-link"
            onClick={onBackToCart}
          >
            ← Back to Cart
          </button>
        </div>

        <div className="checkout-layout">
                    <form className="checkout-form-card" onSubmit={handleSubmit} noValidate>
            <h2 className="form-section-title">Shipping Information</h2>

            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="e.g. Alex Johnson"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="123 Fashion Street, Apt 4B"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'input-error' : ''}
              />
              {errors.address && <span className="error-msg">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'input-error' : ''}
                />
                {errors.city && <span className="error-msg">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Postal / ZIP Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="10001"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2 className="form-section-title" style={{ marginTop: '1.5rem' }}>
              Payment Method
            </h2>

            <div className="payment-options">
              <label className="payment-option selected">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <div className="payment-option-text">
                  <strong>Cash on Delivery (Demo)</strong>
                  <span>Pay with cash or card upon receiving your order</span>
                </div>
              </label>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order (${total})
            </button>
          </form>

                    <div className="checkout-summary-card">
            <h2 className="summary-title">Order Items ({cartItems.length})</h2>

            <div className="checkout-items-preview">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="checkout-item-img"
                    onError={(e) => {
                      e.target.src = '/products/watch-1.jpg';
                    }}
                  />
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">
                      Qty: {item.quantity} × ${item.price}
                    </span>
                  </div>
                  <span className="checkout-item-total">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

