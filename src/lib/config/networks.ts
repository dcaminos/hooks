import { NetworkD } from "lib/sdk/network";

export const networks: NetworkD[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    tokenId: "ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    id: "binance-smart-chain",
    name: "Binance Smart Chain",
    url: "https://bsc-dataseed.binance.org",
    tokenId: "binancecoin",
    image: "https://assets.coingecko.com/coins/images/18711/large/Unknown.png",
  },
  {
    id: "solana",
    name: "Solana",
    url: "https://api.mainnet-beta.solana.com",
    tokenId: "solana",
    image: "https://assets.coingecko.com/coins/images/4128/small/Solana.jpg",
  },
  {
    id: "moonriver",
    name: "Moonriver",
    url: "https://rpc.moonriver.moonbeam.network",
    tokenId: "moonriver",
    image: "https://assets.coingecko.com/coins/images/17984/large/9285.png",
  },
];
