//Author: Dhruvin Dankhara

const { Router } = require("express");
const {
    getEvents,
    createEvent,
    completeEventById,
    updateEvent,
    getEventById,
    cancelEvent,
} = require("./../controllers/event/event.controller");
const {
    createEventValidation,
    updateEventValidation,
} = require("../controllers/event/event.validator");
const { isOrganizer } = require("../utils/protected");
const isAuth = require("../middleware/auth");

const router = Router();

//Subscription
router.post("/create", isAuth, isOrganizer, createEventValidation, createEvent);
router.get("/", isAuth, getEvents);
router.get("/:id", isAuth, getEventById);
router.put(
    "/update/:id",
    isAuth,
    isOrganizer,
    updateEventValidation,
    updateEvent
);
router.get("/complete/:id", isAuth, isOrganizer, completeEventById);
router.delete("/cancel", isAuth, isOrganizer, cancelEvent);

module.exports = router;
