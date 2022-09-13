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
    isAdmin: { type: "String", default: "user" },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
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

userSchema.methods.getJwtToken = async function () {
  let params = {
    id: this._id,
    email: this.email,
    phone: this.phoneNumber,
  };

  var tokenValue = jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  // var verifyuser = jwt.verify(tokenValue, process.env.JWT_SECRET);
  // this.tokens = this.tokens.concat({ token: tokenValue });
  // await this.save();
  return tokenValue;
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
