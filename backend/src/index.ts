// external
import cors from "cors";
import { WebSocketServer } from "ws";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import db from "./schemas/db.js";

// routers
import routers from "./routers.js";

// utils
import registerTextInput from "./utils/registerText.js";

export const app: Express = express();

const wss = new WebSocketServer({
  port: 8080,
});

console.log("wss.address: ", wss.address());

// Single db instance is used (with pooling) for the real-time path,
// as we're expecting literally hundreds of requests in a minute
registerTextInput(wss, db);

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
  cookieParser(),
);

routers.forEach((eachRouter) => app.use(eachRouter.path, eachRouter.router));

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost:${8000}`);
});
