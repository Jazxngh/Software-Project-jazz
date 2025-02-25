// This is where I’m storing my Node.js codes

// Importing 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// port!
const app = express();
const PORT = 3000;

// Stores all files in Front-End at port 
app.use(express.static(path.join(__dirname, 'Front-End')));

// bodyParser is good for using JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Linking DB to SQLite
const db = new sqlite3.Database('./Db/TaskVerseDatabase.db', (err) => {
  if (err) {
    console.error('Error opening the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

//Post register (send data to it) ================================
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = `INSERT INTO Users (username, password, email, position) VALUES (?, ?, ?, ?)`;
  const params = [username, password, email, 'Member'];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      message: 'User registered successfully',
      userId: this.lastID
    });
  });
});

// Post Login =============================================
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username + password required' });
  }

  const sql = `SELECT * FROM Users WHERE username = ?`;
  db.get(sql, [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row || row.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    res.json({ success: true, message: 'Login successful!', userId: row.User_ID });
  });
});

// Get Tasks for specific user ==================================
app.get('/getTasks', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  const sql = `SELECT * FROM UserTask WHERE assignedToUser_ID = ?`;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, tasks: rows });
  });
});
