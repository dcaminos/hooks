import { computed, observable } from "mobx";
import { networks } from "../lib/config/networks";
import { tokens } from "../lib/config/tokens";
import { NetworkId } from "../lib/network";
import { Token } from "../lib/token";

export class TokenStore {
  @observable tokensPerNetwor: Map<NetworkId, Token[]>;

  constructor() {
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
  getTokensPerNetwork = (NetworkId: NetworkId) =>
    this.tokensPerNetwor.get(NetworkId) ?? [];
}
