export type Market = {
  name: string;
  syntheticName: string;
  syntheticPrecision: number;
  collateralName: string;
  collateralPrecision: number;
};

export type MarketStat = {
  name: string;
  price: number;
};
