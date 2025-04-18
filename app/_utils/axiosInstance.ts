import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEI;
const apiURL = "http://localhost:1337/api";
export const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});
