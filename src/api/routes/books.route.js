const express = require("express");

const {
  getBooks,
  getBookByID,
  getBookByTitle,
  getBooksByAuthor,
  getBooksByPublisher,
  getBooksByYear,
  getTopRatedBooks,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/books.controller");
const isAuth = require("../../middlewares/auth.middleware");
const { upload } = require("../../middlewares/file.middleware");

const BookRouter = express.Router();

BookRouter.get("/", getBooks);
BookRouter.get("/byid/:id", getBookByID);
BookRouter.get("/bytitle/:title", getBookByTitle);
BookRouter.get("/byauthor/:author", getBooksByAuthor);
BookRouter.get("/bypublisher/:publisher", getBooksByPublisher);
BookRouter.get("/byyear/:year", getBooksByYear);
BookRouter.get("/toprated", getTopRatedBooks);
BookRouter.post("/", [isAuth], upload.single("cover"), createBook);
BookRouter.patch("/:id", [isAuth], upload.single("cover"), updateBook);
BookRouter.delete("/:id", [isAuth], deleteBook);

module.exports = BookRouter;
