const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
