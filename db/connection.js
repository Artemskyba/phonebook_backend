import { connect } from "mongoose";
import "dotenv/config";
const { MONGODB_STRING } = process.env;

export const connectDB = async () => {
  try {
    await connect(MONGODB_STRING);
    console.log("DB is connected!");
  } catch (error) {
    console.log(error);
  }
};
