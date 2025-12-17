# Boring home task

## Description

You will need to implement a simple cryptocurrency exchange `Order Form` and `Order Book` widgets.

Order Form should have:
- market selector (`BTC-USD` and `ETH-USD`);
- current market price label (should be updated every N seconds);
- two inputs (`collateral amount` and `synthetic amount`);
- and a submit buttons (`BUY` and `SELL`).

Order Book should have:
- two lists of orders (buy and sell), each item should show order price and amount;
- spread label (difference between the lowest sell order and highest buy order).

User can input order amount using either collateral (e.g. USD) or synthetic (e.g. BTC) field,
and the other field should be calculated automatically based on the current market price:
- If collateral is used -> synthetic should be calculated as `synthetic = collateral / price`.
- If synthetic is used -> collateral should be calculated as `collateral = synthetic * price`.

When the form is submitted:
- A new order object should be created and sent to the exchange.
- Order object should have a `hash` field (value should be unique to any specific set of order parameters).
- Order should appear in the Order Book (it should be empty initially and display only orders created by the user).

Data (see `API` section for more details):
- Available markets are returned by the API endpoint `GET /api/v1/markets`.
- Current market stats `price` is returned by the API endpoint `GET /api/v1/markets/:market/stats`.
- Order should be submitted to the API endpoint `POST /api/v1/orders`.
- Order Book has no API and should be managed on the client side only (in-memory).
- You should use mock data for the API with some randomization for a market price
  (no need to add any BE here, `Mock Service Worker` library or even a simple `Promise` with a const data should be just fine).

UI schema:
```
 Order Book        Order Form
┌---------------┐ ┌---------------------┐
| Sell Order 2  | | Market:   BTC-USD ⌄ |
|---------------| |---------------------|
| Sell Order 1  | | Last Price:   42296 |
|---------------| |---------------------|
| Spread    0.1 | | BTC           0.001 |
|---------------| |---------------------|
| Buy Order 1   | | USD           42.30 |
|---------------| |---------------------|
| Buy Order 2   | | [BUY]        [SELL] |
└---------------┘ └---------------------┘
```

## Acceptance criteria

> Expected time to complete: 3-4 hours.
> After that we will schedule a call to discuss your solution and possible improvements (if any).

- **Using `React` is mandatory**.
- **Using `TypeScript` is mandatory**.
- This template is using `Vite`, but you're free to use any other framework or tooling.
- You can use any UI-kit (using native HTML elements is totally fine)/state management/networking/etc. library.
- You should prefer to have better UX over better UI.
- Amount inputs should be formatted according to the market assets precision.
- `Market selector` state and the last `synthetic amount` used should be persisted between page reloads.
- Market price should be updated every 5 seconds.
- You should ensure that your implementation is correct by providing basic tests.

**Please raise any questions/concerns if something is not clear.**

## API

### `GET /api/v1/markets`

Response example:
```json5
// HTTP 200
[
    {
        "name": "BTC-USD",
        "syntheticName": "BTC",
        "syntheticPrecision": 5,
        "collateralName": "USD",
        "collateralPrecision": 1,
    },
    {
        "name": "ETH-USD",
        "syntheticName": "ETH",
        "syntheticPrecision": 4,
        "collateralName": "USD",
        "collateralPrecision": 2,
    }
]
```

### `GET /api/v1/markets/:market/stats`

Response example:
```json5
// HTTP 200
{
    "market": "BTC-USD",
    "lastPrice": "42296.6",
}
```

### `POST /api/v1/orders`

Request example:
```json5
{
    "market": "BTC-USD",
    "side": "BUY",
    "price": "42296.6",
    "qty": "0.001",
    "hash": "0x1234567890abcdef",
}
```

Response example:
```json5
// HTTP 201
{
    "id": "1",
    "hash": "0x1234567890abcdef",
}
```
