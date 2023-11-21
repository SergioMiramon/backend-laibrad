const express = require("express");

const {
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
} = require("../controllers/anime.controller");
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

const AnimeRouter = express.Router();

AnimeRouter.get("/", getAnimes);
AnimeRouter.get("/byid/:id", getAnimeByID);
AnimeRouter.get("/bytitle/:title", getAnimeByTitle);
AnimeRouter.get("/bytype/movies", getAnimeMovies);
AnimeRouter.get("/bytype/series", getAnimeSeries);
AnimeRouter.get("/toprated", getTopRatedAnimes);
AnimeRouter.get("/byyear/:year", getAnimesByYear);
AnimeRouter.get("/byplatform/:platform", getAnimesByPlatform);
AnimeRouter.post("/", [isAuth], coverUpload, createAnime);
AnimeRouter.put("/:id", [isAuth], coverUpload, updateAnime);
AnimeRouter.delete("/:id", [isAuth], deleteAnime);

module.exports = AnimeRouter;
