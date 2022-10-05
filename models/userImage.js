import mongoose from "mongoose";

const userImageSchema = mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);





const UserImage = mongoose.model("UserImage", userImageSchema);
export default UserImage;
