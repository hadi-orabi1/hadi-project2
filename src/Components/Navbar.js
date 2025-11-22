import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <style>{`
        .navbar {
          background: linear-gradient(135deg, #00796b, #004d40) !important;
        }
        .navbar-brand {
          font-weight: bold;
          color: #fefae0 !important;
        }
        .nav-link {
          color: #fefae0 !important;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: 0.5px;
          transition: color 0.3s, transform 0.2s;
        }
        .nav-link:hover {
          color: #ffd60a !important;
          transform: translateY(-2px);
        }
        .brand-unique {
          font-size: 2.2rem;       /* bigger than nav links */
          font-weight: 900;        /* extra bold */
          letter-spacing: 1px;     /* spaced out letters */
          color: #ffd60a !important; /* standout gold/yellow */
          text-transform: uppercase;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
        }
        .form-control {
          border-radius: 6px;
        }
        .btn-outline-success {
          border-radius: 6px;
          font-weight: 600;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand brand-unique" to="/">J.Books</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">❤️ Favorites</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">🛒 Cart ({cartItems.length})</Link>
              </li>
            </ul>

            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for Book, Author or Category"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
