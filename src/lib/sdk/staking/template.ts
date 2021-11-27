export const template = () => {
  return `import { StakingRequest, StakingResponse, BigNumber, EthereumContract, Token } from 'file:///hooks-sdk'

const contractAddress: string = ""
const contractABI: string = ""

async function runHook(request: StakingRequest): Promise<StakingResponse> {
    const contract = new EthereumContract(request.network, contractAddress, contractABI)
    // TODO: check the order of setted tokens
    const stakedToken: Token = request.tokens[0]
    const rewardToken: Token = request.tokens[1]

    const promises: any[] = [
        contract.call( "userInfo", [request.walletAddress]),
        contract.call( "pendingReward", [request.walletAddress]),
    ]
    const [ userInfo, pendingReward ] = await Promise.all(promises)    
    
    const response: StakingResponse = new StakingResponse({
        stakedToken: stakedToken,
        rewardToken: rewardToken,
        staked: BigNumber.from(userInfo[0]),
        rewardPending: BigNumber.from(pendingReward),
        rewardTaken: BigNumber.from(userInfo[1]),
    })

    return response;
}
`;
};
