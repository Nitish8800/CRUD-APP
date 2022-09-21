const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const postController = require("../controllers/postController");
const Roles = require("../constants/roles");
const {
  postValidation,
  updatedPostValidation,
} = require("../middleware/Validator/post/post.validator");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// BLOG POST
router.get("/:id", postController.getPost);

router.get("/", postController.getAllPosts);

router.get("/slug/:slug", postController.getPostBySlug);

router.post(
  "/create",
  postValidation,
  auth,
  authorizeRoles(Roles.USER),
  postController.createPost
);

router.put(
  "/update/:id",
  updatedPostValidation,
  auth,
  authorizeRoles(Roles.USER),
  postController.updatePost
);

router.delete("/delete/:id", auth, postController.deletePost);

module.exports = router;
