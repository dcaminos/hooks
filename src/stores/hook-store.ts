import { action, makeAutoObservable } from "mobx";
import { NetworkId } from "../lib/network";

export class HookStore {
  constructor() {
    makeAutoObservable(this);
  }

  @action
  createNewHook = async (
    title: string,
    networkId: NetworkId,
    tokenIds: string[]
  ) => {
    console.log("PASO");
  };
}
