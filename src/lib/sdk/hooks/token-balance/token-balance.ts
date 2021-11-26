/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hook } from "lib/hook";
import { NetworkId } from "lib/sdk/network";
import { TokenBalanceResponse } from "./token-balance-response";

export const run = async (
  hook: Hook,
  walletAdress: string
): Promise<TokenBalanceResponse | undefined> => {
  const TokenBalanceResponse =
    require("lib/sdk/hooks/token-balance/token-balance-response").TokenBalanceResponse;
  const TokenBalanceRequest =
    require("lib/sdk/hooks/token-balance/token-balance-request").TokenBalanceRequest;
  const EthereumContract = require("lib/sdk/contract").EthereumContract;
  const BigNumber = require("lib/sdk/big-number").BigNumber;
  const Token = require("lib/sdk/token").Token;

  try {
    const jsCode = await hook.compile();
    if (!jsCode) {
      return;
    }
    const hookTokens = await hook.getTokens();
    const hookRequest = new TokenBalanceRequest(walletAdress, hookTokens[0]);

    // eslint-disable-next-line no-eval
    const hookResponse = await eval(jsCode)(hookRequest);
    return hookResponse as TokenBalanceResponse;
  } catch (e) {
    console.error(e);
  }
};

export const template = (contracts: Map<NetworkId, string>) => {
  let contractsText = "";
  contracts.forEach((value, key) => {
    if (value.trim().length > 0) {
      contractsText += `            "${key}": "${value.trim()}",\n`;
    }
  });
  contractsText = contractsText.substring(0, contractsText.length - 1);
  return `import { TokenBalanceRequest, TokenBalanceResponse, BigNumber, Token, NetworkId } from 'file:///hooks-sdk'

async function runHook(request: TokenBalanceRequest): Promise<TokenBalanceResponse> {
    const token = new Token({
        id: "custom-token",
        symbol: "AAA",
        name: "Token Name",
        image: "http://image-url",
        contracts: {
${contractsText}
        },
    })

    const balances: Map<NetworkId,BigNumber> = await token.balancesOf(request.walletAdress)
    return new TokenBalanceResponse(balances)
}`;
};
