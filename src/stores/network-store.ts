import { Network } from "lib/sdk/network";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { networks as networkList } from "lib/config/networks";

export class NetworkStore {
  networks: Network[];

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.networkStore = this;
    this.networks = networkList.map((n) => new Network(n));
  }
}
