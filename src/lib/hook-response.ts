import { ethers } from "ethers";
import { BigNumber } from "./big-number";
import { tokens } from "./config/tokens";
import { NetworkId } from "./network";
import { TokenInfo, TokensInfo } from "./token";

export type StakingResult = {
  stakedAmount: BigNumber;
  stakedToken: string;
  rewardAmount: BigNumber;
  rewardToken: string;
};

export class HookResponse {
  private stakingPositions: StakingResult[];

  constructor(public networkId: NetworkId, public walletAddress: string) {
    this.stakingPositions = [];
  }

  pushStakingPosition = (value: StakingResult) =>
    this.stakingPositions.push(value);
  getStakingPositions = () => this.stakingPositions;

  logResult = (tokensInfo: TokensInfo) => {
    if (this.stakingPositions.length > 0) {
      this.logStakingResults(this.stakingPositions, tokensInfo);
    }
  };

  logStakingResults = (results: StakingResult[], tokensInfo: TokensInfo) => {
    const stakingData = results.map((staking) => {
      const stakedToken = tokens.find(
        (t) => t.contracts[this.networkId] === staking.stakedToken
      );
      const rewardToken = tokens.find(
        (t) => t.contracts[this.networkId] === staking.rewardToken
      );
      if (!stakedToken || !rewardToken) {
        return null;
      }

      const stakedTokenInfo: TokenInfo | undefined = tokensInfo[stakedToken.id];
      const rewardTokenInfo: TokenInfo | undefined = tokensInfo[rewardToken.id];

      if (!stakedTokenInfo || !rewardTokenInfo) {
        return null;
      }

      const stakedBalanceUSD = staking.stakedAmount.mul(stakedTokenInfo.price);
      const rewardBalanceUSD = staking.rewardAmount.mul(rewardTokenInfo.price);
      return {
        Staked: `${ethers.utils.formatEther(
          staking.stakedAmount
        )} ${stakedToken.symbol.toUpperCase()} ($ ${ethers.utils.formatEther(
          stakedBalanceUSD
        )})`,
        Reward: `${ethers.utils.formatEther(
          staking.rewardAmount
        )} ${rewardToken.symbol.toUpperCase()} ($ ${ethers.utils.formatEther(
          rewardBalanceUSD
        )})`,
        Total: `$ ${ethers.utils
          .formatEther(stakedBalanceUSD.add(rewardBalanceUSD))
          .padStart(10)}`,
      };
    });
    console.table(stakingData);
  };
}
