// Styling: CSS for the card layout, hover effects, and heart icon.
import "../Assets/BookCard.css";
import React, { useContext } from "react";
// Contexts: Access Cart and Favorites global state.
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";


const BookCard = ({ book }) => {
  const { addToCart } = useContext(CartContext);
  const { favoriteBooks, toggleFavorite } = useContext(FavoritesContext);

  // Logic: Check if this specific book is in the favorites list.
  const isFavorite = favoriteBooks.some(item => item.id === book.id);

  // Helper: Renders star icons based on numerical rating (e.g., 4.5).
  const renderStars = (rating) => {
    if (typeof rating !== "number") return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "⯨"} 
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="book-card">
      <div className="book-card-image">
        <img 
          src={book.image} 
          alt={book.title} 
        />
        <span
          className={`heart-icon ${isFavorite ? "liked" : ""}`}
          onClick={() => toggleFavorite(book)}
        >
          ♥
        </span>
        {book.category && <span className="category-badge">{book.category}</span>}
      </div>

      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>

        {book.author && <p className="book-card-author">by {book.author}</p>}

        <div className="book-card-footer">
          <p className="book-card-price">${Number(book.price).toFixed(2)}</p>

          {book.rating && (
            <p className="book-card-rating">
              {renderStars(book.rating)} <span className="rating-value">({book.rating})</span>
            </p>
          )}
        </div>

        <button className="add-to-cart-btn" onClick={() => addToCart(book)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
