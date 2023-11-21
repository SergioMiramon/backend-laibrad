const mongoose = require("mongoose")

const CoverSerieSchema = new mongoose.Schema(
  {
    cover_x: { type: String, required: false, trim: true },
    cover_y: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const FavEpisodesSchema = new mongoose.Schema(
  {
    titleepisode: { type: String, required: true, trim: true },
    myratingepisode: { type: String, required: true, trim: true },
    season: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const SerieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    creator: { type: [String], required: false, trim: true },
    year: { type: Number, required: true },
    genre: { type: [String], required: true, trim: true, lowercase: true },
    myrating: { type: String, required: true, trim: true },
    platform: { type: [String], required: false, trim: true },
    seasons: { type: Number, required: true },
    seasonswatched: { type: Number, required: false },
    favepisodes: { type: FavEpisodesSchema, required: false, trim: true },
    finished: { type: Boolean, required: true },
    hr: { type: Boolean, required: true },
    covers: { type: CoverSerieSchema, required: false, trim: true },
    favserie: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const CoverSeries = mongoose.model("coverseries", CoverSerieSchema)
const FavEpisodes = mongoose.model("favepisodes", FavEpisodesSchema)
const Series = mongoose.model("series", SerieSchema)

module.exports = CoverSeries
module.exports = FavEpisodes
module.exports = Series


// JSON SERIES MODEL
[
  {
    "title": "",
    "creator": [""],
    "year": 1,
    "genre": [""],
    "myrating": "",
    "platform": [""],
    "seasons": 1,
    "seasonswatched": 1,
    "favepisodes": [
      {
        "titleepisode": "",
        "myratingepisode": "",
        "season": 1
      }
    ],
    "finished": true,
    "hr": true,
    "covers": [
      {
        "cover_x": "",
        "cover_y": ""
      }
    ],
    "favserie": true
  }
]

