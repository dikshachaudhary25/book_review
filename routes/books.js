const express = require('express');
const router = express.Router();
const booksData = require('../data/books.json');
const authenticateToken = require('../auth'); // Import authenticateToken

// Task 1: Get the book list available in the shop
router.get('/', (req, res) => {
    res.json(booksData);
});

// Task 2: Get the books based on ISBN
router.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = booksData.find(book => book.isbn === isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

// Task 3: Get all books by Author
router.get('/author/:author', (req, res) => {
    const author = req.params.author;
    const booksByAuthor = booksData.filter(book => book.author === author);
    res.json(booksByAuthor);
});

// Task 4: Get all books based on Title
router.get('/title/:title', (req, res) => {
    const title = req.params.title;
    const booksByTitle = booksData.filter(book => book.title === title);
    res.json(booksByTitle);
});

// Task 5: Get book Review
router.get('/:isbn/reviews', (req, res) => {
    const isbn = req.params.isbn;
    const book = booksData.find(book => book.isbn === isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book.reviews || []);
});

// Task 8: Add a new review for a book (logged in users only)
router.post('/:isbn/reviews', authenticateToken, (req, res) => {
    const isbn = req.params.isbn;
    const book = booksData.find(book => book.isbn === isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const newReview = {
        id: book.reviews.length + 1,
        content: req.body.content,
        user: req.user.username
    };

    book.reviews.push(newReview);
    res.status(201).json({ message: 'Review added successfully', review: newReview });
});

// Task 9: Modify a book review (logged in users can modify only their own reviews)
router.put('/:isbn/reviews/:reviewId', authenticateToken, (req, res) => {
    const isbn = req.params.isbn;
    const reviewId = parseInt(req.params.reviewId);
    const book = booksData.find(book => book.isbn === isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const review = book.reviews.find(review => review.id === reviewId);
    if (!review) {
        return res.status(404).json({ error: 'Review not found' });
    }

    if (review.user !== req.user.username) {
        return res.status(403).json({ error: 'You can only modify your own reviews' });
    }

    review.content = req.body.content;
    res.json({ message: 'Review updated successfully', review });
});

// Task 9: Delete a book review (logged in users can delete only their own reviews)
router.delete('/:isbn/reviews/:reviewId', authenticateToken, (req, res) => {
    const isbn = req.params.isbn;
    const reviewId = parseInt(req.params.reviewId);
    const book = booksData.find(book => book.isbn === isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const reviewIndex = book.reviews.findIndex(review => review.id === reviewId);
    if (reviewIndex === -1) {
        return res.status(404).json({ error: 'Review not found' });
    }

    const review = book.reviews[reviewIndex];
    if (review.user !== req.user.username) {
        return res.status(403).json({ error: 'You can only delete your own reviews' });
    }

    book.reviews.splice(reviewIndex, 1);
    res.json({ message: 'Review deleted successfully' });
});

module.exports = router;
