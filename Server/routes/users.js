const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, authorizeRoles } = require("../middleware/auth");
const validateUsers = require("../middleware/validator");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Hello World Home ");
});

router.get(
  "/admin/list",
  auth,
  authorizeRoles("admin"),
  userController.userList
);

router.post("/add", validateUsers, userController.userAdd);

router.post("/login", userController.userLogin);

router.put("/update/:id", auth, userController.userUpdate);

router.delete(
  "/admin/delete/:id",
  auth,
  authorizeRoles("admin"),
  userController.userDelete
);

router.get(
  "/admin/getuser/:id",
  auth,
  authorizeRoles("admin"),
  userController.getSingleUser
);

module.exports = router;
