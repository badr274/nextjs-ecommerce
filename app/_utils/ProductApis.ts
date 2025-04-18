import { axiosInstance } from "./axiosInstance";

export const getLatestProducts = () =>
  axiosInstance.get("/products?populate=*");
export const getProductDetails = (productId: string) =>
  axiosInstance.get(`/products/${productId}?populate=*`);
export const getSimilarProducts = (category: string) =>
  axiosInstance.get(`/products?filters[category][$eq]=${category}&populate=*`);
