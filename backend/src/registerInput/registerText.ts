import { WebSocketServer } from "ws";
import db from "../schemas/db.js";
import { IDoc } from "../schemas/doc.js";

interface IPartialDoc {
  id: number;
  text: string;
}

const updateDoc = async (doc: IPartialDoc): Promise<{ text: string }[]> => {
  return await db("docs")
    .returning("text")
    .where({ id: doc.id })
    .update("text", doc.text);
};

const registerTextInput = async (wss: WebSocketServer) => {
  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", async function message(data) {
      const doc: IDoc = JSON.parse(data.toString());
      console.log("doc: ", doc);
      const updated = await updateDoc(doc);
      console.log("updated: ", updated);
      ws.send(updated[0].text);
    });
  });
};

export default registerTextInput;
