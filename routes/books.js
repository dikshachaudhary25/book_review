const express = require('express');
const router = express.Router();

// Dummy data (for testing purposes)
const books = require('../data/books'); // Assuming you have a file with book data

// Task 1: Get the book list available in the shop
router.get('/', (req, res) => {
  res.json(books);
});

// Task 2: Get the books based on ISBN
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  // Implement logic to retrieve books by ISBN
});

// Task 3: Get all books by Author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  // Implement logic to retrieve books by author
});

// Task 4: Get all books based on Title
router.get('/title/:title', (req, res) => {
  const title = req.params.title;
  // Implement logic to retrieve books by title
});

// Task 5: Get book Review
router.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  // Implement logic to retrieve book reviews
});

// Task 8: Add/Modify a book review
router.post('/review/:isbn', (req, res) => {
  // Implement logic to add/modify a book review
});

// Task 9: Delete book review added by that particular user
router.delete('/review/:isbn', (req, res) => {
  // Implement logic to delete a book review
});

module.exports = router;
