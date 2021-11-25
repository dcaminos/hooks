/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hook } from "lib/hook";
import { HookResponse } from "./response";

export const run = async (
  hook: Hook,
  walletAdress: string
): Promise<HookResponse | undefined> => {
  const HookResponse = require("lib/sdk/hooks/staking/response").HookResponse;
  const HookRequest = require("lib/sdk/hooks/staking/request").HookRequest;
  const EthereumContract = require("lib/sdk/contract").EthereumContract;
  const BigNumber = require("lib/sdk/big-number").BigNumber;

  try {
    const jsCode = await hook.compile();
    if (!jsCode) {
      return;
    }
    const hookNetworks = hook.getNetworks();
    const hookTokens = await hook.getTokens();
    const hookRequest = new HookRequest(
      walletAdress,
      hookNetworks[0],
      hookTokens
    );

    // eslint-disable-next-line no-eval
    const hookResponse = await eval(jsCode)(hookRequest);
    return hookResponse as HookResponse;
  } catch (e) {
    console.error(e);
  }
};
