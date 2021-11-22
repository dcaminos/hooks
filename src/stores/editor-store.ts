import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { Hook } from "../lib/hook";
import { RootStore } from "./root-store";
import { Hook as AttachConsole, Unhook as DetachConsole } from "console-feed";

export type EditorError = {
  code: string | undefined;
  line: string;
  message: string;
};

export class EditorStore {
  currentHook: Hook | undefined = undefined;
  savingChanges: boolean = false;
  runningTest: boolean = false;
  code: string = "";
  errors: EditorError[] = [];
  logs: any[] = [];
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
    if (this.runningTest || this.errors.length > 0 || !this.currentHook) {
      return;
    }

    this.runningTest = true;
    this.logs = [];
    this.currentHook.code = this.code;

    const tempConsole = AttachConsole(
      window.console,
      (log) => {
        this.addEditorLog(log);
      },
      false
    );
    console.time("Hook running time");
    const response = await this.currentHook.run(this.testingAddress);
    console.timeEnd("Hook running time");

    if (response) {
      //const tokensInfo = await getTokensInfo(this.currentHook.tokenIds);
      //console.log("Hook reponse:");
      response.logResult();
    }
    DetachConsole(tempConsole);
    runInAction(() => {
      this.runningTest = false;
    });
  };

  @action
  setEditorErrors = async (errors: EditorError[]) => {
    this.errors = errors;
  };

  @action
  addEditorLog = (log: any) => {
    this.logs = [...this.logs, log];
  };
}
