// author: Mehulkumar Bhunsadiya
const { Router } = require("express");

const {
    getRecommendationById
} = require("../controllers/recommendation/recommendation.controller");

const router = Router();

//Subscription
router.get("/recommendation/:userId", getRecommendationById);

module.exports = router;
