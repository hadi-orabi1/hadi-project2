// React Hooks: useState for tracking form inputs, useNavigate for page redirection.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Styling: Specific CSS for the authentication pages.
import "../Assets/Auth.css";

export default function Login() {
    // State to hold email and password inputs
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setLoading(true); // Start loading state

        try {
            // Using axios for login - cleaner syntax, no need for JSON.stringify
            const response = await axios.post("http://localhost:5001/api/auth/login", formData);

            // Step 2: Persistence.
            // We save the token so the user stays logged in even if they close the tab.
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Step 3: Redirect to Home.
            // We use window.location.href to force a full page refresh 
            // so the Navbar can re-read the localStorage and show "Hello, User".
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Failed to connect to server";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to access your account</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}
