import { computed, makeAutoObservable } from "mobx";
import { networks } from "../lib/config/networks";
import { tokens } from "../lib/config/tokens";
import { NetworkId } from "../lib/network";
import { Token } from "../lib/token";
import { RootStore } from "./root-store";

export class TokenStore {
  tokensPerNetwor: Map<NetworkId, Token[]>;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.tokenStore = this;

    this.tokensPerNetwor = new Map<NetworkId, Token[]>();
    networks.forEach((network) => {
      this.tokensPerNetwor.set(
        network.id,
        tokens.filter(
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

    const networkIds: string[] = networks.map((n) => n.id);
    return tokens.filter((t) =>
      Object.keys(t.contracts).some((c) => networkIds.includes(c))
    );
  };
}
