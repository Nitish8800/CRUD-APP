const mongoose = require("mongoose");
// const Roles = require("../constants/roles");

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
      default:
        "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    },
    slug: {
      type: String,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    tags: {
      type: Array,
      ref: "Tags",
      required: false,
    },

    createdDate: {
      type: Date,
    },
  },

  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
