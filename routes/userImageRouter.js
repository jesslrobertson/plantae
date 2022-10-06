const express = require('express')
const userImageRouter = express.Router();
const UserImage = require("../models/userImage")

//get user images
userImageRouter.get("/", (req, res, next) => {
  console.log("get userImages");
  UserImage.find({user: req.auth._id}, (err, images) =>{
    if (err){
      res.status(500)
      return next(err)
    }
    res.status(200).json(images)
  });
})

userImageRouter.post("/", (req, res, next) => {
  res.body.user = req.auth._id
  const newImage = new UserImage(req.body);
  newImage.save((err, savedImage) => {
    if(err){
      res.status(500)
      return next(err)
    }
    res.status(201).json(savedImage);
  })
});

module.exports = userImageRouter

