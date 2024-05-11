import { User } from "../db/models/User.js";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const findUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

export const updateUserWithToken = async (id) => {
  const { SECRET_KEY } = process.env;

  const token = jsonwebtoken.sign({ id }, SECRET_KEY);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { token },
    { new: true }
  );

  return updatedUser;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  const userWithToken = await updateUserWithToken(newUser.id);

  return userWithToken;
};

export const removeToken = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

export async function updateUserAvatar(userID, newAvatar) {
  return User.findByIdAndUpdate(
      userID,
      { avatarURL: newAvatar },
      { new: true },
  );
}
