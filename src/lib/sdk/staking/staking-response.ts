import { BigNumber } from "lib/sdk/big-number";
import { Token } from "lib/sdk/token";

export type StakingResponseD = {
  stakedToken: Token;
  rewardsToken: Token;
  staked: BigNumber;
  rewardPending: BigNumber;
  rewardTaken?: BigNumber;
  apr?: BigNumber;
};

export class StakingResponse {
  private _stakedToken: Token;
  private _rewardsToken: Token;
  private _staked: BigNumber;
  private _rewardPending: BigNumber;
  private _rewardTaken?: BigNumber;
  private _apr?: BigNumber;

  constructor(stakingResponse: StakingResponseD) {
    this._stakedToken = stakingResponse.stakedToken;
    this._rewardsToken = stakingResponse.rewardsToken;
    this._staked = stakingResponse.staked;
    this._rewardPending = stakingResponse.rewardPending;
    this._rewardTaken = stakingResponse.rewardTaken;
    this._apr = stakingResponse.apr;
  }

  public get stakedToken() {
    return this._stakedToken;
  }

  public get rewardsToken() {
    return this._rewardsToken;
  }

  public get staked() {
    return this._staked;
  }

  public get rewardPending() {
    return this._rewardPending;
  }

  public get rewardTaken() {
    return this._rewardTaken;
  }

  public get apr() {
    return this._apr;
  }
  toString() {
    return JSON.stringify(
      {
        stakedToken: this._stakedToken.toString(),
        rewardToken: this._rewardsToken.toString(),
        staked: this._staked.toReal(),
        rewardPending: this._rewardPending.toReal(),
        rewardTaken: this._rewardTaken ? this._rewardTaken.toReal() : undefined,
        apr: this._apr ? this._apr.toReal(2) + "%" : undefined,
      },
      undefined,
      1
    );
  }
}
