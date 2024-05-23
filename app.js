const express = require('express');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/books', booksRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
