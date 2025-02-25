//This will be where Im storing in my node js codes

//Importing 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// port!
const app = express();
const PORT = 3000;

// 3) Stores all file in frontend at port 
app.use(express.static(path.join(__dirname, 'Front-End')));

// bodyParser is good for using JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Linking DB to sqlite on dbrowser
const db = new sqlite3.Database('./Db/TaskVerseDatabase.db', (err) => {
  if (err) {
    console.error('Error opening the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

//Post register, means send data to it ==============================================

app.post('/register', (req, res) => { //This inserts it in DB
  //Required details
  const { username, password, email } = req.body;

  // Validates it
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  // This is what manipulates the DB and Adds new user into the "Users" table
  const sql = `INSERT INTO Users (username, password, email, position) VALUES (?, ?, ?, ?)`;
  const params = [username, password, email, 'Member']; 

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // this.lastID just means the new user has the next ID
    res.json({
      success: true,
      message: 'User registered successfully',
      userId: this.lastID
    });
  });
});


//Post Login 

app.post('/login', (req, res) => {
  //Again needed required detai;s
  const { username, password } = req.body;

  // validate it
  if (!username || !password) {
    return res.status(400).json({ message: 'Username + password required' });
  }

  // Error handling and Query the Users table by username
  const sql = `SELECT * FROM Users WHERE username = ?`;
  db.get(sql, [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Error
    if (!row || row.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Alternatively, success
    res.json({ success: true, message: 'Login successful!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
