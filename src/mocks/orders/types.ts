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
