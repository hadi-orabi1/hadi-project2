import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BookCard from "../Components/BookCard";
import "../Assets/Books.css";


const API = process.env.REACT_APP_API_URL || "http://localhost:5001";

const categoryIcons = {
  Programming: "💻",
  "Self-Help": "🧠",
  Fiction: "📖",
  "Arabic Literature": "📚",
};

const categories = ["Programming", "Self-Help", "Fiction", "Arabic Literature"];

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentCategory = new URLSearchParams(location.search).get("category");
    setActiveCategory(currentCategory);
  }, [location.search]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/books`);
        setBooks(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]);
        setError("Unable to reach the database. Ensure the backend (port 5001) is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    if (!activeCategory) return books;
    return books.filter((book) => book.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [books, activeCategory]);

  const handleCategoryClick = (category) => {
    if (category === activeCategory) {
      navigate("/books");
      return;
    }
    navigate(`/books?category=${encodeURIComponent(category)}`);
  };

  if (loading) {
    return (
      <div className="books-page-container">
        <div style={{ textAlign: "center", padding: "120px" }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 style={{ marginTop: "20px", color: "#2e7d32" }}>Loading books…</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="books-page-container">
        <div style={{ textAlign: "center", padding: "120px" }}>
          <h3 style={{ color: "#c62828", marginBottom: "10px" }}>Unable to load books</h3>
          <p style={{ color: "#555" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="books-page-container">
      <div className="books-hero">
        <h1>📚 Our Book Collection</h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>Discover your next favorite read from our curated selection</p>
      </div>

      <div className="books-content">
        <aside className="books-sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <ul className="category-list">
            <li
              className={`category-item ${!activeCategory ? "active" : ""}`}
              onClick={() => navigate("/books")}
            >
              📖 All Books
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`category-item ${activeCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryClick(category)}
              >
                {categoryIcons[category]} {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="books-main">
          <div className="books-controls">
            <span style={{ fontWeight: 600, color: "#555" }}>
              {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
            </span>
            {activeCategory && (
              <span className="badge bg-success" style={{ fontSize: "1rem", padding: "8px 15px" }}>
                {categoryIcons[activeCategory]} {activeCategory}
              </span>
            )}
          </div>

          <div className="row">
            {filteredBooks.length ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <BookCard book={book} />
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "80px", width: "100%" }}>
                <h4 style={{ color: "#888" }}>No books found in this category.</h4>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
