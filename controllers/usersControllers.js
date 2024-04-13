import HttpError from "../helpers/HttpError.js";
import { createUser, findUserByEmail } from "../services/userServices.js";

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
      throw HttpError(401, "Email or password incorrect")
    }


  } catch (e) {
    next(e);
  }
};
