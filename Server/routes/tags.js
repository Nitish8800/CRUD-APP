const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const tagsController = require("../controllers/postController");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Tags For Post
router.get("/tag/:id", tagsController.getTag);

router.get("/tags", tagsController.getAllTags);

router.post(
  "/tag/create",
  auth,
  authorizeRoles("admin"),
  tagsController.createTag
);

router.put(
  "/tag/update/:id",
  auth,
  authorizeRoles("admin"),
  tagsController.updateTag
);

router.delete(
  "/tag/delete/:id",
  auth,
  authorizeRoles("admin"),
  tagsController.deleteTag
);

module.exports = router;