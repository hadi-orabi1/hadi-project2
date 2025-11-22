import "../Assets/BookCard.css";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";

const BookCard = ({ book }) => {
  const { addToCart } = useContext(CartContext);
  const { favoriteBooks, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favoriteBooks.some(item => item.id === book.id);

 
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
    <div className="card">
      <div className="card-img-wrapper">
        <img src={book.image} alt={book.title} className="card-img" />
        <span
          className={`heart-icon ${isFavorite ? "liked" : ""}`}
          onClick={() => toggleFavorite(book)}
        >
          ♥
        </span>
      </div>

      <h3 className="card-title">{book.title}</h3>

      {book.author && <p className="card-author">by {book.author}</p>}

      <p className="card-price">${book.price.toFixed(2)}</p>

      {book.rating && (
        <p className="card-rating">
          {renderStars(book.rating)} <span className="rating-value">({book.rating})</span>
        </p>
      )}

      <div className="card-footer">
        <button onClick={() => addToCart(book)} className="buy-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
