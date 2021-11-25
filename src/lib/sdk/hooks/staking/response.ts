import { BigNumber } from "lib/sdk/big-number";
import { Token } from "lib/sdk/token";

export class HookResponse {
  constructor(
    public stakedToken: Token,
    public rewardToken: Token,
    public staked: BigNumber,
    public rewardPending: BigNumber,
    public rewardTaken?: BigNumber,
    public apr?: BigNumber
  ) {}

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
