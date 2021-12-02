import { Hook, TokenBalanceData } from "lib/hook";
import { UserWallet } from "lib/user";
import { Token } from "../token";
import { TokenBalanceRequest } from "./token-balance-request";
import { TokenBalanceResponse } from "./token-balance-response";

export type TokenBalanceResult = {
  hook: Hook;
  wallet: UserWallet;
  request: TokenBalanceRequest;
  response: TokenBalanceResponse | undefined;
};

export class TokenBalanceFactory {
  static fromDashboard = (
    hook: Hook,
    tokens: Token[],
    walletAddress: string
  ): TokenBalanceRequest => {
    const token = tokens.find(
      (t) => t.id === (hook.data as TokenBalanceData).tokenId
    );
    if (!token) {
      throw new Error(
        `No token ${(hook.data as TokenBalanceData).tokenId} found`
      );
    }

    return new TokenBalanceRequest({ walletAddress, token });
  };
}
