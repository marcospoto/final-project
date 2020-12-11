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
  console.log("addMovieUser");
  const client = await MongoClient(MONGO_URI, options);
  console.log(req.body);
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
  console.log();
  const { email } = req.body;
  console.log(email);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("movieProject");
    const users = await db.collection("movieUsers").findOne().toArray();
    if (seats.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No user found",
      });
    } else {
      const newUser = seats.reduce((acc, cur, i) => {
        acc[cur._id] = cur;
        return acc;
      }, {});

      res.status(200).json({
        status: 200,
        email: email,
        favorite: favorite,
      });
    }
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const handleFavorite = async (req, res) => {
  const { email, movie } = req.body;

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("movieProject");
  console.log(email);
  var movieUser = await db.collection("movieUsers").updateOne(
    { email: email },
    {
      $set: {
        favorites: movie.movie.id,
      },
    }
  );
  // console.log(movieUser);
  res.status(201).json({
    status: 201,
    data: movieUser,
  });

  client.close();
};

module.exports = {
  addMovieUser,
  getMovieUser,
  handleFavorite,
};
