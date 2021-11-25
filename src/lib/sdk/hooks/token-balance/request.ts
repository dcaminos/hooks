import { Token } from "lib/sdk/token";

export class HookRequest {
  constructor(public walletAdress: string, public token: Token) {}
}
