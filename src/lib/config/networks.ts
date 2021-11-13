import { Network } from "../network";

export const networks: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    tokenId: "ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    hookTemplate: `import { EthereumContract } from 'file:///contract'
import { HookRequest } from 'file:///hook-request'
import { HookResponse } from 'file:///hook-response'
import { BigNumber } from 'file:///big-number'

const contractAddress: string = ""
const contractABI: string = ""
TOKENS_ADDRESSES

async function runIntegration(request: HookRequest): Promise<HookResponse> {
    const response: HookResponse = new HookResponse(request.networkId, request.walletAddress)
    const contract = new EthereumContract(request.getNetwork(), contractAddress, contractABI)
    const contractResponse = await contract.call( "userInfo", [request.walletAddress])
    
    response.pushStakingPosition({
        stakedAmount: BigNumber.from(0),
        stakedTokenAddress,
        rewardAmount: BigNumber.from(0),
        rewardTokenAddress,
    })
        
    return response;
}`,
  },
  {
    id: "binance-smart-chain",
    name: "Binance Smart Chain",
    url: "https://bsc-dataseed.binance.org",
    tokenId: "binancecoin",
    image: "https://assets.coingecko.com/coins/images/18711/large/Unknown.png",
    hookTemplate: `import { EthereumContract } from 'file:///contract'
import { HookRequest } from 'file:///hook-request'
import { HookResponse } from 'file:///hook-response'
import { BigNumber } from 'file:///big-number'

const contractAddress: string = ""
const contractABI: string = ""
TOKENS_ADDRESSES
  
async function runIntegration(request: HookRequest): Promise<HookResponse> {
    const response: HookResponse = new HookResponse(request.networkId, request.walletAddress)
    const contract = new EthereumContract(request.getNetwork(), contractAddress, contractABI)
    const contractResponse = await contract.call( "userInfo", [request.walletAddress])
    
    response.pushStakingPosition({
        stakedAmount: BigNumber.from(0),
        stakedTokenAddress,
        rewardAmount: BigNumber.from(0),
        rewardTokenAddress,
    })
        
    return response;
}`,
  },
  {
    id: "solana",
    name: "Solana",
    url: "https://api.mainnet-beta.solana.com",
    tokenId: "solana",
    image: "https://assets.coingecko.com/coins/images/4128/small/Solana.jpg",
    hookTemplate: "",
  },
  {
    id: "moonriver",
    name: "Moonriver",
    url: "https://rpc.moonriver.moonbeam.network",
    tokenId: "moonriver",
    image: "https://assets.coingecko.com/coins/images/17984/large/9285.png",
    hookTemplate: "",
  },
];
