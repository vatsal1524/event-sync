// author: Preetha Kachhadiya

const { Router } = require('express')
const {
  addEventToWishlist,
  getAllEventsFromWishlist,
  removeEventFromWishlist,
  checkEventInWishlist
  // updateEvent,
  // getEventById,
  // cancelEvent,
} = require('../controllers/wishlist/wishlist.controller')
const isAuth = require("../middleware/auth");
// const {
//     createEventValidation,
//     updateEventValidation,
// } = require("../controllers/event/event.validator");
// const { isOrganizer } = require("../utils/protected");

const router = Router()

//Subscription
router.post('/add', isAuth, addEventToWishlist)
router.post('/', isAuth, getAllEventsFromWishlist)
router.post('/checkEventInWishlist', isAuth, checkEventInWishlist)
router.post('/remove', isAuth, removeEventFromWishlist)
// router.put("/update/:id", updateEventValidation, updateEvent);
// router.get("/complete/:id", completeEventById);
// router.delete("/cancel", cancelEvent);

module.exports = router
