const sqlite3 = require('sqlite3').verbose();

// Initialize the SQLite database. If the file doesn't exist, it will be created.
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Create the 'users' table if it doesn't already exist.
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table initialized.');
    }
  });
});

// Export the `db` object to be used in other files (e.g., server.js)
module.exports = db;