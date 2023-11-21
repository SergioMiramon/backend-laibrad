const mongoose = require("mongoose")

const SoundtrackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    iframe: { type: [String], required: true, trim: true },
    link: { type: [String], required: true, trim: true },
    official: { type: Boolean, required: true },
    artist: { type: [String], required: false },
    cover: { type: [String], required: false, trim: true, default: "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png" },
  },
  {
    timestamps: true,
  }
);

const Soundtrack = mongoose.model("soundtracks", SoundtrackSchema)

module.exports = Soundtrack
