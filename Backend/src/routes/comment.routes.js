//Author: Dhruvin Dankhara

const { Router } = require("express");
const isAuth = require("../middleware/auth");
const {
  postComment,
  getCommentsbyEventId,
} = require("../controllers/comment/comment.controller");
const router = Router();

//Subscription
router.post("/post/:id", isAuth, postComment);
router.get("/:id", isAuth, getCommentsbyEventId);

module.exports = router;
