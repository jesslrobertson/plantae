const express = require("express");
const fileUploadRouter = express.Router();
require("dotenv").config();

fileUploadRouter.post("/", (req, res, next) => {
  if (req.files === null) {
    res.status(400);
    return next(new Error("No file uploaded"));
  }
  const file = req.files.file;
  file.name = file.name.replace(/\s/g, "_");
  file.mv(`./client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      res.status(500);
      return next(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});



module.exports = fileUploadRouter;

