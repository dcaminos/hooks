import { BigNumber } from "lib/sdk/big-number";
import { NetworkId } from "lib/sdk/network";

export class TokenBalanceResponse {
  constructor(public balances: Map<NetworkId, BigNumber>) {}

  toString = () => {
    let text = "";
    for (const [key, value] of Array.from(this.balances.entries())) {
      if (value !== undefined) {
        text += `${key}: ${(value as BigNumber).toReal()}/n`;
      }
    }

    return text;
  };
}
