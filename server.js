const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); // For password hashing
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Database Setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite3 database.');

    // Create the users table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Users table ready.');
      }
    });
  }
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Check if the user exists in the database
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (row) {
      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, row.password);
      if (isPasswordValid) {
        res.json({ token: 'yourAccessToken' }); // Replace with actual token logic if needed
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Registration Endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username already exists' });
        }
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error hashing password:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve Static Files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

