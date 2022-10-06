const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userImageSchema = new Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);





const UserImage = mongoose.model("UserImage", userImageSchema);

module.exports = UserImage;
