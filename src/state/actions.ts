export type Side = "buy" | "sell";
export type OrderRequest = {
  market: string;
  side: Side;
  price: number;
  qty: number;
  hash: string;
};

export type Order = OrderRequest & {
  id: string;
};

export const sendOrderCreateRequest = async (request: OrderRequest) => {
  const response = await fetch("/api/v1/orders", {
    method: "post",
    body: JSON.stringify(request),
  });

  const newOrder = await response.json();
  console.log(newOrder);
};
