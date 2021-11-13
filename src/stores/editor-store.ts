import { action, makeAutoObservable } from "mobx";
import { Hook } from "../lib/hook";

export class EditorStore {
  currentHook: Hook | undefined = undefined;
  savingChanges: boolean = false;
  code: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setCurrentHook = async (hook: Hook) => {
    this.currentHook = hook;
    this.code = hook.code ?? "";
  };

  @action
  updateCode = async (code: string) => {
    this.code = code;
  };

  @action
  saveChanges = async () => {
    console.log("PASO");
  };

  @action
  test = async (walletAddress: string) => {};
}
