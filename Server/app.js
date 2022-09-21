const express = require("express");
const swaggerui = require("swagger-ui-express");
const swaggerdoc = require("./swagger/swagger.json");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/users");
const adminRoute = require("./routes/admin");
const postRoute = require("./routes/posts");
const tagsRoute = require("./routes/tags");
const path = require("path");
const cookieParser = require("cookie-parser");
const { errors: celebrateErrors } = require("celebrate");
// const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload());
dotenv.config({
  path: path.join(__dirname, ".env"),
});

connectDB();
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.static(path.join(__dirname, "upload")));

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerdoc));
app.use("/users", userRoute);
app.use("/admin", adminRoute);
app.use("/posts", postRoute);
app.use("/tags", tagsRoute);

// let arrOfUsers = [
//   { id: 1, name: "Nitish Kumar" },
//   { id: 2, name: "Riyaz" },
//   { id: 3, name: "Kritika" },
// ];

// app.get("/string", (req, res) => {
//   res.status(200).send("This is a String");
// });

// app.get("/user", (req, res) => {
//   const obj = { id: 1, name: "Nitish Kumar" };
//   res.status(200).send(obj);
// });

// app.get("/allusers", (req, res) => {
//   res.status(200).send(arrOfUsers);
// });

// app.get("/allusers/:id", (req, res) => {
//   const obj = arrOfUsers.find((x) => x.id === parseInt(req.params.id));
//   res.status(200).send(obj);
// });

// app.post("/create", (req, res) => {
//   arrOfUsers = [req.body, ...arrOfUsers];
//   res.send(arrOfUsers);
// });

// app.get("/usersQuery", (req, res) => {
//   const obj = arrOfUsers.find((x) => x.id === parseInt(req.query.id));
//   res.status(200).send(obj);
// });

// app.post("/upload", (req, res) => {
//   const file = req.files.file;
//   console.log(req.headers);
//   let path = __dirname + "/upload/" + Date.now() + ".jpg";
//   file.mv(path, (err) => {
//     res.send("OK");
//   });
// });

app.use(celebrateErrors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server started at port: " + PORT);
});
