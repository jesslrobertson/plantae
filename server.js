const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const { expressjwt } = require("express-jwt");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(morgan("dev"));
app.disable("etag");
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set EJS at templating engine
app.set("view engine", "ejs");

mongoose.connect(process.env.URI, () => console.log("Connected to the DB"));
//upload file
app.use("/upload", require("./routes/fileUploadRouter"));

app.use("/auth", require("./routes/authRouter.js"));
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);
app.use("/api/post", require("./routes/postRouter.js"));
app.use("/api/comment", require("./routes/commentRouter.js"));
app.use("/api/upload", require("./routes/fileUploadRouter.js"));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(9000, () => {
  console.log(`Server is running on local port 9000`);
});
