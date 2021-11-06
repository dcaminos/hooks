import axios, { AxiosRequestConfig } from "axios";
import BN from "bn.js";
import { GenericNetwork, NetworkInterface } from "../network";

export class SolanaNetwork extends GenericNetwork implements NetworkInterface {
  getRequestConfig: (method: string, params: any[]) => AxiosRequestConfig = (
    method: string,
    params: any[]
  ) => {
    const data = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: method,
      params: params,
    });

    return {
      method: "POST",
      url: "https://solana-api.projectserum.com",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
  };

  getBalance: (walletAddress: string) => Promise<BN | undefined> = async (
    walletAddress: string
  ) => {
    try {
      const requestConfig = this.getRequestConfig("getBalance", [
        `${walletAddress}`,
      ]);
      const result = await axios(requestConfig);
      return new BN((result.data as any).result.value).mul(new BN(10 ** 9));
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
      let requestConfig = this.getRequestConfig("getTokenAccountsByOwner", [
        `${walletAddress}`,
        {
          mint: tokenAddress,
        },
        {
          encoding: "jsonParsed",
        },
      ]);
      let response = await axios(requestConfig);
      const result = (response.data as any).result;

      if (!result || !result.value[0] || !result.value[0].pubkey) {
        throw new Error("no result");
      }

      requestConfig = this.getRequestConfig("getTokenAccountBalance", [
        `${result.value[0].pubkey}`,
      ]);
      response = await axios(requestConfig);
      const value = (response.data as any).result.value;
      return new BN(value.amount).mul(new BN(10 ** (18 - value.decimals)));
    } catch (error) {
      //console.error(error)
    }
  };
}
