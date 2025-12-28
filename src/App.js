// BrowserRouter as Router: Wrapper for React application to enable dynamic client-side routing.
// Routes, Route: Components to define the mapping between URL paths and React components.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Navbar & Footer: Persistent UI elements shown on every page.
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
// Page Components: Individual views of the application.
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Favorites from "./Pages/Favorites";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
// Context Providers: Wrappers that provide global state (Cart, Favorites) to the entire app.
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
// Bootstrap: CSS and JS library for responsive grid and UI components (Carousel, etc.).
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
