const Post = require("../models/postModel");
const slug = require("slug");

const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);

    const title = request.body.title;
    // console.log(title, slug(title, "-"));

    let generatedSlug = slug(title, "-");
    let findSlug = await Post.findOne({ slug: generatedSlug });

    if (findSlug) {
      let previousSlug = findSlug.slug;

      console.log("previousSlug : ", previousSlug);

      const result = Math.random().toString(36).substring(2, 7);
      generatedSlug = slug(title, "-") + result;
      console.log("generatedSlug : ", generatedSlug);
    }

    post.slug = generatedSlug;
    post.author = request.user._id;
    console.log("generatedSlug : ", generatedSlug);

    await post.save();

    await post.populate("author");

    response.status(200).send({
      success: true,
      message: "Post saved successfully",
      data: post,
    });

    console.log(post);
  } catch (error) {
    console.log(error);
    response.status(400).send({ success: false, error: error.message });
  }
};

const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).send({ msg: "Post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, {
      $set: request.body,
    });

    response.status(200).send("post updated successfully");
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      return response.status(404).json({ msg: "Post Not Found" });
    }
    await post.delete();

    response.status(200).send("post deleted successfully");
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

const getAllPosts = async (request, response) => {
  let username = request.query.username;
  let category = request.query.category;
  let posts;
  try {
    if (username) posts = await Post.find({ username: username });
    else if (category) posts = await Post.find({ categories: category });
    else posts = await Post.find({});

    response.status(200).send(posts);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = { createPost, updatePost, deletePost, getPost, getAllPosts };
