// author: Preetha Kachhadiya

const { Router } = require('express')
const {
  getAllOpenAdminQueries,
  getPendingApprovalRequests,
  updateApprovalStatus,
  updateAdminQuery,
  createEventOrganizerRequest
  // updateEvent,
  // getEventById,
  // cancelEvent,
} = require('../controllers/admin/admin.controller')
const isAuth = require("../middleware/auth");
// const {
//     createEventValidation,
//     updateEventValidation,
// } = require("../controllers/event/event.validator");
// const { isOrganizer } = require("../utils/protected");

const router = Router()

//Subscription
router.post("/send-request", isAuth, createEventOrganizerRequest);
router.post('/get-queries', getAllOpenAdminQueries)
router.post('/get-approval-requests', getPendingApprovalRequests)
router.post('/update-approval-request', updateApprovalStatus)
router.post('/update-query', updateAdminQuery)
// router.put("/update/:id", updateEventValidation, updateEvent);
// router.get("/complete/:id", completeEventById);
// router.delete("/cancel", cancelEvent);

module.exports = router
