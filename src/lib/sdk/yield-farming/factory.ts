import { Hook, YieldFarmingData } from "lib/hook";
import { Network } from "../network";
import { Token } from "../token";
import { YieldFarmingRequest } from "./yield-farming-request";

export class YieldFarmingFactory {
  static fromDashboard = (
    hook: Hook,
    networks: Network[],
    tokens: Token[],
    walletAddress: string
  ): YieldFarmingRequest => {
    const data = hook.data as YieldFarmingData;
    const network = networks.find((n) => n.id === data.networkId);
    const stakedToken0 = tokens.find((t) => t.id === data.stakedTokenId0);
    const stakedToken1 = tokens.find((t) => t.id === data.stakedTokenId1);
    const rewardsToken = tokens.find((t) => t.id === data.rewardsTokenId);

    if (!network) {
      throw new Error(`No network ${data.networkId} found`);
    }

    if (!stakedToken0) {
      throw new Error(`No stakedToken ${data.stakedTokenId0} found`);
    }

    if (!stakedToken1) {
      throw new Error(`No stakedToken ${data.stakedTokenId1} found`);
    }

    if (!rewardsToken) {
      throw new Error(`No rewardsToken ${data.rewardsTokenId} found`);
    }

    return new YieldFarmingRequest({
      walletAddress,
      network,
      stakedToken0,
      stakedToken1,
      rewardsToken,
    });
  };
}
