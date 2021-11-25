export type Wallet = {
  id: string;
  name: string;
  address: string;
  key?: string;
  type: "defi" | "binance";
};
