const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/users");
const path = require("path");
const app = express();
app.use(express.json());
dotenv.config({
  path: path.join(__dirname, ".env"),
});

connectDB();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use("/users", userRoute);

let arrOfUsers = [
  { id: 1, name: "Nitish Kumar" },
  { id: 2, name: "Riyaz" },
  { id: 3, name: "Kritika" },
];

app.get("/string", (req, res) => {
  res.status(200).send("This is a String");
});

app.get("/user", (req, res) => {
  const obj = { id: 1, name: "Nitish Kumar" };
  res.status(200).send(obj);
});

app.get("/allusers", (req, res) => {
  res.status(200).send(arrOfUsers);
});

app.get("/allusers/:id", (req, res) => {
  const obj = arrOfUsers.find((x) => x.id === parseInt(req.params.id));
  res.status(200).send(obj);
});

app.post("/create", (req, res) => {
  arrOfUsers = [req.body, ...arrOfUsers];
  res.send(arrOfUsers);
});

app.get("/usersQuery", (req, res) => {
  const obj = arrOfUsers.find((x) => x.id === parseInt(req.query.id));
  res.status(200).send(obj);
});

app.get("/upload", (req, res) => {
 
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server started at port: " + PORT);
});
