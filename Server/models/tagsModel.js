const mongoose = require("mongoose");

const TagsSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Tags = mongoose.model("Tags", TagsSchema);
module.exports = Tags;
