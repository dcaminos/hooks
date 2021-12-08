import { ethers } from "ethers";
import { networks } from "lib/config/networks";
import { BigNumber } from "bignumber.js";
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
  private _id: string;
  private _symbol: string;
  private _name: string;
  private _image: string;
  private _contracts: {
    [key in NetworkId]?: string;
  };
  private _price?: BigNumber;

  constructor(token: TokenD) {
    this._id = token.id;
    this._symbol = token.symbol;
    this._name = token.name;
    this._image = token.image;
    this._contracts = token.contracts;
    this._price = token.price;
  }

  public get id() {
    return this._id;
  }
  public get symbol() {
    return this._symbol;
  }
  public get name() {
    return this._name;
  }
  public get image() {
    return this._image;
  }
  public get contracts() {
    return this._contracts;
  }
  public get price() {
    return this._price;
  }

  public set price(value: BigNumber | undefined) {
    this._price = value;
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
          const provider = new ethers.providers.JsonRpcProvider(network.url);
          if (
            network.tokenId === this.id &&
            this.contracts[networkId] === "network-currency"
          ) {
            const response = await provider.getBalance(walletAddress);
            return new BigNumber(ethers.utils.formatEther(response));
          }

          const fakeABI: string = `[{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`;

          const ethersContract = new ethers.Contract(
            tokenAddress,
            fakeABI,
            provider
          );
          const response = await ethersContract["balanceOf"](walletAddress);
          return new BigNumber(ethers.utils.formatEther(response));
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
      this.price?.toFormat(2) ?? "-.--"
    }]`;
  };
}
