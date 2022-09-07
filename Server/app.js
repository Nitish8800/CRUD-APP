const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/users");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, ".env"),
});
connectDB();

app.use("/users", userRoute);

// console.log(process.env.PORT);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server started at port: " + PORT);
});
