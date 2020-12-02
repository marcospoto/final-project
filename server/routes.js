const router = require("express").Router();

const {
  getLeague,
  getFixtures,
  getPredictions,
  getUser,
  createUser,
  updateUser,
} = require("./handlers");

router.get("/api/user", getUser);
router.post("/api/user", createUser);
router.put("/api/user", updateUser);

router.get("/api/testFootball", getLeague);
router.get("/api/testFootball/fixtures", getFixtures);

router.get("/api/testFootball/fixtures/:id", getPredictions);

module.exports = router;
