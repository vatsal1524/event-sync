//Author: Dhruvin Dankhara

const { Router } = require("express");
const isAuth = require("../middleware/auth");
const {
  postRating,
  getRatingOfUserAndEvent,
} = require("../controllers/Rating/Rating.controller");
const router = Router();

//Subscription
router.post("/:id", isAuth, postRating);
router.get("/:id", isAuth, getRatingOfUserAndEvent);
module.exports = router;
