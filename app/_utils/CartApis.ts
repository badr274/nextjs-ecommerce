import { axiosInstance } from "./axiosInstance";

interface ICart {
  data: {
    username: string;
    email: string;
    products: string[];
  };
}
export const addToCart = (payload: ICart) =>
  axiosInstance.post("/carts", payload);
export const getCartItems = (email: string) =>
  axiosInstance.get(
    `/carts?populate[products][populate]=*&filter[email][$eq]=${email}`
  );
export const deleteCartItem = (documentId: string) =>
  axiosInstance.delete(`/carts/${documentId}`);
