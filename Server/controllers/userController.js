const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { ObjectID } = require("mongodb");

const userList = async (req, res) => {
  let data = await Users.find();

  // res.json(data);
  res.status(200).send({
    success: true,
    message: "All User Get Successfully",
    data: data,
  });
};

// userAdd
const userAdd = async (req, res) => {
  let { name, email, password, phoneNumber } = req.body;
  try {
    let user = await Users.create({
      name,
      email,
      password,
      phoneNumber,
    });

    let token = await user.getJwtToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 10923 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    // console.log("cookie", cookie);
    res.cookie();

    console.log("images", req.file);

    user.pic = "/users/" + req.file.filename;

    let response = await user.save();

    res.status(200).send({
      success: true,
      message: "User saved successfully",
      data: user,
    });

    console.log("response", response);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// userLogin
const userLogin = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Password is wrong",
      });
    }
    const token = await user.getJwtToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 10923 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
      token: { accessToken: token, expiresIn: process.env.JWT_EXPIRES },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// userUpdate
const userUpdate = async (req, res) => {
  // console.log("User update");
  if (!req.user) {
    return res.status(400).send({
      success: false,
      message: "User Not Found",
    });
  }
  try {
    const user = await Users.findById(req.user.id);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// userDelete
const userDelete = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      // console.log("Error", req.params.id);
      return res.status(400).send(`No Record with given ID ${req.params.id}`);
    }

    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    res.status(200).send({
      success: true,
      message: "User deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

// getSingleUser
const getSingleUser = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      // console.log("Error", req.params.id);
      return res.status(400).send({
        success: false,
        message: `Invalid Object ID ${req.params.id}`,
      });
    }
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    res
      .status(200)
      .send({ success: true, message: "User saved successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// userUpdate by Admin
const userUpdateByAdmin = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      // console.log("Error", req.params.id);
      return res.status(400).send(`No Record with given ID ${req.params.id}`);
    }
    const user = await Users.findByIdAndUpdate(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.pic = req.body.pic || user.pic;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        pic: updatedUser.pic,
        password: updatedUser.password,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  userList,
  userAdd,
  userLogin,
  userUpdate,
  userDelete,
  getSingleUser,
  userUpdateByAdmin,
};
