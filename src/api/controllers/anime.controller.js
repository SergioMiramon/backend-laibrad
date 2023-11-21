const Anime = require("../models/anime.model");
const { deleteImgCloudinary } = require("../../middlewares/file.middleware");

const getAnimes = async (req, res, next) => {
  try {
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numAnimes = await Anime.countDocuments();
      let page = parseInt(req.query.page);
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let numPages =
        numAnimes % limit > 0 ? numAnimes / limit + 1 : numAnimes / limit;
      console.log(numPages);
      if (page > numPages || page < 1) {
        page = 1;
      }
      const skip = (page - 1) * limit;

      const allAnimes = await Anime.find().skip(skip).limit(limit);
      return res.status(200).json({
        info: {
          totalAnimes: numAnimes,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/animes?page=${page + 1}&limit=${limit}`
              : null,
          prev: page != 1 ? `/animes?page=${page - 1}&limit=${limit}` : null,
        },
        juegos: allAnimes,
      });
    } else {
      const allAnimes = await Anime.find().limit(10);
      const numAnimes = await Anime.countDocuments();

      return res.status(200).json({
        info: {
          totalAnimes: numAnimes,
          page: 1,
          limit: 10,
          next: numAnimes > 10 ? `/animes?page=2&limit=10` : null,
          prev: null,
        },
        juegos: allAnimes,
      });
    }
  } catch (error) {
    return next(new Error("Animes not found"));
  }
};

const getAnimeByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime = await Anime.findById(id);
    return res.status(200).json(anime);
  } catch (error) {
    return next(new Error("Anime by this ID not found"));
  }
};

const getAnimeByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const anime = await Anime.find({ title: title });
    return res.status(200).json(anime);
  } catch (error) {
    return next(new Error("Anime by this title not found"));
  }
};

const getAnimeMovies = async (req, res, next) => {
  try {
    const anime = await Anime.find({ type: { $eq: "movie" } });
    return res.status(200).json(anime);
  } catch (error) {
    return next(new Error("Anime movies not found"));
  }
};

const getAnimeSeries = async (req, res, next) => {
  try {
    const anime = await Anime.find({ type: { $eq: "series" } });
    return res.status(200).json(anime);
  } catch (error) {
    return next(new Error("Anime series not found"));
  }
};

const getTopRatedAnimes = async (req, res, next) => {
  try {
    const anime = await Anime.find({ myrating: { $eq: "⭐⭐⭐⭐⭐" } });
    return res.status(200).json(anime);
  } catch (error) {
    return next(new Error("Top rated animes not found"));
  }
};

const getAnimesByYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    const anime = await Anime.find({ year: year });
    return res.status(200).json(anime);
  } catch (error) {
    return next(new Error("Animes by this year not found"));
  }
};

const getAnimesByPlatform = async (req, res, next) => {
  try {
    const { platform } = req.params;
    const anime = await Anime.find({ platform: platform });
    return res.status(200).json(anime);
  } catch (error) {
    return next(new Error("Animes by this platform not found"));
  }
};

const createAnime = async (req, res, next) => {
  try {
    const newAnime = new Anime(req.body);
    if (req.files) {
      if (req.files.cover_x) {
        newAnime.cover_x = req.files.cover_x[0].path;
      }
      if (req.files.cover_y) {
        newAnime.cover_y = req.files.cover_y[0].path;
      }
      if (req.files.cover_background) {
        newAnime.cover_background = req.files.cover_background[0].path;
      }
    }
    await newAnime.save();
    return res.status(201).json(newAnime);
  } catch (error) {
    return next(new Error("Failed creating anime"));
  }
};

const deleteAnime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime = await Anime.findByIdAndDelete(id);
    if (anime.cover_x) {
      deleteImgCloudinary(anime.cover_x);
    }
    if (anime.cover_y) {
      deleteImgCloudinary(anime.cover_y);
    }
    if (anime.cover_background) {
      deleteImgCloudinary(anime.cover_background);
    }
    return res.status(200).json("Anime deleted");
  } catch (error) {
    return next(new Error("Failed deleting anime"));
  }
};

const updateAnime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateAnime = await Anime.findByIdAndUpdate(id, req.body);
    if (req.files) {
      if (req.files.cover_x) {
        newAnime.cover_x = req.files.cover_x[0].path;
      }
      if (req.files.cover_y) {
        newAnime.cover_y = req.files.cover_y[0].path;
      }
      if (req.files.cover_background) {
        newAnime.cover_background = req.files.cover_background[0].path;
      }
    }
    return res.status(200).json(updateAnime);
  } catch (error) {
    return next(new Error("Failed updating anime"));
  }
};

module.exports = {
  getAnimes,
  getAnimeByID,
  getAnimeByTitle,
  getAnimeMovies,
  getAnimeSeries,
  getTopRatedAnimes,
  getAnimesByYear,
  getAnimesByPlatform,
  createAnime,
  deleteAnime,
  updateAnime,
};
