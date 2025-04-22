const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const db = new sqlite3.Database('./database.db'); // SQLite database

app.use(bodyParser.json());

// Ensure the 'users' table exists when the server starts
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
});

// Example route for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route for user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Log the data to make sure it’s coming through
  console.log("Received registration data:", { username, password });

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Hash the password before storing it
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
    if (err) {
      console.error("Database error:", err.message);  // Log the exact DB error
      return res.status(500).json({ error: `Failed to register user: ${err.message}` });
    }

    // Log the successful user creation
    console.log("User successfully registered:", { id: this.lastID, username });

    res.status(201).json({ message: 'User registered successfully', id: this.lastID, username });
  });
});

// Route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    if (!bcrypt.compareSync(password, row.password)) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: row.id, username: row.username }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
});

// Example route for testing the JWT (protected route)
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    res.json({ message: 'Protected content accessed', user: decoded });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
