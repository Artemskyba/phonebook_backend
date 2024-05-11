import { User } from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUserByEmail,
  removeToken, updateUserAvatar,
  updateUserWithToken,
} from "../services/userServices.js";
import {updateImageSize} from "../helpers/updateImageSize.js";
import path from "path";
import * as fs from "fs/promises";
import gravatar from "gravatar";

export const userSignUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "User already exists!");
    }


    const avatarURL = gravatar.url(email, null, false);

    const createdUser = await createUser({ email, name, password, avatarURL });

    res.status(201).json({
      user: {
        name,
        email,
        avatarURL
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
        avatarURL: user.avatarURL
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
    avatarURL: user.avatarURL
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


export const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const avatarsDir = path.resolve("public", "avatars");

  try {
    if (!req.file) {
      throw HttpError(400, "No avatar");
    }

    const { path: tempUpload, originalname } = req.file;

    ////////add id to original name
    const filename = `${id}_${originalname}`;
    const resultUpload = path.resolve(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    ////formatting answer
    const updatedUrl = path.join("avatars", filename);
    const updatedUser = await updateUserAvatar(id, updatedUrl);

    ///////resize image with Jimp
    await updateImageSize(resultUpload);

    res.status(200).json({ avatarURL: updatedUser.avatarURL });
  } catch (e) {
    next(e);
  }
};
