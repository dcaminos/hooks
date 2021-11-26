import { Network } from "lib/sdk/network";
import { Token } from "lib/sdk/token";

export class StakingRequest {
  constructor(
    public walletAddress: string,
    public network: Network,
    public tokens: Token[]
  ) {}
}
