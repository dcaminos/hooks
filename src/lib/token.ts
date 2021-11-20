import { NetworkId } from "./network";
import { BigNumber } from "./big-number";

export type Token = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  contracts: {
    [key in NetworkId]?: string;
  };
};

export type TokenInfo = {
  price: BigNumber;
};

export type TokensInfo = {
  [key: string]: TokenInfo;
};
