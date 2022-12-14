const Tags = require("../models/tagsModel");
const { ObjectID } = require("mongodb");

// Create a new tag
const createTag = async (request, response) => {
  try {
    const tag = await new Tags(request.body); // tag unique

    if (!tag) {
      return response
        .status(404)
        .send({ success: false, message: "Tag Not Found" });
    }

    await tag.save();

    response.status(200).send({
      success: true,
      message: "Tag saved successfully",
      data: tag,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send({ success: false, error: error.message });
  }
};

const updateTag = async (request, response) => {
  try {
    if (!ObjectID.isValid(request.params.id)) {
      // console.log("Error", request.params.id);
      return res.status(400).send({
        success: false,
        message: `Invalid Object ID : ${request.params.id}`,
      });
    }
    const tag = await Tags.findById(request.params.id);

    if (!tag) {
      return response
        .status(404)
        .send({ success: false, message: "Tag Not Found" });
    }

    await Tags.findByIdAndUpdate(request.params.id, {
      $set: request.body,
    });

    response
      .status(200)
      .send({ success: true, message: "Tag saved successfully", data: tag });
  } catch (error) {
    response.status(500).send({ success: false, error: error.message });
  }
};

const deleteTag = async (request, response) => {
  try {
    if (!ObjectID.isValid(request.params.id)) {
      // console.log("Error", request.params.id);
      return response.status(400).send({
        success: false,
        message: `Invalid Object ID : ${request.params.id}`,
      });
    }
    const tag = await Tags.findById(request.params.id);

    if (!tag) {
      return response
        .status(404)
        .json({ success: false, msg: "Tag Not Found" });
    }
    await tag.delete();

    response
      .status(200)
      .send({ success: true, message: "Tag Deleted Successfully", data: tag });
  } catch (error) {
    response.status(500).send({ success: false, error: error.message });
  }
};

const getTag = async (request, response) => {
  try {
    if (!ObjectID.isValid(request.params.id)) {
      // console.log("Error", request.params.id);
      return response.status(400).send({
        success: false,
        message: `Invalid Object ID : ${request.params.id}`,
      });
    }
    const tag = await Tags.findById(request.params.id);

    if (!tag) {
      return response
        .status(404)
        .json({ success: false, msg: "Tag Not Found" });
    }

    response.status(200).send({
      success: true,
      message: "Tag get successfully",
      data: tag,
    });
  } catch (error) {
    response.status(500).send({ success: false, error: error.message });
  }
};

const getAllTags = async (request, response) => {
  try {
    let tags = await Tags.find();

    if (!tags) {
      return response
        .status(404)
        .json({ success: false, msg: "Tag Not Found" });
    }
    response.status(200).send({
      success: true,
      message: "All Tags get successfully",
      data: tags,
    });
  } catch (error) {
    response.status(500).send({ success: false, error: error.message });
  }
};

module.exports = { createTag, updateTag, deleteTag, getTag, getAllTags };
