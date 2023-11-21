const express = require("express");

const {
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
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller");
const isAuth = require("../../middlewares/auth.middleware")
const { upload } = require("../../middlewares/file.middleware");
const coverUpload = upload.fields([
  {
    name: "cover_x",
  },
  {
    name: "cover_y",
  },
  {
    name: "cover_background",
  },
]);

const MovieRouter = express.Router();

MovieRouter.get("/", getMovies);
MovieRouter.get("/byid/:id", getMovieByID);
MovieRouter.get("/bytitle/:title", getMovieByTitle);
MovieRouter.get("/bydirector/:director", getMoviesByDirector);
MovieRouter.get("/toprated", getTopRatedMovies);
MovieRouter.get("/byyear/:year", getMoviesByYear);
MovieRouter.get("/1900s", getMoviesFrom1900s);
MovieRouter.get("/1910s", getMoviesFrom1910s);
MovieRouter.get("/1920s", getMoviesFrom1920s);
MovieRouter.get("/1930s", getMoviesFrom1930s);
MovieRouter.get("/1940s", getMoviesFrom1940s);
MovieRouter.get("/1950s", getMoviesFrom1950s);
MovieRouter.get("/1960s", getMoviesFrom1960s);
MovieRouter.get("/1970s", getMoviesFrom1970s);
MovieRouter.get("/1980s", getMoviesFrom1980s);
MovieRouter.get("/1990s", getMoviesFrom1990s);
MovieRouter.get("/2000s", getMoviesFrom2000s);
MovieRouter.get("/2010s", getMoviesFrom2010s);
MovieRouter.get("/2020s", getMoviesFrom2020s);
MovieRouter.get("/bygenre/:genre", getMoviesByGenre);
MovieRouter.get("/byplatform/:platform", getMoviesByPlatform);
MovieRouter.post("/", [isAuth], coverUpload, createMovie);
MovieRouter.put("/:id", [isAuth], coverUpload, updateMovie);
MovieRouter.delete("/:id", [isAuth], deleteMovie);

module.exports = MovieRouter;
