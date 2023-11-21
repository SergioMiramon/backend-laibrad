const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    publisher: {
      type: String,
      enum: [
        "circulo rojo",
        "planeta",
        "tusquets",
        "ediciones b",
        "salamandra",
        "reservoir books",
      ],
      required: true,
      trim: true,
    },
    year: { type: Number, required: true },
    myrating: { type: String, required: true, trim: true },
    review: { type: String, required: false },
    cover: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png",
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("book", BookSchema);

module.exports = Book;
