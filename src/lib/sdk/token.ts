import { BigNumber } from "./big-number";

export type Token = {
  id: string;
  symbol: string;
  name: string;
  address: string;
  price: BigNumber;
  balanceOf: (address: string) => Promise<BigNumber | undefined>;
};
