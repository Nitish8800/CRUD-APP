const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userList = async (req, res) => {
  let data = await Users.find();

  // res.json(data);
  res.status(200).send(data);
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

    res.status(200).send({ message: "ok", user });

    console.log("response", response);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

// userLogin
const userLogin = async (req, res) => {
  let { email, password } = req.body;
  let user = await Users.findOne({ email });

  console.log(req.headers);

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
        let token = await user.getJwtToken();

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 10923 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        });

        // console.log("req.cookies.jwt", req.cookies.jwt);

        console.log("Token", token);
        res.status(200).send({
          message: "Login Scessfully",
          user,
          token: { accessToken: token, expiresIn: process.env.JWT_EXPIRES },
        });
      } else {
        responseType.message = "Password is wrong";

        res
          .status(401)
          .send({ message: "Error", message: "Password is wrong" });
      }
    } else {
      res.status(404).send({ message: "User Not Found" });
      responseType.message = "User Not Found";
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

// userUpdate
const userUpdate = async (req, res) => {
  const user = await Users.findById(req.user.id);

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

// userDelete
const userDelete = async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);

  try {
    if (!user) {
      return res.status(404).send("User Not Found");
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
  const user = await Users.findById(req.params.id);

  try {
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    res.status(200).send({
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

// userUpdate by Admin
const userUpdateByAdmin = async (req, res) => {
  const user = await Users.findByIdAndUpdate(req.params.id);

  try {
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
