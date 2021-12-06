import { NetworkD } from "lib/sdk/network";

export const networks: NetworkD[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    tokenId: "ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    blockTime: 3,
  },
  {
    id: "binance-smart-chain",
    name: "Binance Smart Chain",
    url: "https://bsc-dataseed.binance.org",
    tokenId: "binancecoin",
    image: "https://assets.coingecko.com/coins/images/18711/large/Unknown.png",
    blockTime: 3.04,
  },
  {
    id: "solana",
    name: "Solana",
    url: "https://api.mainnet-beta.solana.com",
    tokenId: "solana",
    image: "https://assets.coingecko.com/coins/images/4128/small/Solana.jpg",
    blockTime: 3,
  },
  {
    id: "moonriver",
    name: "Moonriver",
    url: "https://rpc.moonriver.moonbeam.network",
    tokenId: "moonriver",
    image: "https://assets.coingecko.com/coins/images/17984/large/9285.png",
    blockTime: 12.9,
  },
  {
    id: "avalanche",
    name: "Avalanche",
    url: "https://api.avax.network/ext/bc/C/rpc",
    tokenId: "avalanche-2",
    image:
      "https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png?1604021818",
    blockTime: 3,
  },
  {
    id: "polygon-pos",
    name: "Matic",
    url: "https://rpc-mainnet.maticvigil.com/",
    tokenId: "matic-network",
    image:
      "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
    blockTime: 3,
  },
];
