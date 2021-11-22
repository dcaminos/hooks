import { BigNumber } from "./big-number";
import { Token } from "./token";

export type StakingResult = {
  stakedToken: Token;
  rewardToken: Token;
  staked: BigNumber;
  rewardPending: BigNumber;
  rewardTaken?: BigNumber;
  apr?: BigNumber;
};

export class HookResponse {
  private stakingPositions: StakingResult[];

  constructor() {
    this.stakingPositions = [];
  }

  pushStakingPosition = (value: StakingResult) =>
    this.stakingPositions.push(value);
  getStakingPositions = () => this.stakingPositions;

  logResult = () => {
    if (this.stakingPositions.length > 0) {
      console.log(
        this.stakingPositions
          .map((sp) =>
            JSON.stringify(
              {
                stakedToken: this.logToken(sp.stakedToken),
                rewardToken: this.logToken(sp.rewardToken),
                staked: sp.staked.toReal(),
                rewardPending: sp.rewardPending.toReal(),
                rewardTaken: sp.rewardTaken
                  ? sp.rewardTaken.toReal()
                  : undefined,
                apr: sp.apr ? sp.apr.toReal(2) + "%" : undefined,
              },
              undefined,
              1
            )
          )
          .join("\n")
      );
    }
  };

  logToken = (token: Token): string => {
    return `${
      token.name
    } (${token.symbol.toUpperCase()}) [${token.price.toReal()}]`;
  };
}
