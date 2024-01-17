//author: Faizal

const { Router } = require("express");
const {
  addNotifications,
  getNotifications,
} = require("./../controllers/notifications/notifications.controller");
const isAuth = require("../middleware/auth");

const router = Router();

router.post("/", isAuth, addNotifications);
router.post("/getNotifications", isAuth, getNotifications);

module.exports = router;
