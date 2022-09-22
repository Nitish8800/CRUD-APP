const Post = require("../models/postModel");
const slug = require("slug");
const { ObjectID } = require("mongodb");
const Tags = require("../models/tagsModel");

const createPost = async (request, response) => {
  const tagIds = request.body.tags;

  for (var i = 0; i < tagIds.length; i++) {
    if (!ObjectID.isValid(tagIds[i])) {
      return response.status(400).send({
        success: false,
        message: `Invalid Object ID ${tagIds[i]}`,
      });
    }
  }
  try {
    const post = await new Post(request.body);

    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: "Post Not Found" });
    }

    const title = request.body.title;

    let generatedSlug = slug(title, "-");
    const findSlug = await Post.findOne({ slug: generatedSlug });

    if (findSlug) {
      const previousSlug = findSlug.slug;

      console.log("previousSlug : ", previousSlug);

      const result = Math.random().toString(36).substring(2, 7);
      generatedSlug = slug(title, "-") + result;
      console.log("generatedSlug : ", generatedSlug);
    }

    post.slug = generatedSlug;
    post.author = request.user._id;

    console.log("generatedSlug : ", generatedSlug);

    console.log("post.tags : ", post.tags);

    const uniqueTags = new Set(tagIds); // ["63296172ae1a15920bdc236e","63296172ae1a15920bdc236r"]
    const tagFoundByID = await Tags.find({
      _id: {
        $in: Array.from(uniqueTags),
      },
    });

    if (uniqueTags.size !== tagFoundByID.length) {
      return res
        .status(400)
        .send({ success: false, message: "Tags Not Found" });
    }

    await post.save();
    await post.populate(["author", "tags"]);

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
    if (!ObjectID.isValid(request.params.id)) {
      return res.status(400).send({
        success: false,
        message: `Invalid Object ID : ${request.params.id}`,
      });
    }

    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).send({ success: false, message: "Post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, {
      $set: request.body,
    });

    await post.populate("tags");

    response.status(200).send({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    response.status(500).send({ success: false, error: error.message });
  }
};

const deletePost = async (request, response) => {
  try {
    if (!ObjectID.isValid(request.params.id)) {
      return res.status(400).send({
        success: false,
        message: `Invalid Object ID : ${request.params.id}`,
      });
    }
    const post = await Post.findById(request.params.id);

    if (!post) {
      return response.status(404).json({ msg: "Post Not Found" });
    }
    await post.delete();

    response.status(200).send({
      success: true,
      message: "Post Deleted Successfully",
      data: post,
    });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
};

const getPost = async (request, response) => {
  try {
    if (!ObjectID.isValid(request.params.id)) {
      // console.log("Error", request.params.id);
      return res.status(400).send({
        success: false,
        message: `Invalid Object ID : ${request.params.id}`,
      });
    }
    const post = await Post.findById(request.params.id).populate([
      "author",
      "tags",
    ]);

    response.status(200).json({
      success: true,
      message: "Get Single Post Successfully",
      data: post,
    });
  } catch (error) {
    response.status(500).json(error);
  }
};

const getPostBySlug = async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug }).populate([
      "author",
      "tags",
    ]);

    if (!post) {
      return res.status(400).send({
        success: false,
        message: "Post Not Found",
      });
    }

    console.log(post);

    response.status(200).send({
      success: true,
      message: "Get Single Post Successfully By Slug",
      data: post,
    });
  } catch (error) {
    response.status(500).json(error);
  }
};

const getAllPosts = async (request, response) => {
  let tag = request.query.tags;
  let posts;
  try {
    if (tag)
      posts = await Post.find({ tags: tag }).populate(["author", "tags"]);
    else posts = await Post.find({}).populate(["author", "tags"]);

    response.status(200).send({
      success: true,
      message: "Get All Post Successfully",
      data: posts,
    });
  } catch (error) {
    response.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  getPostBySlug,
};
