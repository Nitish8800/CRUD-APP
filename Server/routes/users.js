const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, authorizeRoles } = require("../middleware/auth");
const { userSignUP } = require("../middleware/Validator/user/signup.validator");
const {
  validateUserLogin,
} = require("../middleware/Validator/user/login.validator");
const {
  userUpdateValidator,
} = require("../middleware/Validator/user/userUpdate.validator");
const upload = require("../middleware/multerFileUpload");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// User Access Routes
router.get("/", (req, res) => {
  res.send("Hello World Home ");
});

router.post("/add", upload.single("pic"), userSignUP, userController.userAdd);

router.post("/login", validateUserLogin, userController.userLogin);

router.put("/update", userUpdateValidator, auth, userController.userUpdate);

module.exports = router;
