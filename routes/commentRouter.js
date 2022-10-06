const express = require("express");
const commentRouter = express.Router();
// const Comment = require('../models/comment.js')
const Post = require("../models/post");
const mongoose = require("mongoose");



commentRouter.post("/:postId", (req, res, next) => {
  const newComment = req.body;
  Post.findByIdAndUpdate(
    { _id: req.params.postId, user: req.auth._id },
    { $addToSet: { comments:{ comment: newComment.comment, author: mongoose.Types.ObjectId(req.auth._id)}} },
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      } // return res.status(201).send({ updatedPost });
      console.log(updatedPost)
    }
  );
  Post.find({_id: req.params.postId}).populate({
    path: "comments",
      populate: {
        path: "author",
        select: "username"
      }
  }).exec((err, populatedPost) => {
    if (err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send({populatedPost})
  })
});


// Delete comment
commentRouter.delete("/:postId/:commentId", (req, res, next) => {
  console.log(req.params)
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    { $pull: {comments: { _id: req.params.commentId}}},
    { new: true },
    function(err, updatedPost){
      if(err){
        res.status(500)
        return next(err)
      }
      res.status(201).send(updatedPost)
    }
  )
});


// commentRouter.delete("/:postId/:commentId", (req, res, next) => {
//   console.log(req.params)
//   Post.comments.id(req.params.commentId).remove(
//     // { _id: req.params.postId },
//     // { $pull: { [comments.comment]: mongoose.Types.ObjectId(req.params.commentId)} } ,
//     // { new: true },
//     (err, updatedPost) => {
//       console.log('updated post, after findByIdAndUpdate is called')
//       console.log(updatedPost)
//       if (err) {
//         res.status(500);
//         return next(err);
//       }
//       return res
//         .status(200)
//         .send(updatedPost);
//     }
//   );
// });
// Update comment
commentRouter.put("/:commentId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedComment);
    }
  );
});

module.exports = commentRouter;
