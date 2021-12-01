import { Hook, StakingData } from "lib/hook";
import { Network } from "../network";
import { Token } from "../token";
import { StakingRequest } from "./staking-request";

export class StakingFactory {
  static fromDashboard = (
    hook: Hook,
    networks: Network[],
    tokens: Token[],
    walletAddress: string
  ): StakingRequest => {
    const data = hook.data as StakingData;
    const network = networks.find((n) => n.id === data.networkId);
    const stakedToken = tokens.find((t) => t.id === data.stakedTokenId);
    const rewardsToken = tokens.find((t) => t.id === data.rewardsTokenId);

    if (!network) {
      throw new Error(`No network ${data.networkId} found`);
    }

    if (!stakedToken) {
      throw new Error(`No stakedToken ${data.stakedTokenId} found`);
    }

    if (!rewardsToken) {
      throw new Error(`No rewardsToken ${data.rewardsTokenId} found`);
    }

    return new StakingRequest({
      walletAddress,
      network,
      stakedToken,
      rewardsToken,
    });
  };
}
