const mongoose = require("mongoose");
const colors = require("colors");


// const Users = require("../models/userModel");
// const Post = require("../models/postModel");
// const tags = require("../models/tagsModel");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected...  ${conn.connection.host}  `);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(); // process.exit() is used to terminate the process
  }
};

module.exports = connectDB;
