/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hook } from "lib/hook";
import { StakingResponse } from "./staking-response";

export const run = async (
  hook: Hook,
  walletAdress: string
): Promise<StakingResponse | undefined> => {
  const StakingResponse =
    require("lib/sdk/hooks/staking/staking-response").StakingResponse;
  const StakingRequest =
    require("lib/sdk/hooks/staking/staking-request").StakingRequest;
  const EthereumContract = require("lib/sdk/contract").EthereumContract;
  const BigNumber = require("lib/sdk/big-number").BigNumber;
  const Token = require("lib/sdk/token").Token;

  try {
    const jsCode = await hook.compile();
    if (!jsCode) {
      return;
    }
    const hookNetworks = hook.getNetworks();
    const hookTokens = await hook.getTokens();
    const hookRequest = new StakingRequest(
      walletAdress,
      hookNetworks[0],
      hookTokens
    );

    // eslint-disable-next-line no-eval
    const response = await eval(jsCode)(hookRequest);
    return response as StakingResponse;
  } catch (e) {
    console.error(e);
  }
};

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
