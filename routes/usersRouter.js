import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema } from "../schemas/userSchemas.js";
import { userSignUp } from "../controllers/usersControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", validateBody(createUserSchema), userSignUp);

userRouter.post("/login");

userRouter.post("/logout");

userRouter.get("/current");

export default userRouter;
