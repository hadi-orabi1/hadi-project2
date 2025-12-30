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

/* 
   DATABASE CONNECTION (POOL)
  */
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 4000,
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/* 
   SERVER PORT
  */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

/* 
   ROOT ROUTE
    */
app.get('/', (req, res) => {
    res.send('Bookstore API is running');
});

/* 
   AUTH ROUTES
    */
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sqlInsert, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                console.error("Register Error:", err);
                return res.status(500).json({ message: 'Server error' });
            }

            const user = { id: result.insertId, name, email };

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

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

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Login Error:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
});

/* 
   BOOK ROUTES
  */
app.get('/api/books', (req, res) => {
    db.query("SELECT * FROM books ORDER BY created_at DESC", (err, result) => {
        if (err) {
            console.error("Fetch Books Error:", err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(result);
    });
});

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM books WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Fetch Book Error:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(result[0]);
    });
});

/* 
   CONTACT ROUTES
  */
app.post('/api/contact', (req, res) => {
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    const sqlInsert = "INSERT INTO contact_messages (name, email, description) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, description], (err, result) => {
        if (err) {
            console.error("Contact Error:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        res.status(201).json({
            message: 'Message sent successfully!',
            id: result.insertId
        });
    });
});
