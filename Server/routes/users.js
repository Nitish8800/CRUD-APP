const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, authorizeRoles } = require("../middleware/auth");
const validateUsers = require("../middleware/validator");
const upload = require("../middleware/multerFileUpload");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// User Access Routes
router.get("/", (req, res) => {
  res.send("Hello World Home ");
});

router.post(
  "/add",
  upload.single("pic"),
  validateUsers,
  userController.userAdd
);

router.post("/login", userController.userLogin);

router.put("/update", validateUsers, auth, userController.userUpdate);

module.exports = router;
