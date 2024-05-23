const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Dummy user data
let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Task 6: Register New user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Task 7: Login as a Registered user
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    // For simplicity, no JWT token generation in this example
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
    res.json({ message: 'Login successful', token });
});

module.exports = router;
