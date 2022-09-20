const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const {
  userUpdateRoleValidator,
} = require("../middleware/Validator/user/userUpdate.validator");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const Roles = require("../constants/roles");
router.use(bodyParser.json());

// Admin Access routes
router.put(
  "/update/:id",
  userUpdateRoleValidator,
  auth,
  userController.userUpdateByAdmin
);

router.delete(
  "/delete/:id",
  auth,
  authorizeRoles(Roles.ADMIN),
  userController.userDelete
);

router.get(
  "/getuser/:id",
  auth,
  authorizeRoles(Roles.ADMIN),
  userController.getSingleUser
);

router.get("/list", auth, authorizeRoles(Roles.ADMIN), userController.userList);

module.exports = router;
