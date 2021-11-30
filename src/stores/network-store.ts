import { Network, NetworkId } from "lib/sdk/network";
import { computed, makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { networks as networkList } from "lib/config/networks";

export class NetworkStore {
  networks: Network[];

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.networkStore = this;
    this.networks = networkList.map((n) => new Network(n));
  }

  @computed
  getNetwork = (networkId: NetworkId) =>
    this.networks.find((n) => n.id === networkId);
}
