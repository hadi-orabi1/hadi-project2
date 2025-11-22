import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/Home.css";

const popularBooks = [
  { id: 1, title: "We Fell Apart", author: "E. Lockhart", price: 12.59, image: "/Images/im4.png", category: "Fiction" },
  { id: 2, title: "Sunrise On The Reaping", author: "Suzanne Collins", price: 36.30, image: "/Images/im5.png", category: "Fiction" },
  { id: 3, title: "The Lafufu Colouring Book", price: 12.31, image: "/Images/im6.png", category: "Self-Help" },
  { id: 4, title: "The Rom-com Collection", author: "Lynn Painter", price: 61.59, image: "/Images/im7.png", category: "Fiction" },
  { id: 5, title: "Very Merry Lafufu", price: 12.31, image: "/Images/im8.png", category: "Arabic Literature" },
];

const quizQuestions = [
  { question: "Who wrote 'Harry Potter'?", options: ["J.K. Rowling", "Suzanne Collins", "E. Lockhart", "Lynn Painter"], answer: 0 },
  { question: "Which genre is 'The Lafufu Colouring Book'?", options: ["Fiction", "Self-Help", "Coloring", "Programming"], answer: 2 },
  { question: "Which book is about romance?", options: ["The Rom-com Collection", "Sunrise On The Reaping", "We Fell Apart", "Very Merry Lafufu"], answer: 0 }
];

export default function Home() {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  const handleAnswer = (qIndex, optionIndex) => {
    const updated = [...selectedAnswers];
    updated[qIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleSubmit = () => {
    const correct = quizQuestions.every((q, i) => selectedAnswers[i] === q.answer);
    setShowResult(true);
    if (correct) {
      alert("🎉 Congratulations! You won a 20% voucher!");
    } else {
      alert("Thanks for playing! Try again to win a voucher.");
    }
  };

  const handleFindTopic = (topic) => {
    navigate(`/books?category=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="home-container">
      <div id="joudCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/Images/im1.png" className="d-block w-100 carousel-img" alt="Banner 1" />
          </div>
          <div className="carousel-item">
            <img src="/Images/im2.png" className="d-block w-100 carousel-img" alt="Banner 2" />
          </div>
          <div className="carousel-item">
            <img src="/Images/im3.png" className="d-block w-100 carousel-img" alt="Banner 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#joudCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#joudCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h2 className="home-title">📚 Books With Joud</h2>
      <p className="home-subtitle">Discover your next favorite read!</p>

      <div className="category-dropdown">
        <button className="dropdown-btn">📚 Find Your Topic</button>
        <div className="dropdown-content">
          <button onClick={() => handleFindTopic("Programming")}>💻 Programming</button>
          <button onClick={() => handleFindTopic("Self-Help")}>🌱 Self-Help</button>
          <button onClick={() => handleFindTopic("Fiction")}>📖 Fiction</button>
          <button onClick={() => handleFindTopic("Arabic Literature")}>🕌 Arabic Literature</button>
          <button onClick={() => handleFindTopic("")}>🔄 Show All</button>
        </div>
      </div>

      <div className="popular-books-header">
        <h3 className="section-title">Popular Books</h3>
        <hr className="section-divider" />
      </div>
      <div className="book-grid">
        {popularBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-info">
              <h5 className="book-title">{book.title}</h5>
              {book.author && <p className="book-author">by {book.author}</p>}
              <p className="book-price">${book.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="about-joud">
        <h4 className="about-title">About Joud Online Bookstore</h4>
        <p className="about-text">
          Joud is your trusted online destination for discovering books that inspire, educate, and entertain.
          Whether you're into programming, fiction, self-growth, or Arabic literature, we bring you curated
          collections and new releases with a personal touch.
        </p>
      </div>

      <div className="quiz-section">
        <h4 className="quiz-title">Test Your Book Knowledge</h4>
        {quizQuestions.map((q, qIndex) => (
          <div key={qIndex} className="quiz-question">
            <p className="quiz-text">{q.question}</p>
            {q.options.map((opt, optIndex) => (
              <label key={optIndex} className="quiz-option">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={selectedAnswers[qIndex] === optIndex}
                  onChange={() => handleAnswer(qIndex, optIndex)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button className="quiz-submit" onClick={handleSubmit}>Submit Answers</button>
        {showResult && <p className="quiz-feedback">Check your alert for results!</p>}
      </div>
    </div>
  );
}
