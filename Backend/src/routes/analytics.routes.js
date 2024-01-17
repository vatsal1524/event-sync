//author: Faizal

const { Router } = require("express");
const {
  getAnalyticsDetail,
  setPeopleAnalyticsDefault,
  setAgeAnalyticsDefault,
  getEventAnalyticsDetail,
  getAgeAnalyticsDetail,
  getPeopleAnalyticsDetail,
} = require("./../controllers/analytics/analytics.controller");
const { isOrganizer } = require("../utils/protected");
const isAuth = require("../middleware/auth");

const router = Router();

// router.post("/", isOrganizer, getAnalyticsDetail);
// router.post("/getEvent", isOrganizer, getEventAnalyticsDetail);
// router.post("/getPeople", isOrganizer, getPeopleAnalyticsDetail);
// router.post("/getAge", isOrganizer, getAgeAnalyticsDetail);
// router.post("/setPeople", isOrganizer, setPeopleAnalyticsDefault);
// router.post("/setAge", isOrganizer, setAgeAnalyticsDefault);
router.post("/", isAuth, getAnalyticsDetail);
router.post("/getEvent", isAuth, getEventAnalyticsDetail);
router.post("/getPeople", isAuth, getPeopleAnalyticsDetail);
router.post("/getAge", isAuth, getAgeAnalyticsDetail);
router.post("/setPeople", isAuth, setPeopleAnalyticsDefault);
router.post("/setAge", isAuth, setAgeAnalyticsDefault);

module.exports = router;
