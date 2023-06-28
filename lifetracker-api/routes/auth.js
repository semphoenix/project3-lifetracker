const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  return res.status(200).json({
    ping: "pong!",
  });
});

module.exports = router;
