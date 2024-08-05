import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("url", API_URL)

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const fetcher = async (url: string) => {
  const res = await api.get(url);
  if (!res.data) {
    throw Error(res.data.message);
  }
  return res.data;
};
