const express = require("express");
const postRouter = express.Router();
const Post = require("../models/post.js");
const mongoose = require("mongoose");
const User = require("../models/user")



// Get All posts
postRouter.get('/', (req, res, next) => {
  Post.find().populate({
    populate: {
      path: "comments",
      model: "Comment"
    },
      populate: {
        path: "author",
        select: "username"
      }
  }).exec((err, posts) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(posts)
  })
})


// Add new post
postRouter.post("/", (req, res, next) => {
  console.log(req.body);
  req.body.user = req.auth._id;
  const newPost = new Post(req.body);
  newPost.save((err, savedPost) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedPost);
  });
});

//Get posts by user id
postRouter.get("/:user", (req, res, next) => {
  Post.find({ user: req.auth._id }, (err, posts) => {
    if (err) {
      res.status(500);
      return next(err);
    }
  }).populate({
    populate: {
      path: "comments",
      model: "Comment"
    },
      populate: {
        path: "author",
        select: "username"
      }
  }).exec((err, posts) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(posts)
  });
});

// Delete post
postRouter.delete("/:postId", (req, res, next) => {
  Post.findOneAndDelete(
    { _id: req.params.postId, user: req.auth._id },
    (err, deletedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send();
    }
  );
});

// Update post
postRouter.put("/:postId", (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedPost);
    }
  );
});

// Like post
postRouter.put("/like/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    { _id: req.params.postId, user: req.auth._id },
    { $addToSet: { likes: req.auth._id }},
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      console.log(`${updatedPost}`);
      return res.status(201).send(updatedPost);
    }
  );
});

// Remove like
postRouter.put("/removeLike/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    { _id: req.params.postId },
    { $pull: { likes: mongoose.Types.ObjectId(req.auth._id) } },
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      console.log(`${updatedPost}`);
      return res.status(201).send(updatedPost);
    }
  );
});


module.exports = postRouter;
