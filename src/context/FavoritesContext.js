import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    const stored = localStorage.getItem("favoriteBooks");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (book) => {
    setFavoriteBooks(prev => {
      const exists = prev.find(item => item.id === book.id);
      const updated = exists
        ? prev.filter(item => item.id !== book.id)
        : [...prev, book];
      localStorage.setItem("favoriteBooks", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (book) => {
    return favoriteBooks.some(item => item.id === book.id);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteBooks, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
