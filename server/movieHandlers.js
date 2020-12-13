"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addMovieUser = async (req, res) => {
  // console.log("addMovieUser");
  const client = await MongoClient(MONGO_URI, options);
  // console.log(req.body);
  await client.connect();

  const db = client.db("movieProject");

  const newUser = await db.collection("movieUsers").insertOne({ ...req.body });

  res.status(201).json({
    status: 201,
    data: { newUser },
  });

  client.close();
};

const getMovieUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("movieProject");

  const movieUser = await db.collection("movieUsers").findOne({
    email: req.params.email,
  });

  if (!movieUser) {
    res.status(404).json({
      status: 404,
      message: "No user",
    });
  } else {
    res.status(200).json({
      status: 200,
      movieUser: movieUser,
    });
  }
  client.close();
};

//   console.log();
//   const { email } = req.body;
//   console.log(email);
//   try {
//     const client = await MongoClient(MONGO_URI, options);
//     await client.connect();

//     const db = client.db("movieProject");
//     const user = await db.collection("movieUsers").findOne().toArray();
//     if (user.length === 0) {
//       res.status(404).json({
//         status: 404,
//         message: "No user found",
//       });
//     } else {
//       const newUser = user.reduce((acc, cur, i) => {
//         acc[cur._id] = cur;
//         return acc;
//       }, {});

//       res.status(200).json({
//         status: 200,
//         user: newUser,
//         email: email,
//         favorite: favorite,
//       });
//     }
//     client.close();
//   } catch (e) {
//     console.log(e);
//   }
// };

const addFavorite = async (req, res) => {
  const { email, movie } = req.body;
  const movieId = movie.movie.id;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("movieProject");
  // console.log(email);
  var movieUser = await db.collection("movieUsers").updateOne(
    { email: email },
    {
      $addToSet: {
        favorites: movieId,
      },
    },
    true
  );
  // console.log(movieUser);
  res.status(201).json({
    status: 201,
    data: movieUser,
  });

  client.close();
};

const deleteFavorite = async (req, res) => {
  const { email, movie } = req.body;
  const movieId = movie.movie.id;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("movieProject");
  // console.log(email);
  var movieUser = await db.collection("movieUsers").updateOne(
    { email: email },
    {
      $pull: {
        favorites: { $in: [movieId] },
      },
    },
    true
  );
  // console.log(movieUser);
  res.status(201).json({
    status: 201,
    data: movieUser,
  });

  client.close();
};

const getUserFavorites = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("movieProject");

  const movieUser = await db.collection("movieUsers").findOne({
    displayName: req.params.displayName,
  });

  if (!movieUser) {
    res.status(404).json({
      status: 404,
      message: "No user",
    });
  } else {
    res.status(200).json({
      status: 200,
      movieUser: movieUser.favorites,
    });
  }
  client.close();
};

module.exports = {
  addMovieUser,
  getMovieUser,
  addFavorite,
  getUserFavorites,
  deleteFavorite,
};
