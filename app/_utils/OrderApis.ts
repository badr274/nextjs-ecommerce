import { IOrder } from "../_interfaces";
import { axiosInstance } from "./axiosInstance";

interface IOrderPayload {
  data: IOrder;
}
export const createOrder = (payload: IOrderPayload) =>
  axiosInstance.post("/orders", payload);
