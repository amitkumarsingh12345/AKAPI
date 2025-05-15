const express = require("express");
const router = express.Router();
const {
  isSignIn,
  SignUp,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserByMobile,
} = require("../controllers/registrationController");

router.post("/sign-in", isSignIn);
router.post("/sign-up", SignUp);
router.put("/update/:reg_mobile", updateUser);
router.delete("/delete/:reg_mobile", deleteUser);
router.get("/find-users", getAllUsers);
router.get("/find-user/:reg_mobile", getUserByMobile);

module.exports = router;
