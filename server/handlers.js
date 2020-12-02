"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const assert = require("assert");
const fetch = require("node-fetch");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getLeague = async (req, res) => {
  console.log(req.body);
  try {
    fetch("https://api-football-beta.p.rapidapi.com/leagues?season=2020", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d2b58fa2a0msh36f7284eac9c62cp1cbd51jsne1071b1af765",
        "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })

      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    console.log(e);
  }
};

const getFixtures = async (req, res) => {
  console.log(req.body);
  try {
    fetch(
      "https://api-football-beta.p.rapidapi.com/fixtures?league=135&season=2020",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d2b58fa2a0msh36f7284eac9c62cp1cbd51jsne1071b1af765",
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })

      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    console.log(e);
  }
};

const getPredictions = async (req, res) => {
  console.log(req.body);

  try {
    const { id } = req.params;
    fetch(
      `https://api-football-beta.p.rapidapi.com/predictions?fixture=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d2b58fa2a0msh36f7284eac9c62cp1cbd51jsne1071b1af765",
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })

      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res) => {
  console.log(req.body);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("soccer_project");
    const users = await db.collection("users").find().toArray();
    console.log(users);

    res.status(200).json({
      users: users,
    });

    client.close();
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("soccer_project");
    const user = await db
      .collection("users")
      .insertOne({ name: "Alex Viapiano" });
    console.log(user);

    res.status(200).json({
      user: user,
    });
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  const { userId, email, password, favoriteTeam } = req.body;
  const _id = userId;
  const query = { _id };
  const newValue = {
    $set: { email: email, password: password, favoriteTeam: favoriteTeam },
  };

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("soccer_project");
    const user = await db.collection("users").updateOne(query, newValue);
    console.log(user);

    res.status(200).json({
      user: user,
    });

    client.close();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getLeague,
  getFixtures,
  getPredictions,
  getUser,
  createUser,
  updateUser,
};
