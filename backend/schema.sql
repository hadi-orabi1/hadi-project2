CREATE DATABASE IF NOT EXISTS web_store;
USE web_store;

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    stock INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data for books (Migrated from frontend static data)
INSERT INTO books (title, author, price, image, category) VALUES
('Ai Projects With Raspberry Pi', 'Unknown', 24.99, '/Images/im10.png', 'Programming'),
('Drawn To Testing', 'Unknown', 22.99, '/Images/im11.png', 'Programming'),
('Bitesize Python For Absolute Beginners', 'Unknown', 49.99, '/Images/im12.png', 'Programming'),
('Informatique. Tronc Commun', 'Unknown', 39.99, '/Images/im13.png', 'Programming'),
('BIG Hack', 'Unknown', 39.99, '/Images/im22.png', 'Programming'),
('Think Straight', 'Unknown', 18.99, '/Images/im14.png', 'Self-Help'),
('Richest Man in Babylon', 'Unknown', 21.99, '/Images/im15.png', 'Self-Help'),
('Mindset: The New Psychology of Success', 'Unknown', 19.99, '/Images/im16.png', 'Self-Help'),
('Good Vibes, Good Life', 'Unknown', 17.99, '/Images/im17.png', 'Self-Help'),
('The Power of Your Subconscious Mind', 'Unknown', 17.99, '/Images/im23.png', 'Self-Help'),
('Better Dreams, Fallen Seeds', 'E. Lockhart', 12.59, '/Images/im18.png', 'Fiction'),
('Spread Me by Sarah Gailey', 'Sarah Gailey', 36.30, '/Images/im19.png', 'Fiction'),
('Not What I Intended', 'Unknown', 61.59, '/Images/im20.png', 'Fiction'),
('The Adventure of the Demonic Ox', 'Unknown', 14.99, '/Images/im21.png', 'Fiction'),
('Attack on Trump', 'Unknown', 14.99, '/Images/im25.png', 'Fiction'),
('Research Methodology', 'Unknown', 12.31, '/Images/im26.png', 'Arabic Literature'),
('The Beginning And The End Ibn Kathir', 'Ibn Kathir', 29.99, '/Images/im27.png', 'Arabic Literature'),
('لن ابكي', 'Unknown', 25.99, '/Images/im28.png', 'Arabic Literature'),
('Lisan Al Arab - Dar Al Maaref', 'Unknown', 27.99, '/Images/im29.png', 'Arabic Literature'),
('Disease And Cure', 'Unknown', 27.99, '/Images/im30.png', 'Arabic Literature'),
('We Fell Apart', 'E. Lockhart', 12.59, '/Images/im4.png', 'Fiction'),
('Sunrise On The Reaping', 'Suzanne Collins', 36.30, '/Images/im5.png', 'Fiction'),
('The Lafufu Colouring Book', 'Unknown', 12.31, '/Images/im6.png', 'Self-Help'),
('The Rom-com Collection', 'Lynn Painter', 61.59, '/Images/im7.png', 'Fiction'),
('Very Merry Lafufu', 'Unknown', 12.31, '/Images/im8.png', 'Arabic Literature');
