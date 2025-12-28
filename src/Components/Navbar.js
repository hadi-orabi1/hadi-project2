import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage to determine authentication state
    // If user exists, they are logged in.
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Invalid JSON, clear the corrupted data
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("user");  // Remove user data
    setUser(null); // Update state to Guest
    navigate("/login"); // Redirect to login
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
        .auth-btn-nav {
           background-color: #ffd60a;
           color: #004d40;
           padding: 8px 15px;
           border-radius: 20px;
           font-size: 0.9rem;
           font-weight: 700;
           text-decoration: none;
           margin-left: 10px;
           transition: all 0.3s ease;
        }
        .auth-btn-nav:hover {
           background-color: #fff;
           transform: translateY(-2px);
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
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

            <div className="d-flex align-items-center">
              {user && (
                <form className="d-flex me-3" role="search" onSubmit={handleSearch}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              )}

              {user ? (
                <div className="d-flex align-items-center">
                  <span style={{ color: "white", marginRight: "10px", fontWeight: "bold" }}>Hello, {user.name}</span>
                  <button onClick={handleLogout} className="btn btn-danger btn-sm" style={{ fontWeight: "bold" }}>Logout</button>
                </div>
              ) : (
                <Link to="/login" className="auth-btn-nav">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
