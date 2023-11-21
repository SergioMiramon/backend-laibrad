const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const connect = require("./src/utils/db");
const { configCloudinary } = require("./src/middlewares/file.middleware")

const server = express();
server.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

connect();
configCloudinary();

const AnimeRouter = require("./src/api/routes/anime.route");
server.use("/animes", AnimeRouter);

const BookRouter = require("./src/api/routes/books.route");
server.use("/books", BookRouter);

const MovieRouter = require("./src/api/routes/movies.route");
server.use("/movies", MovieRouter);

const OtherRouter = require("./src/api/routes/others.route");
server.use("/others", OtherRouter);

const SoundtrackRouter = require("./src/api/routes/soundtracks.route");
server.use("/soundtracks", SoundtrackRouter);

const UserRouter = require("./src/api/routes/user.route");
server.use("/users", UserRouter);

const jsonPaths = {
  "Anime": "/animes",
  "Books": "/books",
  "Movies": "/movies",
  "Others": "/others",
  "Soundtracks": "/soundtracks"
}

server.use("*", (req, res, next) => {
  return res.status(404).json(jsonPaths);
  // return res.status(404).json(`Route not found. Please research the API DOC 🙄`);
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on "http://localhost:${PORT}"`);
});
