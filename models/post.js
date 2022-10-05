const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  uploadedImg:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserImage"
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Post", postSchema)

