export const template = (tokenId: string) => {
  return `import { TokenBalanceRequest, TokenBalanceResponse, BigNumber, Token, NetworkId } from 'file:///hooks-sdk'

  async function runHook(request: TokenBalanceRequest): Promise<TokenBalanceResponse> {
      const token: Token = request.token
      const balances: Map<NetworkId,BigNumber> = await token.balancesOf(request.walletAddress)
      return new TokenBalanceResponse({token, balances})
  }`;
};
