// external
import express, { Express } from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

// types
import DocRouter from "./endpoints/doc.js";

// utils
import registerTextInput from "./registerInput/registerText.js";

export const app: Express = express();

const wss = new WebSocketServer({
  port: 8080,
});

console.log("wss.address: ", wss.address());

registerTextInput(wss);

app.use(express.json(), express.urlencoded({ extended: true }), cors());

app.use("/docs", DocRouter);

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost:${8000}`);
});
