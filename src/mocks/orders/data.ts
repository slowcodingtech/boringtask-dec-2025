import { faker } from "@faker-js/faker";
import { Order, OrderRequest } from "./types";

export const ordersTable: Record<string, Order> = {};

export const createOrder = (orderRequest: OrderRequest) => {
  const id = faker.string.uuid();
  const order = { id, ...orderRequest };
  ordersTable[id] = order;
  return order;
};

export const getOrders = () => Object.values(ordersTable);
