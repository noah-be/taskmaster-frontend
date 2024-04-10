import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/todoApp";

export const dbConnect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.debug(`\x1b[32m[MongoDB] Connected to ${mongoURI}\x1b[0m`);
  } catch (err) {
    console.error(
      "\x1b[31m[MongoDB] Connection Error:",
      err.message,
      "\x1b[0m",
    );
  }
};

export const dbDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.debug("\x1b[32m[MongoDB] Disconnected\x1b[0m");
  } catch (err) {
    console.error(
      "\x1b[31m[MongoDB] Disconnection Error:",
      err.message,
      "\x1b[0m",
    );
  }
};
