const { celebrate, Joi, Segments } = require("celebrate");
const Roles = require("../../../constants/roles");
const {
  emailValidationSchema,
  passwordValidationSchema,
  phoneNumberValidationSchema,
  picValidationSchema,
} = require("./signup.validator");

const updateSchema = Joi.object({
  name: Joi.string(),
  email: emailValidationSchema,
  password: passwordValidationSchema,
  phoneNumber: phoneNumberValidationSchema,
  pic: picValidationSchema,
});

const updateSchemaWithRole = updateSchema.keys({
  isAdmin: Joi.string().default(Roles.USER),
});

const userUpdateValidator = celebrate({
  [Segments.BODY]: updateSchema,
});

const userUpdateRoleValidator = celebrate({
  [Segments.BODY]: updateSchemaWithRole,
});

module.exports = { userUpdateValidator, userUpdateRoleValidator };
