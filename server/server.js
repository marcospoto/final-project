const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { createUser, getUser } = require("./handlers");
const {
  addMovieUser,
  getMovieUser,
  addFavorite,
  getUserFavorites,
  deleteFavorite,
} = require("./movieHandlers");

require("dotenv").config();
const PORT = process.env.PORT || 5678;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./client/build"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .post("/users", createUser)
  .get("/users/:email", getUser)
  .put("/favorites", addFavorite)
  .put("/users-favorites/:displayName", deleteFavorite)
  .get("/users-favorites/:displayName", getUserFavorites)

  .post("/movie-users", addMovieUser)
  .get("/movie-users", getMovieUser)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
