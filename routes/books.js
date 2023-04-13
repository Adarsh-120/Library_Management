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
  const book = books.find((each) => each.id === id);

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
    const book = books.find((book) => (book.id = each.issuedBook));

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

/**
 * Route: /
 * Method: POST
 * Description: Adding a new Book
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) =>{
  const { data } = req.body;

  if(!data) {
    return res.status(400).json({
      success: false,
      message: "No Data To Add A Book",
    });
  }

  const book = books.find((each) => each.id === data.id);
  if (book){
    return res.status(404).json({
      success: false,
      message: "Id Already Exists !!",
    });
  }

  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Added Book Successfully",
    data: allBooks,
  });
});

/**
 * Route: /:id
 * Method: PUT
 * Description: Update a book by their Id
 * Access: Public
 * Parameters: Id
 * Data: id, name, author, genre, price, publisher
 */

router.put("/updateBook/:id", (req, res) =>{
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book){
    return res.status($00).json({
      success: false, 
      message:"Book Not Found For This ID",
    });
  }

    const updateData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }

    return each;
  });
  return res.status(200).json({
    success: true,
    message: "Updated a Book By Their Id",
    data: updateData,
  });
});


module.exports = router;
