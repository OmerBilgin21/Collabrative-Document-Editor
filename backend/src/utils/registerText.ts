import { WebSocketServer } from "ws";
import Document from "../blueprints/doc.js";

const registerTextInput = async (wss: WebSocketServer) => {
  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", async function message(data) {
      const doc = new Document(JSON.parse(data.toString()));
      const updated = await doc.updateDoc(doc);

      console.log("updated: ", updated);

      ws.send(updated.text);
    });
  });
};

export default registerTextInput;
