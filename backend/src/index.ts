// external
import cors from "cors";
import { WebSocketServer } from "ws";
import express, { Express } from "express";

// routers
import routers from "./routers.js";

// utils
import registerTextInput from "./utils/registerText.js";

export const app: Express = express();

const wss = new WebSocketServer({
  port: 8080,
});

console.log("wss.address: ", wss.address());

registerTextInput(wss);

app.use(express.json(), express.urlencoded({ extended: true }), cors());

routers.forEach((eachRouter) => app.use(eachRouter.path, eachRouter.router));

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost:${8000}`);
});
