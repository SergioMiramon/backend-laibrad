const mongoose = require("mongoose")

const CoverSerie2023Schema = new mongoose.Schema(
  {
    cover_x: { type: String, required: false, trim: true },
    cover_y: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const Serie2023Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    platform: { type: [String], required: false, trim: true },
    seasonswatched: { type: [String], required: true },
    episodes: { type: Number, required: true },
    month: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    avgmin: { type: Number, required: true },
    type: { type: String, enum: ["Series", "Anime", "Short", "Documentary", "Show", "Animation", "Limited"], required: true, trim: true },
    hr: { type: Boolean, required: true },
    covers: { type: CoverSerie2023Schema, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);
const CoverSeries2023 = mongoose.model("coverseries2023", CoverSerie2023Schema)
const Series2023 = mongoose.model("series2023", Serie2023Schema)

module.exports = CoverSeries2023
module.exports = Series2023

// JSON SERIES2023 MODEL
[
  {
    "title": "",
    "platform": [""],
    "seasonswatched": [""],
    "episodes": 1,
    "month": "",
    "date": [""],
    "avgmin": 1,
    "type": "",
    "hr": true,
    "covers": [
      {
        "cover_x": "",
        "cover_y": ""
      }
    ]
  }
]