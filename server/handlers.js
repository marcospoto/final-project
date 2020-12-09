"use strict";

// const admin = require("firebase-admin");
require("dotenv").config();

const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const assert = require("assert");

// require("dotenv").config("/server");

// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: "service_account",
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
//   }),
//   databaseURL: process.env.FB_DATABASE_URL,
// });

// const db = admin.database();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const queryDatabase = async (key) => {
//   const ref = db.ref(key);
//   let data;
//   await ref.once(
//     "value",
//     (snapshot) => {
//       data = snapshot.val();
//     },
//     (err) => {
//       console.log(err);
//     }
//   );

//   return data;
// };

// this function will return either the user object or false.
// const getUser = async (email) => {
//   const data = (await queryDatabase(`appUsers`)) || {};
//   const dataValue = Object.keys(data)
//     .map((item) => data[item])
//     .find((obj) => obj.email === email);

//   return dataValue || false;
// };

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
