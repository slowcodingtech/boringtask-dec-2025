import { http, type RequestHandler } from "msw";
import {
  BAD_REQUEST_RESPONSE,
  NOT_FOUND_RESPONSE,
  SUCCESS_RESPONSE,
} from "../common";
import { getStatsForMarket, getMarkets } from "./data";

const getMarketsHandler = http.get("/api/v1/markets", () => {
  return SUCCESS_RESPONSE(getMarkets());
});

const getMarketStatsHandler = http.get(
  "/api/v1/markets/:market/stats",
  ({ params }) => {
    const { market } = params;
    const isParamWellFormed =
      typeof market === "string" && market.trim().length > 0;

    if (isParamWellFormed) {
      const stats = getStatsForMarket(market);

      if (stats) {
        return SUCCESS_RESPONSE(stats);
      } else {
        return NOT_FOUND_RESPONSE;
      }
    } else {
      return BAD_REQUEST_RESPONSE;
    }
  }
);

export const MARKET_API_HANDLER: RequestHandler[] = [
  getMarketsHandler,
  getMarketStatsHandler,
];
