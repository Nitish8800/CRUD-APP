const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    createdDate: {
      type: Date,
    },
  },

  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
