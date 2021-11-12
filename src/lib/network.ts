import BN from "bn.js";
import { tokens } from "./config/tokens";
import { Token } from "./token";
import { EthereumNetwork } from "./networks/ethereum";
import { SolanaNetwork } from "./networks/solana";

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
  hookTemplate: string;
};

export class NetworkFactory {
  static from: (network: Network) => NetworkInterface = (network: Network) => {
    switch (network.id) {
      case "ethereum":
      case "binance-smart-chain":
      case "polygon-pos":
      case "moonriver": {
        return new EthereumNetwork(network);
      }
      case "solana": {
        return new SolanaNetwork(network);
      }
    }
  };
}

export interface NetworkInterface {
  id: NetworkId;
  name: string;
  url: string;
  tokenId: string;
  image: string;

  getTokens: (tokenIds: string[]) => Token[];
  getBalance: (walletAddress: string) => Promise<BN | undefined>;
  getTokenBalance: (
    walletAddress: string,
    tokenAddress: string
  ) => Promise<BN | undefined>;
}

export class GenericNetwork {
  id: NetworkId;
  name: string;
  url: string;
  tokenId: string;
  image: string;

  constructor(networ: Network) {
    this.id = networ.id;
    this.name = networ.name;
    this.url = networ.url;
    this.tokenId = networ.tokenId;
    this.image = networ.image;
  }

  getTokens: (tokenIds: string[]) => Token[] = (tokenIds: string[]) => {
    return tokens.filter(
      (t) => tokenIds.includes(t.id) && t.contracts[this.id] !== undefined
    );
  };
}
