import { Network } from "../lib/network";

export const networks: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    tokenId: "ethereum",
  },
  {
    id: "binance-smart-chain",
    name: "Binance Smart Chain",
    url: "https://bsc-dataseed.binance.org",
    tokenId: "binancecoin",
  },
  {
    id: "solana",
    name: "Solana",
    url: "https://api.mainnet-beta.solana.com",
    tokenId: "solana",
  },
  {
    id: "moonriver",
    name: "Moonriver",
    url: "https://rpc.moonriver.moonbeam.network",
    tokenId: "moonriver",
  },
];
