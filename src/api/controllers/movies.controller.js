const Movie = require("../models/movies.model");
const { deleteImgCloudinary } = require("../../middlewares/file.middleware");

const getMovies = async (req, res, next) => {
  try {
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numMovies = await Movie.countDocuments();
      let page = parseInt(req.query.page);
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let numPages =
        numMovies % limit > 0 ? numMovies / limit + 1 : numMovies / limit;
      console.log(numPages);
      if (page > numPages || page < 1) {
        page = 1;
      }
      const skip = (page - 1) * limit;

      const allMovies = await Movie.find().skip(skip).limit(limit);
      return res.status(200).json({
        info: {
          totalMovies: numMovies,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/movies?page=${page + 1}&limit=${limit}`
              : null,
          prev: page != 1 ? `/movies?page=${page - 1}&limit=${limit}` : null,
        },
        juegos: allMovies,
      });
    } else {
      const allMovies = await Movie.find().limit(10);
      const numMovies = await Movie.countDocuments();

      return res.status(200).json({
        info: {
          totalMovies: numMovies,
          page: 1,
          limit: 10,
          next: numMovies > 10 ? `/movies?page=2&limit=10` : null,
          prev: null,
        },
        juegos: allMovies,
      });
    }
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};

const getMovieByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movie by this ID not found"));
  }
};

const getMovieByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const movie = await Movie.find({ title: title });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movie by this title not found"));
  }
};

const getMoviesByDirector = async (req, res, next) => {
  try {
    const { director } = req.params;
    const movie = await Movie.find({ director: director });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies by this director not found"));
  }
};

const getTopRatedMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({ myrating: { $eq: "⭐⭐⭐⭐⭐" } });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Top rated movies not found"));
  }
};

const getMoviesByYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    const movie = await Movie.find({ year: year });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies by this year not found"));
  }
};
const getMoviesFrom1900s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1900 } }, { year: { $lte: 1909 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1910s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1910 } }, { year: { $lte: 1919 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1920s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1920 } }, { year: { $lte: 1929 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1930s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1930 } }, { year: { $lte: 1939 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1940s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1940 } }, { year: { $lte: 1949 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1950s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1950 } }, { year: { $lte: 1959 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1960s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1960 } }, { year: { $lte: 1969 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1970s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1970 } }, { year: { $lte: 1979 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1980s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1980 } }, { year: { $lte: 1989 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom1990s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 1990 } }, { year: { $lte: 1999 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom2000s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 2000 } }, { year: { $lte: 2009 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom2010s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 2010 } }, { year: { $lte: 2019 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesFrom2020s = async (req, res, next) => {
  try {
    const movie = await Movie.find({
      $and: [{ year: { $gte: 2020 } }, { year: { $lte: 2029 } }],
    });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies not found"));
  }
};
const getMoviesByGenre = async (req, res, next) => {
  try {
    const { genre } = req.params;
    const movie = await Movie.find({ genre: genre });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies by this genre not found"));
  }
};
const getMoviesByPlatform = async (req, res, next) => {
  try {
    const { platform } = req.params;
    const movie = await Movie.find({ platform: platform });
    return res.status(200).json(movie);
  } catch (error) {
    return next(new Error("Movies by this platform not found"));
  }
};

const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    if (req.files) {
      if (req.files.cover_x) {
        newMovie.cover_x = req.files.cover_x[0].path;
      }
      if (req.files.cover_y) {
        newMovie.cover_y = req.files.cover_y[0].path;
      }
      if (req.files.cover_background) {
        newMovie.cover_background = req.files.cover_background[0].path;
      }
    }
    await newMovie.save();
    return res.status(201).json(newMovie);
  } catch (error) {
    return next(new Error("Failed creating movie"));
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (movie.cover_x) {
      deleteImgCloudinary(movie.cover_x);
    }
    if (movie.cover_y) {
      deleteImgCloudinary(movie.cover_y);
    }
    if (movie.cover_background) {
      deleteImgCloudinary(movie.cover_background);
    }
    return res.status(200).json("Movie deleted");
  } catch (error) {
    return next(new Error("Failed deleting movie"));
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateMovie = await Movie.findByIdAndUpdate(id, req.body);
    if (req.files) {
      if (req.files.cover_x) {
        newMovie.cover_x = req.files.cover_x[0].path;
      }
      if (req.files.cover_y) {
        newMovie.cover_y = req.files.cover_y[0].path;
      }
      if (req.files.cover_background) {
        newMovie.cover_background = req.files.cover_background[0].path;
      }
    }
    return res.status(200).json(updateMovie);
  } catch (error) {
    return next(new Error("Failed updating movie"));
  }
};

module.exports = {
  getMovies,
  getMovieByID,
  getMovieByTitle,
  getMoviesByDirector,
  getTopRatedMovies,
  getMoviesByYear,
  getMoviesFrom1900s,
  getMoviesFrom1910s,
  getMoviesFrom1920s,
  getMoviesFrom1930s,
  getMoviesFrom1940s,
  getMoviesFrom1950s,
  getMoviesFrom1960s,
  getMoviesFrom1970s,
  getMoviesFrom1980s,
  getMoviesFrom1990s,
  getMoviesFrom2000s,
  getMoviesFrom2010s,
  getMoviesFrom2020s,
  getMoviesByGenre,
  getMoviesByPlatform,
  deleteMovie,
  createMovie,
  updateMovie,
};
