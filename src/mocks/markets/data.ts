import { faker } from "@faker-js/faker";
import { Market, MarketStat } from "./types";

const marketsTable: Record<string, Market> = {
  "BTC-USD": {
    name: "BTC-USD",
    syntheticName: "BTC",
    syntheticPrecision: 5,
    collateralName: "USD",
    collateralPrecision: 1,
  },
  "ETH-USD": {
    name: "ETH-USD",
    syntheticName: "ETH",
    syntheticPrecision: 4,
    collateralName: "USD",
    collateralPrecision: 2,
  },
  "BTC-EUR": {
    name: "BTC-EUR",
    syntheticName: "ETH",
    syntheticPrecision: 4,
    collateralName: "USD",
    collateralPrecision: 2,
  },
  "ETH-EUR": {
    name: "ETH-EUR",
    syntheticName: "ETH",
    syntheticPrecision: 4,
    collateralName: "USD",
    collateralPrecision: 2,
  },
};

const marketStatsTable: Record<string, number> = Object.keys(
  marketsTable
).reduce(
  (acc, market) => {
    acc[market] = faker.number.float({ min: 0, max: 1, fractionDigits: 5 });
    return acc;
  },
  {} as Record<string, number>
);

//Ticks simulation, happen independently if we have "subscribers" or not
//TODO: where to clean up this?
setInterval(() => {
  const randomMarket = faker.helpers.arrayElement(Object.keys(marketsTable));
  const isUp = faker.datatype.boolean();
  const priceTick = faker.number.float({
    min: 0.001,
    max: 0.01,
    fractionDigits: 5,
  });

  marketStatsTable[randomMarket] = isUp
    ? marketStatsTable[randomMarket] + priceTick
    : marketStatsTable[randomMarket] - priceTick;
}, 500);

type Maybe<K> = K | undefined;
export const getMarkets = (): Market[] => Object.values(marketsTable);
export const getStatsForMarket = (market: string): Maybe<MarketStat> =>
  marketStatsTable[market]
    ? { name: market, price: marketStatsTable[market] }
    : undefined;
