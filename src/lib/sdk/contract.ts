import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";
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

  call = async (methodName: string, args: any[]): Promise<any[]> => {
    switch (this._type) {
      case "ethereum":
        return this.callEthereum(methodName, args);
      default:
        return [];
    }
  };

  private callEthereum = async (
    methodName: string,
    args: any[]
  ): Promise<any[]> => {
    if (!this._abi) {
      throw new Error("No ABE available");
    }

    const provider = new ethers.providers.JsonRpcProvider(this._network.url);
    const ethersContract = new ethers.Contract(
      this._address,
      this._abi,
      provider
    );

    const response = await ethersContract[methodName](...args);

    let array = [];
    if (
      ethersContract.interface.getFunction(methodName).outputs?.length === 1
    ) {
      array = Array.from([response]);
    } else {
      array = Array.from(response);
    }

    const outputs = ethersContract.interface.getFunction(methodName).outputs;
    return array.map((value, index) => {
      if (outputs && outputs[index]) {
        if (outputs[index].type === "uint256") {
          return new BigNumber(ethers.utils.formatEther(value));
        }
      }
      return value;
    });
  };
}
