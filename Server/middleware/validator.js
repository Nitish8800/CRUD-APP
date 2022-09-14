const { celebrate, Joi, Segments } = require("celebrate");
const Roles = require("../constants/roles");

const validateUsers = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] },
      })
      .trim(true),
    password: Joi.string().min(8).trim(true),
    phoneNumber: Joi.string().length(10),
    isAdmin: Joi.string()
      .valid(...Object.values(Roles))
      .default(Roles.USER),
    pic: Joi.string().default(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ),
  },
});

module.exports = validateUsers;
