import express from "express";
import validateBody from "../helpers/validateBody.js";
import {createUserSchema, loginUserSchema} from "../schemas/userSchemas.js";
import {loginUser, userSignUp} from "../controllers/usersControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", validateBody(createUserSchema), userSignUp);

userRouter.post("/login", validateBody(loginUserSchema), loginUser);

userRouter.post("/logout");

userRouter.get("/current");

export default userRouter;
