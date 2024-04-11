//#region import
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./src/routes/index.js";
import mdws from "./src/middlewares/index.js";
import { dbConnect, dbDisconnect } from "./config/dbConnect.js";
import dotenv from "dotenv";
//#endregion

const app = express();
let serverInstance;
let isServerRunning = false;

//#region environment
dotenv.config();
const BASE_DIR = process.env.BASE_DIR || process.cwd();
const port = process.env.PORT || 3009;
const viewsDirectories = [
  path.join(BASE_DIR, "views/layouts"),
  path.join(BASE_DIR, "views/pages"),
  path.join(BASE_DIR, "views/partials"),
];
process.env.NODE_ENV === "development" && app.use(morgan("dev"));
//#endregion

export const startServer = () => {
  return new Promise((resolve, reject) => {
    try {
      dbConnect();

      app.set("view engine", "ejs");
      app.set("etag", "strong");
      app.set("views", viewsDirectories);
      app.use(cookieParser());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      // Routes
      app.use(express.static(path.join(BASE_DIR, "public")));
      app.use("/api/auth", routes.authRoutes);
      app.use("/api/task", routes.taskRoutes);
      app.use("/", routes.generalRoutes);

      // Middlewares
      app.use(mdws.notFoundMiddleware);
      app.use(mdws.errorHandlingMiddleware);

      serverInstance = app.listen(port, () => {
        isServerRunning = true;
        const serverDomain = process.env.SERVER_DOMAIN || "localhost";
        const currentTime = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        console.debug(
          `[${currentTime}] \x1b[94m\x1b[1m[Server]\x1b[0m \x1b[94mhttp://${serverDomain}:${port} 🚀\x1b[0m`,
        );
        resolve(serverInstance);
      });
    } catch (error) {
      console.error("Error starting server:", error);
      reject(error);
    }
  });
};

export const stopServer = async () => {
  if (serverInstance) {
    await dbDisconnect();

    return new Promise((resolve, reject) => {
      serverInstance.close((err) => {
        if (err) {
          console.error("Error stopping server:", err);
          reject(err);
          return;
        }
        isServerRunning = false;
        console.log("Server stopped");
        resolve();
      });
    });
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export const getServerStatus = () => isServerRunning;
export default app;
