const { celebrate, Joi, Segments } = require("celebrate");

const titleValidation = Joi.string().max(16);
const descriptionValidationSchema = Joi.string().trim().min(20);
const authorValidationSchema = Joi.string().length(10);

const pictureValidationSchema = Joi.string().default(
  "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
);

const tagsValidation = Joi.array().items(Joi.string()).min(1).max(5);

const postSchema = Joi.object({
  title: titleValidation,
  description: descriptionValidationSchema,
  author: authorValidationSchema,
  picture: pictureValidationSchema,
  tags: tagsValidation,
});

// create require type, but ignore id
const postSchemaRequired = postSchema.fork(
  ["title", "description", "picture", "tags"],
  (s) => s.required()
);

const postValidation = celebrate({
  [Segments.BODY]: postSchemaRequired,
});

const updatedPostValidation = celebrate({
  [Segments.BODY]: postSchema,
});

module.exports = {
  postValidation,
  updatedPostValidation,
};
