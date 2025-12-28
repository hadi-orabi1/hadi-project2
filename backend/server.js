
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",      
    user: process.env.DB_USER || "root",           
    password: process.env.DB_PASSWORD || "",       
    database: process.env.DB_NAME || "web_store"   
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        process.exit(1);  
    }
    console.log("mysql connected....");  
});

const PORT = process.env.PORT || 5001;

// Start the server and listen for incoming requests on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Bookstore API is running');
});


app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validation: Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sqlInsert, [name, email, hashedPassword], (err, result) => {
            if (err) {
                // Check if error is due to duplicate email (unique constraint)
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                console.error("Error registering user:", err);
                return res.status(500).json({ message: 'Server error' });
            }
            
            // Create user object for response
            const user = { id: result.insertId, name, email };
            
            // Generate JWT token for auto-login
            const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
            
            // Return token and user data (same as login)
            res.status(201).json({ 
                message: 'User registered successfully',
                token,
                user
            });
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Validation: Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Step 1: Find user by email
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Error finding user:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        // If no user found with this email
        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result[0];

        try {
            // Step 2: Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Step 3: Generate JWT token for authenticated user
            // Token contains user ID and expires in 2 hours
            const token = jwt.sign(
                { id: user.id },                               // Payload: user ID
                process.env.JWT_SECRET || 'secretkey',         // Secret key for signing
                { expiresIn: '2h' }                            // Token expires in 2 hours
            );

            // Step 4: Return success with token and user info (excluding password)
            res.status(200).json({
                message: 'Login successful',
                token,                                          // JWT token for future requests
                user: { id: user.id, name: user.name, email: user.email }   // User data (no password!)
            });
        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
});

//  BOOKS ROUTES 


app.get('/api/books', (req, res) => {
    // Query database for all books, ordered by creation date (newest first)
    db.query("SELECT * FROM books ORDER BY created_at DESC", (err, result) => {
        if (err) {
            console.error("Error fetching books:", err);
            return res.status(500).json({ message: 'Server error while fetching books' });
        }
        // Return array of books as JSON
        res.status(200).json(result);
    });
});


app.get('/api/books/:id', (req, res) => {
    // Extract book ID from URL parameters
    const { id } = req.params;

    // Query database for book with matching ID
    db.query("SELECT * FROM books WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error fetching book:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        // If no book found with this ID
        if (result.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Return the first (and only) result
        res.status(200).json(result[0]);
    });
});

//  CONTACT ROUTES 

app.post('/api/contact', (req, res) => {
    // Extract form data from request body
    const { name, email, description } = req.body;

    // Validation: Check if all required fields are provided
    if (!name || !email || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validation: Check email format using regular expression
    // Pattern: something@something.something
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Insert contact message into database
    const sqlInsert = "INSERT INTO contact_messages (name, email, description) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, description], (err, result) => {
        if (err) {
            console.error("Error submitting contact form:", err);
            return res.status(500).json({ message: 'Server error. Please try again later.' });
        }
        // Return success with the new message ID
        res.status(201).json({ message: 'Message sent successfully!', id: result.insertId });
    });
});
