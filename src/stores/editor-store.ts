import { action, makeAutoObservable } from "mobx";
import { Hook } from "../lib/hook";

export class EditorStore {
  currentHook: Hook | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setCurrentHook = async (hook: Hook) => {
    this.currentHook = hook;
  };

  @action
  updateCode = async (tsCode: string) => {
    console.log(tsCode);
  };

  @action
  test = async (walletAddress: string) => {};
}
