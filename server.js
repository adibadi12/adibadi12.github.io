const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const db = new sqlite3.Database('./database.db');

// Middleware
app.use(bodyParser.json());

// 📌 Create the users table if it doesn’t exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
});

// 🌐 Root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// 📝 Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log("Received registration data:", { username, password });

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    function (err) {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: 'Failed to register user: ' + err.message });
      }

      console.log("User successfully registered:", { id: this.lastID, username });
      res.status(201).json({ message: 'User registered successfully', id: this.lastID, username });
    }
  );
});

// 🔐 User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!bcrypt.compareSync(password, row.password)) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: row.id, username: row.username },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  });
});

// 🧠 Protected profile route
app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    res.json({
      message: 'Welcome to your profile!',
      user: decoded
    });
  });
});

// 🚀 Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
