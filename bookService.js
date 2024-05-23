// bookService.js

const axios = require('axios');

// Task 10: Get all books – Using async callback function
async function getAllBooks() {
  try {
    const response = await axios.get('http://api.example.com/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error);
    throw error;
  }
}

// Task 11: Search by ISBN – Using Promises
function searchByISBN(isbn) {
  return new Promise((resolve, reject) => {
    axios.get(`http://api.example.com/books/isbn/${isbn}`)
      .then(response => resolve(response.data))
      .catch(error => {
        console.error('Error searching by ISBN:', error);
        reject(error);
      });
  });
}

// Task 12: Search by Author
async function searchByAuthor(author) {
  try {
    const response = await axios.get(`http://api.example.com/books/author/${author}`);
    return response.data;
  } catch (error) {
    console.error('Error searching by author:', error);
    throw error;
  }
}

// Task 13: Search by Title
async function searchByTitle(title) {
  try {
    const response = await axios.get(`http://api.example.com/books/title/${title}`);
    return response.data;
  } catch (error) {
    console.error('Error searching by title:', error);
    throw error;
  }
}

module.exports = {
  getAllBooks,
  searchByISBN,
  searchByAuthor,
  searchByTitle
};
