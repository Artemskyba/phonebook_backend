import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema, loginUserSchema } from "../schemas/userSchemas.js";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  userSignUp,
} from "../controllers/usersControllers.js";
import { privateRoutesMiddleware } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/signup", validateBody(createUserSchema), userSignUp);

userRouter.post("/login", validateBody(loginUserSchema), loginUser);

userRouter.post("/logout", privateRoutesMiddleware, logoutUser);

userRouter.get("/current", privateRoutesMiddleware, getCurrentUser);

export default userRouter;
