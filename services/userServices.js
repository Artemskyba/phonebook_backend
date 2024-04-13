import { User } from "../db/models/User.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
};
