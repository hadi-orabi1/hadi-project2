import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // State: Array of items in the cart.
  const [cartItems, setCartItems] = useState([]);

  // Action: Add a book to the cart or increase quantity if it exists.
  const addToCart = (book) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === book.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  // Action: Decrease quantity of an item.
  const decreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Action: Remove an item completely.
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Action: Clear all items from the cart.
  const clearCart = () => {
    setCartItems([]);
  };

  // Helper: Get total count of items (sum of quantities).
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
