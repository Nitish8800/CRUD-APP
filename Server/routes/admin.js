const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const validateUsers = require("../middleware/validator");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Admin Access routes
router.put(
  "/update/:id",
  validateUsers,
  auth,
  userController.userUpdateByAdmin
);

router.delete(
  "/delete/:id",
  auth,
  authorizeRoles("admin"),
  userController.userDelete
);

router.get(
  "/getuser/:id",
  auth,
  authorizeRoles("admin"),
  userController.getSingleUser
);

router.get("/list", auth, authorizeRoles("admin"), userController.userList);

module.exports = router;
