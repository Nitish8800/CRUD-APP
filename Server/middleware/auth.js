const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const auth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next("Invalid jwt token", 401);
  }

  const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Users.findById(verifyUser.id);

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User Not Found",
    });
  }

  req.user = user;

  console.log("verifyUSer", verifyUser);
  console.log("user", req.user);

  next();
};

// Admin Roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.isAdmin)) {
      return next(`${req.user.isAdmin} cannot the access this resource`, 403);
    }
    next();
  };
};

module.exports = { auth, authorizeRoles };
