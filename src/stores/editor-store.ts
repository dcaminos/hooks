import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";
import { Hook as AttachConsole, Unhook as DetachConsole } from "console-feed";
import { Hook } from "lib/hook";
import { run } from "lib/sdk/sdk";
import { action, computed, makeAutoObservable, runInAction } from "mobx";
import moment from "moment";
import typescript from "typescript";
import { RootStore } from "./root-store";

const compilerOptions: typescript.CompilerOptions = {
  target: typescript.ScriptTarget.ES2020,
  esModuleInterop: true,
};

export type EditorError = {
  code: string | undefined;
  line: string;
  message: string;
};

export class EditorStore {
  currentHook: Hook | undefined = undefined;
  code: string = "";
  testingAddress: string = "";
  errors: EditorError[] = [];
  logs: any[] = [];
  action: "saving" | "testing" | "publishing" | undefined;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.editorStore = this;
  }

  @action
  setCurrentHook = (hook: Hook) => {
    this.currentHook = hook;
    this.code = hook.code ?? "";
  };

  @action
  updateCode = (code: string) => {
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
    this.action = "saving";
    this.currentHook.code = this.code;
    await this.rootStore.hookStore.updateHook(this.currentHook);
    runInAction(() => {
      this.action = undefined;
    });
  };

  @action
  setTestingAddress = async (value: string) => {
    this.testingAddress = value;
  };

  @action
  runTest = async () => {
    if (
      this.action !== undefined ||
      this.errors.length > 0 ||
      !this.currentHook
    ) {
      return;
    }

    this.action = "testing";
    this.logs = [];
    this.currentHook.code = this.code;

    const tempConsole = AttachConsole(
      window.console,
      (log) => {
        this.addEditorLog(log);
      },
      false
    );

    const request = await this.rootStore.hookStore?.getHookRequest(
      this.currentHook,
      this.testingAddress
    );

    const jsCode = await this.compile();
    console.log(jsCode);
    if (!jsCode || !request) {
      return;
    }

    console.time("Hook running time");
    const response = await run(jsCode, request);
    console.timeEnd("Hook running time");
    console.log(response);
    if (response) {
      //const tokensInfo = await getTokensInfo(this.currentHook.tokenIds);
      //console.log("Hook reponse:");
      console.log(response.toString());
    }
    DetachConsole(tempConsole);
    runInAction(() => {
      this.action = undefined;
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

  @action
  publish = async () => {
    if (
      this.action !== undefined ||
      this.errors.length > 0 ||
      !this.currentHook ||
      !this.rootStore.userStore?.user
    ) {
      return;
    }
    const user = { ...this.rootStore.userStore.user };
    const currentHook = { ...this.currentHook };

    this.action = "publishing";
    this.currentHook.code = this.code;
    const jsCode = await this.compile();
    if (!jsCode) {
      return;
    }

    user.profiles[0].hookIds.push(this.currentHook.id);
    currentHook.isPublic = true;
    currentHook.versions = [
      {
        active: true,
        version: 1,
        releaseDate: moment(),
        ts: this.currentHook.code,
        js: jsCode,
        notes: "First deploy",
      },
    ];

    await Promise.all([
      this.rootStore.userStore.updateUser(user),
      this.rootStore.hookStore?.updateHook(currentHook),
    ]);

    runInAction(() => {
      this.rootStore.userStore?.setUser(user);
      this.currentHook = currentHook;
      this.action = undefined;
    });
  };

  @action
  compile = async (): Promise<string | undefined> => {
    const fsMap = await createDefaultMapFromCDN(
      compilerOptions,
      typescript.version,
      true,
      typescript
    );
    fsMap.set("index.ts", this.code);

    const system = createSystem(fsMap);
    const host = createVirtualCompilerHost(system, compilerOptions, typescript);
    const program = typescript.createProgram({
      rootNames: Array.from(fsMap.keys()),
      options: compilerOptions,
      host: host.compilerHost,
    });

    program.emit();

    const _jsCode = fsMap.get("index.js");
    if (_jsCode !== undefined) {
      // remove imports
      return (
        _jsCode
          .split(";")
          .filter((t) => t.replace("\n", "").substr(0, 7) !== "import ")
          .join(";") + `\n runHook`
      );
    }
  };
}
