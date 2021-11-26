import { Token } from "lib/sdk/token";

export class TokenBalanceRequest {
  constructor(public walletAdress: string, public token: Token) {}
}
