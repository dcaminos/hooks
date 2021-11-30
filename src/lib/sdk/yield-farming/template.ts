export const template = () => {
  return `import { YieldFarmingRequest, YieldFarmingResponse, Contract, BigNumber } from 'file:///hooks-sdk'

  const contractAddress: string = \`\`;
  const contractABI: string = \`\`;
  
  const poolId = 1;
  const poolAddress: string = \`\`;
  const poolABI: string = \`\`;
  
  async function runHook(request: YieldFarmingRequest): Promise<YieldFarmingResponse> {
    const contract = Contract.fromABI(request.network, contractAddress, contractABI)
    const pool = Contract.fromABI(request.network, poolAddress, poolABI)
  
    const promises: any[] = [
        contract.call( "userInfo", [poolId, request.walletAddress]),
        contract.call( "pendingReward", [poolId, request.walletAddress]),
        contract.call( "rewardPerBlock", []),
        contract.call( "poolInfo", [poolId]),
        contract.call( "totalAllocPoint", []),
        pool.call( "totalSupply", []),
        request.stakedToken0.balanceOf(request.network.id, poolAddress),
        request.stakedToken1.balanceOf(request.network.id, poolAddress),
    ]
  
    const [ userInfoResponse, pendingRewardsResponse, rewardsPerBlockResponse, poolInfoResponse, totalAllocPointResponse ,lpTotalSupplyResponse, token0PoolBalanceResponse , token1PoolBalanceResponse ] = await Promise.all(promises)
  
    const token0TVL = token0PoolBalanceResponse.times(request.stakedToken0.price)
    const token1TVL = token1PoolBalanceResponse.times(request.stakedToken1.price)
  
    const allocPoint: BigNumber = poolInfoResponse[1];
    const totalAllocPoint = totalAllocPointResponse[0]
  
    return new YieldFarmingResponse({
        network: request.network,
        stakedToken0: request.stakedToken0,
        stakedToken1: request.stakedToken1,
        rewardsToken: request.rewardsToken,
        staked: userInfoResponse[0],
        rewardPending: pendingRewardsResponse[0],
        rewardTaken: userInfoResponse[1],
        lpTotalSupply: lpTotalSupplyResponse[0],
        // Necessary to get APR
        liquidity: token0TVL.plus(token1TVL),
        rewardsPerBlock: rewardsPerBlockResponse[0],
        poolWeight: allocPoint.div(totalAllocPoint)
    })
  }`;
};
