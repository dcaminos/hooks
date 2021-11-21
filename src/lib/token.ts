import { ethers } from "ethers";
import { Network, NetworkId } from "./network";
import { BigNumber } from "./sdk/big-number";

export type Token = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  contracts: {
    [key in NetworkId]?: string;
  };
};

export type TokensPrice = {
  [key: string]: BigNumber;
};

export const getTokenBalance = async (
  token: Token,
  network: Network,
  address: string
): Promise<BigNumber | undefined> => {
  const tokenAddress = token.contracts[network.id];

  if (!tokenAddress) {
    return undefined;
  }

  switch (network.id) {
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
      const response = await ethersContract["balanceOf"](address);
      return BigNumber.from(response);
    }
  }
};
