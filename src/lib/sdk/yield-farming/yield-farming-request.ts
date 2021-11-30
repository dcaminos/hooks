import { Network } from "lib/sdk/network";
import { Token } from "lib/sdk/token";

export type YieldFarmingRequestD = {
  walletAddress: string;
  network: Network;
  stakedToken0: Token;
  stakedToken1: Token;
  rewardsToken: Token;
};

export class YieldFarmingRequest {
  private _walletAddress: string;
  private _network: Network;
  private _stakedToken0: Token;
  private _stakedToken1: Token;
  private _rewardsToken: Token;

  constructor(request: YieldFarmingRequestD) {
    this._walletAddress = request.walletAddress;
    this._network = request.network;
    this._stakedToken0 = request.stakedToken0;
    this._stakedToken1 = request.stakedToken1;
    this._rewardsToken = request.rewardsToken;
  }

  public get walletAddress() {
    return this._walletAddress;
  }

  public get network() {
    return this._network;
  }

  public get stakedToken0() {
    return this._stakedToken0;
  }

  public get stakedToken1() {
    return this._stakedToken1;
  }

  public get rewardsToken() {
    return this._rewardsToken;
  }
}
