"use strict";

require("dotenv").config();

const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { email, displayName, photoURL } = req.body;
  await client.connect();

  const db = client.db("movieProject");
  const foundUser = await db
    .collection("movieUsers")
    .find({ email: email })
    .toArray();
  console.log(foundUser);
  if (foundUser.length === 0) {
    await db
      .collection("movieUsers")
      .insertOne({ email, displayName, photoURL });
    res.status(201).json({
      status: 201,
      data: "new user created",
    });
  } else {
    res.status(201).json({
      status: 201,
      data: "found user",
    });
  }

  client.close();
};

const getUser = async (req, res) => {
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

module.exports = {
  createUser,
  getUser,
};
