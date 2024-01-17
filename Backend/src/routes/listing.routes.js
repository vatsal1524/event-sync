//author: Vatsal

const { Router } = require("express");

const {
  getEvents,
  addUserToEvent,
} = require("../controllers/listing/listing.controller");

const router = Router();

//Subscription
router.post("/events", getEvents);
router.post("/join", addUserToEvent);

module.exports = router;
