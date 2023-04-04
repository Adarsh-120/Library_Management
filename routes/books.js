const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books/:Id
 * Method: GET
 * Description: Get books by their Id
 * Access: Public
 * Parameters: Id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = book.find((each) => each.id === id);

  if (!books) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found the Book By their Id",
    data: book,
  });
});

/**
 * Route: /books
 * Method: GET
 * Description: Getting all books
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Got all the Books", data: books });
});

/**
 * Route: /books/:Id
 * Method: GET
 * Description: Get books by their Id
 * Access: Public
 * Parameters: Id
 */

router.get("/issued/by-user", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];

  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id = each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    success: true,
    messsage: "Users with the Issued Books..",
    data: issuedBooks,
  });
});

module.exports = router;
