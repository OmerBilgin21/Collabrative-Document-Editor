import { WebSocketServer } from "ws"
import db from "../schemas/db.js"
import { IDoc } from "../schemas/doc.js"

const updateDoc = async (doc: IDoc): Promise<IDoc> => {
  return await db("docs").returning("*").where({ id: doc.id }).update(doc);
}

const registerTextInput = async (wss: WebSocketServer) => {

  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", async function message(data) {
      const doc: IDoc = JSON.parse(data.toString())
      const updated = await updateDoc(doc)
      console.log('updated: ', updated)
      ws.send(doc.text)
    });

  });

}

export default registerTextInput
