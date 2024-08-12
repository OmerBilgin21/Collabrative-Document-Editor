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

const useAxios = async (url: string, method: string, data?: any) => {
  try {
    const res = await api(
      data
        ? {
            url,
            method,
            data,
          }
        : { url, method },
    );

    if (res.status === 200) return res.data;
  } catch (error) {
    throw Error("Error while fetching data");
  }
};

export default useAxios;
