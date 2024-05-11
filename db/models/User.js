import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatarURL: String,

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    token: String,
  },
  { versionKey: false },
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.validatePassword = async function (password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);

  return isPasswordCorrect;
};

export const User = model("user", userSchema);
