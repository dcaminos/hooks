export const template = () => {
  return `import { StakingRequest, StakingResponse, Contract } from 'file:///hooks-sdk'

  const contractAddress: string = \`\`;
  const contractABI: string = \`\`;
  
  async function runHook(request: StakingRequest): Promise<StakingResponse> {
      const contract = Contract.fromABI(request.network, contractAddress, contractABI)
      const promises: any[] = [
          contract.call( "userInfo", [request.walletAddress]),
          contract.call( "pendingReward", [request.walletAddress]),
          contract.call( "rewardPerBlock", []),
          request.stakedToken.balanceOf(request.network.id, contractAddress),
      ]
      const [ userInfoResponse, pendingRewardResponse, rewardPerBlockResponse, totalStakedInPool ] = await Promise.all(promises)    
      
      return new StakingResponse({
          network: request.network,
          stakedToken: request.stakedToken,
          rewardsToken: request.rewardsToken,
          staked: userInfoResponse[0],
          rewardPending: pendingRewardResponse[0],
          rewardTaken: userInfoResponse[1],
          rewardsPerBlock: rewardPerBlockResponse[0],
          liquidity: totalStakedInPool
      })
  }`;
};
