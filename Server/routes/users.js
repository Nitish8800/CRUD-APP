const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, authorizeRoles } = require("../middleware/auth");
const validateUsers = require("../middleware/validator");
const upload = require("../middleware/multerFileUpload");
const postController = require("../controllers/postController");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// User Access Routes
router.get("/", (req, res) => {
  res.send("Hello World Home ");
});

router.get(
  "/admin/list",
  auth,
  authorizeRoles("admin"),
  userController.userList
);

router.post(
  "/add",
  upload.single("pic"),
  validateUsers,
  userController.userAdd
);

router.post("/login", userController.userLogin);

router.put("/update", validateUsers, auth, userController.userUpdate);

// Admin Access routes
router.put(
  "/admin/update/:id",
  validateUsers,
  auth,
  userController.userUpdateByAdmin
);

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

// BLOG POST
router.get("/post/:id", postController.getPost);

router.get("/posts/", postController.getAllPosts);

router.post(
  "/post/create",
  auth,
  authorizeRoles("user"),
  postController.createPost
);

router.put(
  "/post/update/:id",
  auth,
  authorizeRoles("user"),
  postController.updatePost
);

router.delete("/post/delete/:id", auth, postController.deletePost);

module.exports = router;
