//external
import { WebSocketServer } from "ws";

// blueprints
import { DocumentVersionCreate } from "../blueprints/version.js";

// env vars
import { ERROR_CODE } from "../envs.js";

const registerTextInput = async (wss: WebSocketServer) => {
  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", async function message(data) {
      const receivedData: { doc_id: string; text: string } = JSON.parse(
        data.toString(),
      );

      if (!receivedData?.doc_id) {
        ws.send(ERROR_CODE ?? "");
      }
      console.log("receivedData: ", receivedData);

      const creatableinstance = new DocumentVersionCreate({
        doc_id: parseInt(receivedData.doc_id),
        text: receivedData.text,
      });
      const createdversion = await creatableinstance.createDocVersion();
      console.log("sending: ", createdversion.text);

      wss.clients.forEach((client) => {
        if (client.readyState) {
          // this is the new version
          if (typeof createdversion.text === "string")
            client.send(createdversion.text);
        }
      });
      // this was my older version
      ws.send(createdversion.text);
    });
  });
};

export default registerTextInput;
