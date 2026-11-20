import React from 'react';

function OrderConfirmation({ orderDetails, onContinueShopping }) {
  if (!orderDetails) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-card">
          <h2>No recent order found</h2>
          <button
            type="button"
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Go to Shopping
          </button>
        </div>
      </div>
    );
  }

  const { orderId, customer, items, totalAmount, orderDate } = orderDetails;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon-badge">✓</div>
        <h1 className="confirmation-title">Order Placed Successfully!</h1>
        <p className="confirmation-subtitle">
          Thank you for shopping with <strong>StyleStore</strong>. We have received your order and are getting it ready.
        </p>

        <div className="order-meta-box">
          <div className="meta-item">
            <span className="meta-label">Order Number</span>
            <span className="meta-value">{orderId}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date</span>
            <span className="meta-value">{orderDate}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Total Amount</span>
            <span className="meta-value total-highlight">${totalAmount}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Payment</span>
            <span className="meta-value">Cash on Delivery</span>
          </div>
        </div>

        <div className="delivery-summary-box">
          <h3>Delivery Details</h3>
          <p><strong>Customer:</strong> {customer.fullName}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}, {customer.city} {customer.postalCode}</p>
        </div>

        <div className="ordered-items-summary">
          <h3>Items Ordered ({items.length})</h3>
          <div className="ordered-items-list">
            {items.map((item) => (
              <div key={item.id} className="ordered-item-row">
                <img
                  src={item.image}
                  alt={item.name}
                  className="ordered-item-thumb"
                  onError={(e) => {
                    e.target.src = '/products/watch-1.jpg';
                  }}
                />
                <div className="ordered-item-details">
                  <span className="ordered-item-title">{item.name}</span>
                  <span className="ordered-item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="ordered-item-price">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

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

export default OrderConfirmation;
