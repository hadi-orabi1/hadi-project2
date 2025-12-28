import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // State: Array of favorite books.
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  // Action: Add or remove a book from favorites (toggle).
  const toggleFavorite = (book) => {
    setFavoriteBooks((prev) => {
      const isFav = prev.some((item) => item.id === book.id);
      if (isFav) {
        // Remove if already exists
        return prev.filter((item) => item.id !== book.id);
      } else {
        // Add if not in list
        return [...prev, book];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoriteBooks, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
