import { ethers } from "ethers";
import { networks } from "lib/config/networks";
import { BigNumber } from "lib/sdk/big-number";
import { NetworkId } from "lib/sdk/network";

export type TokensPrice = {
  [key: string]: BigNumber;
};

export type TokenD = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  contracts: {
    [key in NetworkId]?: string;
  };
  price?: BigNumber;
};

export class Token {
  public id: string;
  public symbol: string;
  public name: string;
  public image: string;
  public contracts: {
    [key in NetworkId]?: string;
  };
  public price?: BigNumber;

  constructor(token: TokenD) {
    this.id = token.id;
    this.symbol = token.symbol;
    this.name = token.name;
    this.image = token.image;
    this.contracts = token.contracts;
    this.price = token.price;
  }

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
        try {
          const fakeABI: string = `[{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`;
          const provider = new ethers.providers.JsonRpcProvider(network.url);
          const ethersContract = new ethers.Contract(
            tokenAddress,
            fakeABI,
            provider
          );
          const response = await ethersContract["balanceOf"](walletAddress);
          return BigNumber.from(response);
        } catch (error) {
          return undefined;
        }
      }
    }
  };

  balancesOf = async (
    walletAddress: string
  ): Promise<Map<NetworkId, BigNumber | undefined>> => {
    const balances = new Map<NetworkId, BigNumber | undefined>();
    const promises = Object.keys(this.contracts).map((networkId) =>
      this.balanceOf(networkId as NetworkId, walletAddress).then((balance) => ({
        networkId,
        balance,
      }))
    );
    const results = await Promise.all(promises);
    results.forEach(({ networkId, balance }) =>
      balances.set(networkId as NetworkId, balance)
    );
    return balances;
  };

  toString = () => {
    return `${this.name} (${this.symbol.toUpperCase()}) [${
      this.price?.toReal() ?? "-.--"
    }]`;
  };
}
