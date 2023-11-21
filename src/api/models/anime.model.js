const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    type: {
      type: String,
      enum: ["movie", "series"],
      required: true,
      trim: true,
    },
    myrating: { type: String, required: true, trim: true },
    platform: { type: [String], required: false, trim: true },
    cover_x: { type: String, required: false, trim: true, default: "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png" },
    cover_y: { type: String, required: false, trim: true, default: "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png" },
    cover_background: { type: String, required: false, trim: true, default: "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png" },
  },
  {
    timestamps: true,
  }
);
const Anime = mongoose.model("anime", AnimeSchema);

module.exports = Anime;
