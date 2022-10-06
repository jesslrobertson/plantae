const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

