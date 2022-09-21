const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const tagsController = require("../controllers/tagsController");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Tags For Post
router.get("/:id", tagsController.getTag);

router.get("/", tagsController.getAllTags);

router.post("/create", auth, authorizeRoles("admin"), tagsController.createTag);

router.put(
  "/update/:id",
  auth,
  authorizeRoles("admin"),
  tagsController.updateTag
);

router.delete(
  "/delete/:id",
  auth,
  authorizeRoles("admin"),
  tagsController.deleteTag
);

module.exports = router;
