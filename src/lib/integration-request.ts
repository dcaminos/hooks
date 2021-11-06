import { networks } from "./config/networks";
import { NetworkId, Network } from "./network";

export class IntegrationRequest {
  private network: Network | undefined;
  constructor(public networkId: NetworkId, public walletAddress: string) {
    this.network = networks.find((n) => n.id === this.networkId);
  }

  getNetwork = () => this.network;
}
