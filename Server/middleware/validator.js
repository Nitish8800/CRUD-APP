const { celebrate, Joi, errors, Segments } = require("celebrate");

const validateUsers = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] },
      })
      .trim(true)
      .required(),
    password: Joi.string().min(8).trim(true).required(),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    isAdmin: Joi.string().default("user"),
    pic: Joi.string().default(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ),
  }),
});

module.exports = validateUsers;
