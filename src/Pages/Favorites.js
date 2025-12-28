// useContext: Hook to access global Favorites state.
import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import BookCard from "../Components/BookCard";


export default function Favorites() {
  // Access favorite books from context.
  const { favoriteBooks } = useContext(FavoritesContext);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ color: "#d32f2f", textAlign: "center" }}>❤️ Your Favorites</h2>

      {favoriteBooks.length === 0 ? (
        // Empty State: Encourages user to add favorites.
        <p style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}>
          You haven't added any favorites yet.
        </p>
      ) : (
        // Favorites Grid: Reuses BookCard for consistency.
        <div className="row mt-4">
          {favoriteBooks.map((book) => (
            <div key={book.id} className="col-md-3 mb-4">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
