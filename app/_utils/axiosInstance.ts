import axios from "axios";

const apiURL = "https://strapi-ecommerce-production.up.railway.app/api";
export const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});
