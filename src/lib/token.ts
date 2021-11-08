import { NetworkId } from "./network";
import BN from "bn.js";

export type Token = {
  id: string;
  symbol: string;
  name: string;
  contracts: {
    [key in NetworkId]?: string;
  };
};

export type TokenInfo = {
  price: BN;
};

export type TokensInfo = {
  [key: string]: TokenInfo;
};
