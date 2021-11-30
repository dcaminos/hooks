import { BigNumber } from "bignumber.js";
import { Token } from "lib/sdk/token";
import { Network } from "../network";

export type StakingResponseD = {
  network: Network;
  stakedToken: Token;
  rewardsToken: Token;
  staked: BigNumber;
  rewardPending: BigNumber;
  rewardTaken?: BigNumber;
  rewardsPerBlock?: BigNumber;
  liquidity?: BigNumber;
};

export class StakingResponse {
  private _network: Network;
  private _stakedToken: Token;
  private _rewardsToken: Token;
  private _staked: BigNumber;
  private _rewardPending: BigNumber;
  private _rewardTaken?: BigNumber;
  private _rewardsPerBlock?: BigNumber;
  private _liquidity?: BigNumber;

  // Calculated values
  private _apr?: BigNumber;

  constructor(stakingResponse: StakingResponseD) {
    this._network = stakingResponse.network;
    this._stakedToken = stakingResponse.stakedToken;
    this._rewardsToken = stakingResponse.rewardsToken;
    this._staked = stakingResponse.staked;
    this._rewardPending = stakingResponse.rewardPending;
    this._rewardTaken = stakingResponse.rewardTaken;
    this._rewardsPerBlock = stakingResponse.rewardsPerBlock;
    this._liquidity = stakingResponse.liquidity;
    this.calculateAPR();
  }

  public get network() {
    return this._network;
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

  public get rewardsPerBlock() {
    return this._rewardsPerBlock;
  }

  public get liquidity() {
    return this._liquidity;
  }

  public get apr() {
    return this._apr;
  }

  calculateAPR = () => {
    if (
      !this.stakedToken.price ||
      !this.rewardsToken.price ||
      !this._rewardsPerBlock ||
      !this._liquidity
    ) {
      return;
    }
    const blocksPerYear = new BigNumber(
      (60 / this.network.blockTime) * 60 * 24 * 365
    ); // 10512000
    const totalRewardPricePerYear = this.rewardsToken.price
      .times(this._rewardsPerBlock)
      .times(blocksPerYear);
    const totalStakingTokenInPool = this.stakedToken.price.times(
      this._liquidity
    );
    this._apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  };

  toString() {
    return JSON.stringify(
      {
        stakedToken: this._stakedToken.toString(),
        rewardToken: this._rewardsToken.toString(),
        staked: this._staked.toFormat(),
        rewardPending: this._rewardPending.toFormat(),
        rewardTaken: this._rewardTaken
          ? this._rewardTaken.toFormat()
          : undefined,
        rewardsPerBlock: this._rewardsPerBlock
          ? this._rewardsPerBlock.toFormat()
          : undefined,
        liquidity: this._liquidity ? this._liquidity.toFormat() : undefined,
        apr: this._apr ? this._apr.toFormat(2) + "%" : undefined,
      },
      undefined,
      1
    );
  }
}
