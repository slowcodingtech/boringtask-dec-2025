import { http, RequestHandler } from "msw";
import { SUCCESS_RESPONSE } from "../common";
import { createOrder, getOrders } from "./data";
import { OrderRequest } from "./types";

const getAllOrders = http.get("/api/v1/orders", () => {
  return SUCCESS_RESPONSE(getOrders());
});

const postOrderRequest = http.post("/api/v1/orders", async ({ request }) => {
  const orderRequest = await request.json();
  const storedOrder = createOrder(orderRequest as OrderRequest);
  return SUCCESS_RESPONSE(storedOrder);
});

export const ORDERS_API_HANDLER: RequestHandler[] = [
  getAllOrders,
  postOrderRequest,
];
