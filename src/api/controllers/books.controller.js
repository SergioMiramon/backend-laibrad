const Book = require("../models/books.model");
const { deleteImgCloudinary } = require("../../middlewares/file.middleware");

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return next(new Error("Books not found"));
  }
};

const getBookByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return next(new Error("Book by this ID not found"));
  }
};

const getBookByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const book = await Book.find({ title: title });
    return res.status(200).json(book);
  } catch (error) {
    return next(new Error("Book by this title not found"));
  }
};

const getBooksByAuthor = async (req, res, next) => {
  try {
    const { author } = req.params;
    const book = await Book.find({ author: author });
    return res.status(200).json(book);
  } catch (error) {
    return next(new Error("Books by this author not found"));
  }
};

const getBooksByPublisher = async (req, res, next) => {
  try {
    const { publisher } = req.params;
    const book = await Book.find({ publisher: publisher });
    return res.status(200).json(book);
  } catch (error) {
    return next(new Error("Books by this publisher not found"));
  }
};

const getBooksByYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    const book = await Book.find({ year: year });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json("Books by this year not found", error);
  }
};

const getTopRatedBooks = async (req, res, next) => {
  try {
    const book = await Book.find({ myrating: { $eq: "⭐⭐⭐⭐⭐" } });
    return res.status(200).json(book);
  } catch (error) {
    return next(new Error("Top rated books not found"));
  }
};

const createBook = async (req, res, next) => {
  try {
    const book = new Book({
      ...req.body,
      cover: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png",
    })
    const newBook = await book.save();
    return res.status(201).json(newBook);
  } catch (error) {
    return next(new Error("Failed creating book"));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBook = await Book.findByIdAndDelete(id);
    if (newBook.cover) deleteImgCloudinary(newBook.cover)
    return res.status(200).json(newBook);
  } catch (error) {
    return next(new Error("Failed deleting book"));
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBook = await Book.findByIdAndUpdate(id, {
      ...req.body,
      cover: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png",
    }, {new: true});
    return res.status(200).json(newBook);
  } catch (error) {
    return next(new Error("Error updating book"));
  }
};

module.exports = {
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
};
