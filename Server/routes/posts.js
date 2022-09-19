const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const validateUsers = require("../middleware/validator");
const postController = require("../controllers/postController");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// BLOG POST
router.get("/:id", postController.getPost);

router.get("/", postController.getAllPosts);

router.post("/create", auth, authorizeRoles("user"), postController.createPost);

router.put(
  "/update/:id",
  auth,
  authorizeRoles("user"),
  postController.updatePost
);

router.delete("/delete/:id", auth, postController.updatePost);

module.exports = router;
