import { ethers } from "ethers";
import { Network } from "./network";

export type ContractType = "ethereum" | "solana";

export type ContractD = {
  type: ContractType;
  network: Network;
  address: string;
  abi?: string;
};

export class Contract {
  private _type: ContractType;
  private _network: Network;
  private _address: string;
  private _abi?: string;

  constructor(contract: ContractD) {
    this._type = contract.type;
    this._network = contract.network;
    this._address = contract.address;
    this._abi = contract.abi;
  }

  public get type() {
    return this._type;
  }
  public get network() {
    return this._network;
  }
  public get address() {
    return this._address;
  }
  public get abi() {
    return this._abi;
  }

  static fromABI = (network: Network, address: string, abi: string) =>
    new Contract({
      type: "ethereum",
      network,
      address,
      abi,
    });

  call = async (methodName: string, args: any[]): Promise<any> => {
    if (this._type === "ethereum") {
      if (!this._abi) {
        return undefined;
      }

      const provider = new ethers.providers.JsonRpcProvider(this._network.url);
      const ethersContract = new ethers.Contract(
        this._address,
        this._abi,
        provider
      );
      return await ethersContract[methodName](...args);
    }

    return undefined;
  };
}
