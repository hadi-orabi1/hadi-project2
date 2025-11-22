import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function Favorites() {
  const { favoriteBooks } = useContext(FavoritesContext);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">❤️ Your Favorite Books</h2>
      {favoriteBooks.length === 0 ? (
        <p className="text-center">You haven't liked any books yet.</p>
      ) : (
        <div className="row">
          {favoriteBooks.map(book => (
            <div key={book.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img src={book.image} alt={book.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">${book.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
