const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

//password encryption
//important to use function declaration so we have access to 'this'
userSchema.pre("save", function(next){
  const user = this
  if(!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) return next(err)
    user.password = hash
    next()
  })
})

//method to check encrypted password on login
userSchema.methods.checkPassword = function(passwordAttempt, callback){
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if(err) return callback(err)
    return callback(null, isMatch)
  })
}

// method to remove user's password for token/sending response to front end
userSchema.methods.withoutPassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema)
