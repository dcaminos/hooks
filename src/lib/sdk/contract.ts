import { ethers } from "ethers";
import { Network } from "./network";

export type Contract = {
  address: string;
};

export interface ContractInterface {
  address: string;
  call: (methodName: string, args: any[]) => Promise<any[]>;
}

export class EthereumContract implements ContractInterface {
  constructor(
    public network: Network,
    public address: string,
    public abi: string
  ) {}

  call = async (methodName: string, args: any[]): Promise<any[]> => {
    const provider = new ethers.providers.JsonRpcProvider(this.network.url);
    const ethersContract = new ethers.Contract(
      this.address,
      this.abi,
      provider
    );
    return await ethersContract[methodName](...args);
  };
}
