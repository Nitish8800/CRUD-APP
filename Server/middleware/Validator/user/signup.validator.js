const { celebrate, Joi, Segments } = require("celebrate");
const Roles = require("../../../constants/roles");

const passwordValidationSchema = Joi.string().min(8).required();
const emailValidationSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "in"] },
  })
  .trim(true)
  .required();

const phoneNumberValidationSchema = Joi.string().length(10);

const picValidationSchema = Joi.string().default(
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
);

const userSignUP = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: emailValidationSchema,
    password: passwordValidationSchema,
    phoneNumber: phoneNumberValidationSchema,
    pic: picValidationSchema,
  },
});

module.exports = {
  userSignUP,
  emailValidationSchema,
  passwordValidationSchema,
  phoneNumberValidationSchema,
  picValidationSchema,
};
