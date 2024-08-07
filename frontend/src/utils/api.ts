import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const fetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    if (res.status === 200) return res.data;
  } catch (error) {
    if (error) {
      throw Error("Error while fetching data");
    }
  }
};
