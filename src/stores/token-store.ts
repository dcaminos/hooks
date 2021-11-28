import { tokens as tokenList } from "lib/config/tokens";
import { NetworkId } from "lib/sdk/network";
import { Token } from "lib/sdk/token";
import { computed, makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

export class TokenStore {
  tokens: Token[];
  tokensPerNetwor: Map<NetworkId, Token[]>;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.tokenStore = this;

    this.tokens = tokenList.map((t) => new Token(t));

    this.tokensPerNetwor = new Map<NetworkId, Token[]>();
    console.log(this.rootStore.networkStore?.networks);
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
  }

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
}
