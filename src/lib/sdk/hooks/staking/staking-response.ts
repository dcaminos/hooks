import { BigNumber } from "lib/sdk/big-number";
import { Token } from "lib/sdk/token";

export type StakingResponseD = {
  stakedToken: Token;
  rewardToken: Token;
  staked: BigNumber;
  rewardPending: BigNumber;
  rewardTaken?: BigNumber;
  apr?: BigNumber;
};

export class StakingResponse {
  public stakedToken: Token;
  public rewardToken: Token;
  public staked: BigNumber;
  public rewardPending: BigNumber;
  public rewardTaken?: BigNumber;
  public apr?: BigNumber;

  constructor(stakingResponse: StakingResponseD) {
    this.stakedToken = stakingResponse.stakedToken;
    this.rewardToken = stakingResponse.rewardToken;
    this.staked = stakingResponse.staked;
    this.rewardPending = stakingResponse.rewardPending;
    this.rewardTaken = stakingResponse.rewardTaken;
    this.apr = stakingResponse.apr;
  }

  toString() {
    return JSON.stringify(
      {
        stakedToken: this.stakedToken.toString(),
        rewardToken: this.rewardToken.toString(),
        staked: this.staked.toReal(),
        rewardPending: this.rewardPending.toReal(),
        rewardTaken: this.rewardTaken ? this.rewardTaken.toReal() : undefined,
        apr: this.apr ? this.apr.toReal(2) + "%" : undefined,
      },
      undefined,
      1
    );
  }
}
