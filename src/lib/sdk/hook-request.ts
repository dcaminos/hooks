import { Network } from "./network";
import { Token } from "./token";

export class HookRequest {
  constructor(
    public walletAddress: string,
    public network: Network,
    public tokens: Token[]
  ) {}
}
