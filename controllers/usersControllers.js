import HttpError from "../helpers/HttpError.js";
import { findUserByEmail } from "../services/userServices.js";

export const userSignUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "User already exists!");
    }
  } catch (error) {
    next(error);
  }
};
