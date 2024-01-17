//author: Vatsal

const { Router } = require("express");

const {
  getFaqs,
  getAdminQueryById,
  createAdminQuery,
} = require("../controllers/support/support.controller");

const router = Router();

//Subscription
router.get("/faqs", getFaqs);
router.get("/adminquery/:userId", getAdminQueryById);
router.post("/adminquery/:userId", createAdminQuery);

module.exports = router;
