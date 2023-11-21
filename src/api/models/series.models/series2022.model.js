const mongoose = require("mongoose")

const CoverSerie2022Schema = new mongoose.Schema(
  {
    cover_x: { type: String, required: false, trim: true },
    cover_y: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const Serie2022Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    platform: { type: [String], required: false, trim: true },
    seasonswatched: { type: [String], required: true },
    episodes: { type: Number, required: true },
    hr: { type: Boolean, required: true },
    covers: { type: CoverSerie2022Schema, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);
const CoverSeries2022 = mongoose.model("coverseries2022", CoverSerie2022Schema)
const Series2022 = mongoose.model("series2022", Serie2022Schema)

module.exports = CoverSeries2022
module.exports = Series2022
// JSON SERIES2022 MODEL
[
  {
    "title": "",
    "platform": [""],
    "seasonswatched": [""],
    "episodes": 1,
    "hr": true,
    "covers": [
      {
        "cover_x": "",
        "cover_y": ""
      }
    ],
  }
]