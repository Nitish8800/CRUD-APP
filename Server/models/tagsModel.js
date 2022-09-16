const mongoose = require("mongoose");

const TagsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const Tags = mongoose.model("Tags", TagsSchema);
module.exports = Tags;
