import { AxiosRequestConfig } from "axios";
import BN from "bn.js";
import { ethers } from "ethers";
import { GenericNetwork, NetworkInterface } from "../network";

export class EthereumNetwork
  extends GenericNetwork
  implements NetworkInterface
{
  getBalance: (address: string) => Promise<BN | undefined> = async (
    address: string
  ) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(this.url);
      return await new BN((await provider.getBalance(address)).toString());
    } catch (error) {
      //console.error(error)
    }
  };

  getTokenBalance: (
    walletAddress: string,
    tokenAddress: string
  ) => Promise<BN | undefined> = async (
    walletAddress: string,
    tokenAddress: string
  ) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(this.url);
      const genericTokenAbi = [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      const ethersContract = new ethers.Contract(
        tokenAddress,
        genericTokenAbi,
        provider
      );
      return new BN((await ethersContract.balanceOf(walletAddress)).toString());
    } catch (e) {
      //console.error(e)
    }
  };

  getRequestConfig: (method: string, params: any[]) => AxiosRequestConfig = (
    method: string,
    params: any[]
  ) => {
    const data = JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
    });

    return {
      method: "POST",
      url: this.url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
  };
}
