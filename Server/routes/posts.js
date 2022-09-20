const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const postController = require("../controllers/postController");
const Roles = require("../constants/roles");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// BLOG POST
router.get("/:id", postController.getPost);

router.get("/", postController.getAllPosts);

router.post(
  "/create",
  auth,
  authorizeRoles(Roles.USER),
  postController.createPost
);

router.put(
  "/update/:id",
  auth,
  authorizeRoles(Roles.USER),
  postController.updatePost
);

router.delete("/delete/:id", auth, postController.updatePost);

module.exports = router;
