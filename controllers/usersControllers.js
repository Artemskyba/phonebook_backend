import { User } from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUserByEmail,
  removeToken,
  updateUserWithToken,
} from "../services/userServices.js";

export const userSignUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "User already exists!");
    }

    const createdUser = await createUser({ email, name, password });

    res.status(201).json({
      user: {
        name,
        email,
      },
      token: createdUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      throw HttpError(401, "Email or password incorrect");
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      throw HttpError(401, "Email or password incorrect");
    }

    const updatedUser = await updateUserWithToken(user.id);

    res.status(200).json({
      user: {
        name: user.name,
        email,
      },
      token: updatedUser.token,
    });
  } catch (e) {
    next(e);
  }
};

export const getCurrentUser = async (req, res, next) => {
  const { user } = req;

  res.json({
    name: user.name,
    email: user.email,
  });
};

export const logoutUser = async (req, res, next) => {
  try {
    const { user } = req;

    await removeToken(user.id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
