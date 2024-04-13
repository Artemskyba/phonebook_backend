import express from "express";

const userRouter = express.Router();

userRouter.post("/signup");

userRouter.post("/login");

userRouter.post("/logout");

userRouter.get("/current");

export default userRouter;
