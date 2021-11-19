import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { Hook } from "../lib/hook";
import { RootStore } from "./root-store";

export type EditorError = {
  code: string | undefined;
  message: string;
};

export class EditorStore {
  currentHook: Hook | undefined = undefined;
  savingChanges: boolean = false;
  runningTest: boolean = false;
  code: string = "";
  errors: EditorError[] = [];
  testingAddress: string = "";

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.editorStore = this;
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

  @computed
  get shouldSave() {
    return this.currentHook ? this.code !== this.currentHook.code : false;
  }

  @action
  saveChanges = async () => {
    if (!this.rootStore.hookStore || !this.currentHook) {
      return;
    }

    if (this.currentHook.code === this.code) {
      return;
    }
    this.savingChanges = true;
    this.currentHook.code = this.code;
    await this.rootStore.hookStore.updateHook(this.currentHook);
    runInAction(() => {
      this.savingChanges = false;
    });
  };

  @action
  setTestingAddress = async (value: string) => {
    this.testingAddress = value;
  };

  @action
  runTest = async () => {
    console.log("RUN TEST");
  };

  @action
  setEditorErrors = async (errors: EditorError[]) => {
    this.errors = errors;
  };

  @action
  test = async (walletAddress: string) => {};
}
