import jsonwebtoken from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";

import { findUserById } from "../services/userServices.js";

export const privateRoutesMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw HttpError(401);
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw HttpError(401);
    }

    const { id } = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    const user = await findUserById(id);

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
