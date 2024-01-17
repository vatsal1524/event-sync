// author: Mehulkumar Bhunsadiya
const { Router } = require("express");
const {
    getUserDetails,
    updateUserDetails,
    deleteUser,
} = require("../controllers/user/user.controller");
const isAuth = require("../middleware/auth");
const router = Router();

router.get("/:id", isAuth, getUserDetails);
router.put("/update/:id", isAuth, updateUserDetails);
router.delete("/delete/:id", isAuth, deleteUser);

module.exports = router;
