import UserImage from "../models/userImage.js";
export const getUserImages = async (req, res) => {
  console.log("get userImages");
  try {
    const userImage = await UserImage.find();
    res.status(200).json(userImage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createUserImage = async (req, res) => {
  const userImage = new UserImage(req.body);
  try {
    await userImage.save();
    res.status(201).json(userImage);
  } catch (error) {}
};
