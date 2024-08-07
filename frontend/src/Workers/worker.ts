import { fetcher } from "../utils/api";

onmessage = async function (e) {
  setInterval(async () => {
    const newData = await fetcher(`/docs/${e.data}`);

    if (newData) {
      postMessage(JSON.stringify(newData));
    }
  }, 1000);
};
