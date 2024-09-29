//external
import { WebSocketServer } from "ws";

// blueprints
import { DocumentVersionCreate } from "../blueprints/version.js";
import { Knex } from "knex";

const registerTextInput = async (
  wss: WebSocketServer,
  sharedDbInstance: Knex,
) => {
  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", async function message(data) {
      const receivedData: { doc_id: string; text: string } = JSON.parse(
        data.toString(),
      );

      const creatableinstance = new DocumentVersionCreate({
        doc_id: parseInt(receivedData.doc_id),
        text: receivedData.text,
      });
      const createdversion =
        await creatableinstance.createDocVersion(sharedDbInstance);

      wss.clients.forEach((client) => {
        if (client.readyState) {
          if (typeof createdversion.text === "string")
            client.send(createdversion.text);
        }
      });
    });
  });
};

export default registerTextInput;
