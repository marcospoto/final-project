"use strict";

require("dotenv").config();

const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

console.log(process.cwd());
const createUser = async (req, res) => {
  console.log("mongo_uri", MONGO_URI);
  // const returningUser = await getUser(req.body.email);
  // console.log(returningUser);
  const client = await MongoClient(MONGO_URI, options);
  console.log(req.body);
  const { email, displayName, photoURL } = req.body;
  console.log(email);
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

module.exports = {
  createUser,
  // getUser,
};
