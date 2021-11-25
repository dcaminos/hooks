import { BigNumber } from "lib/sdk/big-number";
import { NetworkId } from "lib/sdk/network";

export class HookResponse {
  constructor(public balances: Map<NetworkId, BigNumber>) {}

  toString = () => {
    return "";
  };
}
