// useContext: Hook to access global Cart state.
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
// Styling: Cart-specific CSS for the checkout layout.
import "../Assets/Cart.css";


export default function Cart() {
  // Access cart state and actions from context.
  const {
    cartItems,
    removeFromCart,
    clearCart,
    addToCart,
    setCartItems
  } = useContext(CartContext);

  // State: Tracks if the user has completed the purchase.
  const [shoppingDone, setShoppingDone] = useState(false);
  // State: Tracks user rating after purchase.
  const [rating, setRating] = useState(0);

  // Logic: Decrease item quantity or remove if it reaches zero.
  const decreaseQuantity = (id) => {
    const item = cartItems.find(book => book.id === id);
    if (item.quantity > 1) {
      const newCart = cartItems.map(book =>
        book.id === id ? { ...book, quantity: book.quantity - 1 } : book
      );
      setCartItems(newCart);
    } else {
      removeFromCart(id);
    }
  };

  // Logic: Calculate total price of all items in cart.
  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  // Action: Simulate purchase completion.
  const handleBuy = () => {
    clearCart();
    setShoppingDone(true);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Shopping Cart</h2>

      {/* Conditional Rendering: Show success message if purchase is done */}
      {shoppingDone ? (
        <div className="done-box">
          <h3 className="done-message">✅ Your shopping is done!</h3>
          <p className="rate-label">Rate your experience:</p>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star filled" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          {rating > 0 && <p className="rate-thanks">Thanks for rating us {rating} stars!</p>}
        </div>
      ) : cartItems.length === 0 ? (
        // Conditional Rendering: Show empty state if no items in cart.
        <div className="cart-empty-box">
          <p className="cart-empty-message">
            Your cart is currently empty.<br />
            Browse our collection and add your favorite books!
          </p>
        </div>
      ) : (
        // Main Cart View: List of items and summary.
        <>
          <div className="cart-column">
            {cartItems.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.title} className="cart-row-img" />
                <div className="cart-row-details">
                  <h3>{item.title}</h3>
                  <p><strong>Price:</strong> ${Number(item.price).toFixed(2)}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>−</button>
                    <button onClick={() => addToCart(item)}>＋</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary-box">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">${total.toFixed(2)}</span>
            </div>
            <button className="clear-btn" onClick={clearCart}>
              🧹 Clear Cart
            </button>
            <button className="buy-btn" onClick={handleBuy}>
              🛒 Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
