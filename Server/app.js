const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/users");
const path = require("path");
const app = express();
dotenv.config({
  path: path.join(__dirname, ".env"),
});
connectDB();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use("/users", userRoute);

app.get("/string", (req, res) => {
  res.status(200).send("This is a String");
});
app.get("/user", (req, res) => {
  const obj = { id: 1, name: "Nitish Kumar" };
  res.status(200).send(obj);
});

// console.log(process.env.PORT);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server started at port: " + PORT);
});
