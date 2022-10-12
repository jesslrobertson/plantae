const express = require("express");
const postRouter = express.Router();
const Post = require("../models/post");
const mongoose = require("mongoose");
const User = require("../models/user");

// function compareNums(a, b) {
//   const totalA = a.upvotes.length - a.downvotes.length;
//   const totalB = b.upvotes.length - b.downvotes.length;
//   if (totalA > totalB) {
//     return -1;
//   } else if (totalA === totalB) {
//     return 0;
//   } else {
//     return 1;
//   }
// }

const populateQuery = [
  { path: "comments", populate: { path: "author", select: "username" } },
  { path: "user", select: "username" },
];

// Get All posts
postRouter.get("/", (req, res, next) => {
  Post.find()
    .populate(populateQuery)
    // ({
    //   path: "comments",
    //   populate: {
    //     path: "author",
    //     select: "username",
    //   },
    // })
    .exec((err, posts) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      console.log(posts);
      return res.status(200).send(posts);
    });
});

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

postRouter.get("/:user", (req, res, next) => {
  Post.find({ user: req.auth._id })
    .populate(populateQuery)
    .exec((err, posts) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      console.log(posts);
      return res.status(200).send(posts);
    });
});

// Get one post
postRouter.get("/singlePost/:postId", (req, res, next) => {
  Post.find({ _id: req.params.postId })
    .populate(populateQuery)
    .exec((err, post) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      console.log(post);
      return res.status(200).send(post);
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
    { new: true }
  )
    .populate(populateQuery)
    .exec((err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedPost);
    });
});

postRouter.put("/like/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    { _id: req.params.postId, user: req.auth._id },
    { $addToSet: { likes: req.auth._id } },
    { new: true }
  )
    .populate(populateQuery)
    .exec((err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedPost);
    });
});

postRouter.put("/removeLike/:postId", (req, res, next) => {
  Post.findByIdAndUpdate(
    { _id: req.params.postId },
    { $pull: { likes: mongoose.Types.ObjectId(req.auth._id) } },
    { new: true }
  )
    .populate(populateQuery)
    .exec((err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedPost);
    });
});

module.exports = postRouter;
