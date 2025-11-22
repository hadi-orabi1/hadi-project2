import { useLocation } from "react-router-dom";
import BookCard from "../Components/BookCard";

export default function Books() {
  const books = [
    // Programming
    { id: 1, title: "Ai Projects With Raspberry Pi", price: 24.99, image: "/Images/im10.png", category: "Programming" },
    { id: 2, title: "Drawn To Testing", price: 22.99, image: "/Images/im11.png", category: "Programming" },
    { id: 3, title: "Bitesize Python For Absolute Beginners", price: 49.99, image: "/Images/im12.png", category: "Programming" },
    { id: 4, title: "Informatique. Tronc Commun", price: 39.99, image: "/Images/im13.png", category: "Programming" },
    { id: 5, title: "BIG Hack", price: 39.99, image: "/Images/im22.png", category: "Programming" },

    // Self-Help
    { id: 6, title: "Think Straight", price: 18.99, image: "/Images/im14.png", category: "Self-Help" },
    { id: 7, title: "Richest Man in Babylon", price: 21.99, image: "/Images/im15.png", category: "Self-Help" },
    { id: 8, title: "Mindset: The New Psychology of Success", price: 19.99, image: "/Images/im16.png", category: "Self-Help" },
    { id: 9, title: "Good Vibes, Good Life", price: 17.99, image: "/Images/im17.png", category: "Self-Help" },
    { id: 10, title: "The Power of Your Subconscious Mind", price: 17.99, image: "/Images/im23.png", category: "Self-Help" },

    // Fiction
    { id: 11, title: "Better Dreams, Fallen Seeds", price: 12.59, image: "/Images/im18.png", category: "Fiction" },
    { id: 12, title: "Spread Me by Sarah Gailey", price: 36.30, image: "/Images/im19.png", category: "Fiction" },
    { id: 13, title: "Not What I Intended", price: 61.59, image: "/Images/im20.png", category: "Fiction" },
    { id: 14, title: "The Adventure of the Demonic Ox", price: 14.99, image: "/Images/im21.png", category: "Fiction" },
    { id: 15, title: "Attack on Trump", price: 14.99, image: "/Images/im25.png", category: "Fiction" },

    // Arabic Literature
    { id: 16, title: "Research Methodology", price: 12.31, image: "/Images/im26.png", category: "Arabic Literature" },
    { id: 17, title: "The Beginning And The End Ibn Kathir", price: 29.99, image: "/Images/im27.png", category: "Arabic Literature" },
    { id: 18, title: "لن ابكي", price: 25.99, image: "/Images/im28.png", category: "Arabic Literature" },
    { id: 19, title: "Lisan Al Arab - Dar Al Maaref", price: 27.99, image: "/Images/im29.png", category: "Arabic Literature" },
    { id: 20, title: "Disease And Cure", price: 27.99, image: "/Images/im30.png", category: "Arabic Literature" },
  ];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  const filteredBooks = selectedCategory
    ? books.filter((b) => b.category.toLowerCase() === selectedCategory.toLowerCase())
    : books;

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ color: "#2e7d32", textAlign: "center" }}>Browse our Books</h2>

      {selectedCategory ? (
        <div style={{ marginTop: "40px" }}>
          <h3
            style={{
              color: "green",
              borderBottom: "2px solid #ccc",
              paddingBottom: "10px",
              textAlign: "center",
            }}
          >
            {selectedCategory} Books
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ) : (
        ["Programming", "Self-Help", "Fiction", "Arabic Literature"].map((cat) => (
          <div key={cat} style={{ marginTop: "40px" }}>
            <h3
              style={{
                color: "green",
                borderBottom: "2px solid #ccc",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              {cat} Books
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              {books
                .filter((book) => book.category === cat)
                .map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
