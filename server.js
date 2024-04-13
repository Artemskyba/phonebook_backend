import { connectDB } from "./db/connection.js";
import app from "./app.js";
import "dotenv/config";

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
