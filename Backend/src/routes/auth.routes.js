// author: Mehulkumar Bhunsadiya
const { Router } = require("express");
const {
    login,
    register,
    sendVerificationCode,
    resetPassword,
} = require("../controllers/auth/auth.controller");
const { createUserValidation } = require("../controllers/user/user.validator");
const isAuth = require("../middleware/auth");

const router = Router();

router.post("/login", login);
router.post("/register", createUserValidation, register);
router.post("/sendVerificationCode", sendVerificationCode);
router.post("/resetPassword", resetPassword);

module.exports = router;
