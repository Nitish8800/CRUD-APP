const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Hello World Home ");
});

router.get("/list", userController.userList);

router.post("/add", userController.userAdd);

router.post("/login", userController.userLogin);

router.put("/update/:id", userController.userUpdate);

router.delete("/delete/:id", userController.userDelete);

router.get("/getuser/:id", userController.getSingleUser);

module.exports = router;
