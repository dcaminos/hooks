import { contracts as extraContractList } from "lib/config/extra-config";
import { tokens as tokenList } from "lib/config/tokens";
import { NetworkId } from "lib/sdk/network";
import { Token, TokenD } from "lib/sdk/token";
import { computed, makeAutoObservable } from "mobx";
import { getTokensPrices } from "utils/utils";
import { RootStore } from "./root-store";

export class TokenStore {
  tokens: Token[];
  tokensPerNetwor: Map<NetworkId, Token[]>;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.tokenStore = this;
    this.tokens = this.getTokenList().map((t) => new Token(t));
    this.tokensPerNetwor = new Map<NetworkId, Token[]>();
    this.rootStore.networkStore?.networks.forEach((network) => {
      this.tokensPerNetwor.set(
        network.id,
        this.tokens.filter(
          (token) =>
            token.contracts[network.id] !== undefined ||
            token.id === network.tokenId
        )
      );
    });

    console.log(this.getToken("velas"));
  }

  getTokenList = (): TokenD[] => {
    extraContractList.forEach((partialToken) => {
      const index = tokenList.findIndex((t) => t.id === partialToken.id);
      if (index !== -1) {
        tokenList[index].contracts = {
          ...tokenList[index].contracts,
          ...partialToken.contracts,
        };
      }
    });

    return tokenList;
  };

  @computed
  getTokensPerNetwork = (networkId?: NetworkId) => {
    if (networkId !== undefined) {
      return this.tokensPerNetwor.get(networkId) ?? [];
    }

    const networkIds: string[] =
      this.rootStore.networkStore?.networks.map((n) => n.id) ?? [];
    return this.tokens.filter((t) =>
      Object.keys(t.contracts).some((c) => networkIds.includes(c))
    );
  };

  @computed
  getToken = (tokenId: string) => this.tokens.find((t) => t.id === tokenId);

  getTokensWithPrice = async (tokenIds: string[]) => {
    const prices = await getTokensPrices(tokenIds);
    return tokenIds
      .map((tid) => {
        const obj = this.tokens.find((t) => t.id === tid);
        if (!obj) {
          return null;
        }
        obj.price = prices[obj.id];
        return obj;
      })
      .filter((i) => i !== null) as Token[];
  };
}
