const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    isAdmin: { type: "String", default: false },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);

  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.getJwtToken = function (id) {
  return jwt.sign({ id: this._id }, process.env.JWT_SCERET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
