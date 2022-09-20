const { celebrate, Segments } = require("celebrate");
const {
  emailValidationSchema,
  passwordValidationSchema,
} = require("./signup.validator");

const validateUserLogin = celebrate({
  [Segments.BODY]: {
    email: emailValidationSchema,
    password: passwordValidationSchema,
  },
});

module.exports = {validateUserLogin};
