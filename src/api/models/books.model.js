const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    publisher: {
      type: String,
      required: true,
      trim: true,
    },
    year: { type: Number, required: true },
    myrating: { type: String, required: true, trim: true },
    review: { type: String, required: false },
    cover: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("book", BookSchema);

module.exports = Book;
