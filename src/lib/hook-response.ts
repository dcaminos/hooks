import { NetworkId } from "./network";
import bn from "bn.js";

export type StakingPosition = {
  stakedAmount: bn;
  stakedToken: string;
  rewardAmount: bn;
  rewardToken: string;
};

export class HookResponse {
  private stakingPositions: StakingPosition[];

  constructor(public networkId: NetworkId, public walletAddress: string) {
    this.stakingPositions = [];
  }

  pushStakingPosition = (value: StakingPosition) =>
    this.stakingPositions.push(value);
  getStakingPositions = () => this.stakingPositions;
}
