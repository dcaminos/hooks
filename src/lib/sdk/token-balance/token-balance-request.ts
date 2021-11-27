import { Token } from "lib/sdk/token";

export type TokenBalanceRequestD = {
  walletAddress: string;
  token: Token;
};

export class TokenBalanceRequest {
  private _walletAddress: string;
  private _token: Token;

  constructor(request: TokenBalanceRequestD) {
    this._walletAddress = request.walletAddress;
    this._token = request.token;
  }

  public get walletAddress() {
    return this._walletAddress;
  }
  public get token() {
    return this._token;
  }
}
