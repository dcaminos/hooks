import { BigNumber } from "lib/sdk/big-number";
import { NetworkId } from "lib/sdk/network";
import { Token } from "../token";

export type TokenBalanceResponseD = {
  token: Token;
  balances: Map<NetworkId, BigNumber>;
};

export class TokenBalanceResponse {
  private _token: Token;
  private _balances: Map<NetworkId, BigNumber>;

  constructor(response: TokenBalanceResponseD) {
    this._token = response.token;
    this._balances = response.balances;
  }

  public get token() {
    return this._token;
  }

  public get balances() {
    return this._balances;
  }

  toString = () => {
    let text = this.token.toString() + `\n`;
    for (const [key, value] of Array.from(this._balances.entries())) {
      if (value !== undefined) {
        text += `${key}: ${(value as BigNumber).toReal()}\n`;
      }
    }

    return text;
  };
}
