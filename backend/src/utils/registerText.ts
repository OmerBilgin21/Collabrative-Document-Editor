//external
import { WebSocketServer } from "ws";

// blueprints
import { DocumentVersionCreate } from "../blueprints/version.js";

const registerTextInput = async (wss: WebSocketServer) => {
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
      const createdversion = await creatableinstance.createDocVersion();

      wss.clients.forEach((client) => {
        if (client.readyState) {
          if (typeof createdversion.text === "string")
            client.send(createdversion.text);
          // client.send(receivedData.text);
        }
      });
    });
  });
};

export default registerTextInput;
