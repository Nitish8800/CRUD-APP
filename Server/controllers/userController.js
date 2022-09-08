const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userList = async (req, res) => {
  let data = await Users.find();

  // res.json(data);
  res.status(200).send(data);
};

// userAdd
const userAdd = async (req, res) => {
  let { name, email, password, phoneNumber, pic } = req.body;
  try {
    let data = await Users.create({
      name,
      email,
      password,
      phoneNumber,
      pic,
    });
    let response = await data.save();
    let mytoken = await data.getAuthToken();
    console.log(req.body);
    res.status(200).json({ message: "ok", mytoken, response });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

// userLogin
const userLogin = async (req, res) => {
  let { email, password } = req.body;
  let user = await Users.findOne({ email });

  var responseType = {
    message: "ok",
  };
  try {
    if (user) {
      console.log(user.password);
      let match = await bcrypt.compare(password, user.password);

      if (match) {
        responseType.message = "Login Sucessfull";
        responseType.token = "ok";
        // let mytoken = await user.getAuthToken();
        // res.status(200).json({ message: "Login Scessfully", user });
      } else {
        responseType.message = "Password is wrong";

        // res.status(401).json({ message: "Error", message: "Password is wrong" });
      }
    } else {
      // res.status(404).json({ message: "User Not Found" });
      responseType.message = "User Not Found";
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }

  res.status(200).json({ message: "ok", user, responseType });
};

// userUpdate
const userUpdate = async (req, res) => {
  const user = await Users.findById(req.params.id);

  try {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
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

// userDelete
const userDelete = async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);

  try {
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    res.status(200).json({
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
  const user = await Users.findById(req.params.id);

  try {
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    res.status(200).json({
      success: true,
      message: "ok",
      user,
    });
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
};
