const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Exercise = require("../models/exercise");

router.get("/me", async function (req, res, next) {
  try {
    const user = await User.fetchById(req.body.userId); // Change to use token later
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.login(req.body);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/exercise/:id", async function (req, res, next) {
  try {
    const exerciseData = await Exercise.fetchByUserId(req.params.id);
    return res.status(200).json(exerciseData);
  } catch (err) {
    next(err);
  }
});

router.post("/exercise/create", async function (req, res, next) {
  try {
    const user = await Exercise.createExercise(req.body);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
