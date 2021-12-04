import { BigNumber } from "bignumber.js";
import { Token } from "lib/sdk/token";
import { Network } from "../network";

export type YieldFarmingResponseD = {
  network: Network;
  stakedToken0: Token;
  stakedToken1: Token;
  rewardsToken: Token;
  staked: BigNumber;
  rewardPending: BigNumber;
  rewardTaken?: BigNumber;
  rewardsPerBlock?: BigNumber;
  lpTotalSupply?: BigNumber;
  liquidity?: BigNumber;
  poolWeight?: BigNumber;
};

export class YieldFarmingResponse {
  private _network: Network;
  private _stakedToken0: Token;
  private _stakedToken1: Token;
  private _rewardsToken: Token;
  private _staked: BigNumber;
  private _rewardPending: BigNumber;
  private _rewardTaken?: BigNumber;
  private _rewardsPerBlock?: BigNumber;
  private _lpTotalSupply?: BigNumber;
  private _liquidity?: BigNumber;
  private _poolWeight?: BigNumber;

  // Calculated values
  private _apr?: BigNumber;
  private _lpValue?: BigNumber;

  constructor(stakingResponse: YieldFarmingResponseD) {
    this._network = stakingResponse.network;
    this._stakedToken0 = stakingResponse.stakedToken0;
    this._stakedToken1 = stakingResponse.stakedToken1;
    this._rewardsToken = stakingResponse.rewardsToken;
    this._staked = stakingResponse.staked;
    this._rewardPending = stakingResponse.rewardPending;
    this._rewardTaken = stakingResponse.rewardTaken;
    this._rewardsPerBlock = stakingResponse.rewardsPerBlock;
    this._lpTotalSupply = stakingResponse.lpTotalSupply;
    this._liquidity = stakingResponse.liquidity;
    this._poolWeight = stakingResponse.poolWeight;
    this.calculateAPR();
    this.calculateLpValue();
  }

  public get network() {
    return this._network;
  }

  public get stakedToken0() {
    return this._stakedToken0;
  }

  public get stakedToken1() {
    return this._stakedToken1;
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

  public get lpTotalSupply() {
    return this._lpTotalSupply;
  }

  public get poolWeight() {
    return this._poolWeight;
  }

  public get liquidity() {
    return this._liquidity;
  }

  public get apr() {
    return this._apr;
  }

  public get lpValue() {
    return this._lpValue;
  }

  calculateAPR = () => {
    if (
      this.poolWeight &&
      this.rewardsPerBlock &&
      this.rewardsToken.price &&
      this.liquidity
    ) {
      const blocksPerYear = (60 / this.network.blockTime) * 60 * 24 * 365; // 10512000
      const yearlyCakeRewardAllocation = this.poolWeight.times(
        this.rewardsPerBlock.times(new BigNumber(blocksPerYear))
      );
      this._apr = yearlyCakeRewardAllocation
        .times(this.rewardsToken.price)
        .div(this.liquidity)
        .times(new BigNumber(100));
    }
  };

  calculateLpValue = () => {
    if (this._lpTotalSupply && this._liquidity) {
      this._lpValue = this._liquidity.div(this._lpTotalSupply);
    }
  };

  toString() {
    return JSON.stringify(
      {
        network: this._network.name,
        stakedToken0: this._stakedToken0.toString(),
        stakedToken1: this._stakedToken1.toString(),
        rewardToken: this._rewardsToken.toString(),
        staked: this._staked.toFormat(),
        rewardPending: this._rewardPending.toFormat(),
        rewardTaken: this._rewardTaken
          ? this._rewardTaken.toFormat()
          : undefined,
        rewardsPerBlock: this._rewardsPerBlock
          ? this._rewardsPerBlock.toFormat()
          : undefined,
        lpTotalSupply: this.lpTotalSupply
          ? this.lpTotalSupply.toFormat()
          : undefined,
        poolWeight: this._poolWeight ? this._poolWeight.toFormat() : undefined,
        liquidity: this._liquidity ? this._liquidity.toFormat() : undefined,
        apr: this._apr ? this._apr.toFormat() : undefined,
      },
      undefined,
      1
    );
  }
}
