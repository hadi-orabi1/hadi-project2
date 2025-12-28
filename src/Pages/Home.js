// React Hooks: useState for managing quiz state, useNavigate for navigation.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Styling: Home-specific CSS for layout and animations.
import "../Assets/Home.css";

// Quiz Data: Questions for the interactive voucher game.
const quizQuestions = [
  { question: "Who wrote 'Harry Potter'?", options: ["J.K. Rowling", "Suzanne Collins", "E. Lockhart", "Lynn Painter"], answer: 0 },
  { question: "Which genre is 'The Lafufu Colouring Book'?", options: ["Fiction", "Self-Help", "Coloring", "Programming"], answer: 2 },
  { question: "Which book is about romance?", options: ["The Rom-com Collection", "Sunrise On The Reaping", "We Fell Apart", "Very Merry Lafufu"], answer: 0 }
];

export default function Home() {
  // State: Holds the list of trending books fetched from the database.
  const [popularBooks, setPopularBooks] = useState([]);
  // State: Tracks user's selected answers for the quiz.
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));

  const navigate = useNavigate();

  // Logic: Fetch trending books from the backend on mount.
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/books");
        // Take the first 5 books as "Trending"
        setPopularBooks(response.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching trending books:", err);
        setPopularBooks([]);
      }
    };
    fetchTrending();
  }, []);

  // Handle Quiz Selection
  const handleAnswer = (qIndex, optionIndex) => {
    const updated = [...selectedAnswers];
    updated[qIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  // Handle Quiz Submission and Reward Logic
  const handleSubmit = () => {
    const correct = quizQuestions.every((q, i) => selectedAnswers[i] === q.answer);
    if (correct) {
      alert("🎉 Congratulations! You won a 20% voucher!");
    } else {
      alert("Thanks for playing! Try again to win a voucher.");
    }
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
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#joudCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className="about-section">
        <div className="about-content">
          <h2 className="section-title">📖 Welcome to Our Bookstore</h2>
          <p className="about-text">
            Discover a world of knowledge and imagination at our online bookstore. We offer a carefully curated 
            collection of books across programming, self-help, fiction, and Arabic literature. Whether you're 
            looking to learn new skills, find inspiration, or escape into a great story — we have something 
            special waiting for you. Start your reading journey today!
          </p>
          <button className="explore-btn" onClick={() => navigate("/books")}>
            Explore Our Collection →
          </button>
        </div>
      </div>

      <div className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="trending-grid">
          {popularBooks.map((book) => (
            <div key={book.id} className="trending-card">
              <img 
                src={book.image} 
                alt={book.title} 
              />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="quiz-section">
        <h2 className="section-title">🎁 Win a 20% Voucher!</h2>
        <p className="quiz-intro">Answer all questions correctly to receive your discount code.</p>
        {quizQuestions.map((q, i) => (
          <div key={i} className="quiz-card">
            <p className="question-text">
              <span style={{ 
                display: "inline-block", 
                background: "#1b4332", 
                color: "#fff", 
                borderRadius: "50%", 
                width: "28px", 
                height: "28px", 
                lineHeight: "28px", 
                textAlign: "center", 
                marginRight: "10px",
                fontSize: "0.9rem"
              }}>
                {i + 1}
              </span>
              {q.question}
            </p>
            <div className="options-grid">
              {q.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  className={`option-btn ${selectedAnswers[i] === optIdx ? "selected" : ""}`}
                  onClick={() => handleAnswer(i, optIdx)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="submit-quiz-btn" onClick={handleSubmit}>🚀 Submit Quiz</button>
      </div>
    </div>
  );
}
