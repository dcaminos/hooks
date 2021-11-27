import { Network } from "lib/sdk/network";
import { Token } from "lib/sdk/token";

export type StakingRequestD = {
  walletAddress: string;
  network: Network;
  stakedToken: Token;
  rewardsToken: Token;
};

export class StakingRequest {
  private _walletAddress: string;
  private _network: Network;
  private _stakedToken: Token;
  private _rewardsToken: Token;

  constructor(request: StakingRequestD) {
    this._walletAddress = request.walletAddress;
    this._network = request.network;
    this._stakedToken = request.stakedToken;
    this._rewardsToken = request.rewardsToken;
  }

  public get walletAddress() {
    return this._walletAddress;
  }

  public get network() {
    return this._network;
  }

  public get stakedToken() {
    return this._stakedToken;
  }

  public get rewardsToken() {
    return this._rewardsToken;
  }
}
