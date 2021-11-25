import { ethers } from "ethers";
import { networks } from "lib/config/networks";
import { BigNumber } from "lib/sdk/big-number";
import { NetworkId } from "lib/sdk/network";

export type TokensPrice = {
  [key: string]: BigNumber;
};

export class Token {
  constructor(
    public id: string,
    public symbol: string,
    public name: string,
    public image: string,
    public contracts: {
      [key in NetworkId]?: string;
    },
    public price?: BigNumber
  ) {}

  balanceOf = async (
    networkId: NetworkId,
    walletAddress: string
  ): Promise<BigNumber | undefined> => {
    const tokenAddress = this.contracts[networkId];
    const network = networks.find((n) => n.id === networkId);
    if (!tokenAddress || !network) {
      return undefined;
    }

    switch (networkId) {
      case "solana":
        return undefined;

      default: {
        //ethereum
        const fakeABI: string = `[{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`;
        const provider = new ethers.providers.JsonRpcProvider(network.url);
        const ethersContract = new ethers.Contract(
          tokenAddress,
          fakeABI,
          provider
        );
        const response = await ethersContract["balanceOf"](walletAddress);
        return BigNumber.from(response);
      }
    }
  };

  toString = () => {
    return `${this.name} (${this.symbol.toUpperCase()}) [${
      this.price?.toReal() ?? "-.--"
    }]`;
  };
}
