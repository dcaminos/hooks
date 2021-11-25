export type NetworkId =
  | "ethereum"
  | "binance-smart-chain"
  | "polygon-pos"
  | "solana"
  | "moonriver";

export type Network = {
  id: NetworkId;
  name: string;
  url: string;
  tokenId: string;
  image: string;
};
