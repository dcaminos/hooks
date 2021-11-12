/* eslint-disable @typescript-eslint/no-unused-vars */

import typescript from "typescript";
import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";
import { HookRequest } from "./hook-request";
import { HookResponse } from "./hook-response";
import { NetworkId } from "./network";

const compilerOptions: typescript.CompilerOptions = {
  target: typescript.ScriptTarget.ES2020,
  esModuleInterop: true,
};

export class Hook {
  constructor(
    public id: string,
    public owner: string,
    public title: string,
    public networkId: NetworkId,
    public tokenIds: string[],
    public isPublic: boolean,
    public ts: string,
    public js: string
  ) {}

  compile = async () => {
    const fsMap = await createDefaultMapFromCDN(
      compilerOptions,
      typescript.version,
      true,
      typescript
    );
    fsMap.set("index.ts", this.ts);

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
      this.js =
        _jsCode
          .split(";")
          .filter((t) => t.replace("\n", "").substr(0, 7) !== "import ")
          .join(";") + `\n runIntegration`;
    }
  };

  run = async (walletAddress: string): Promise<HookResponse | undefined> => {
    const HookResponse = require("./hook-response").HookResponse;
    const HookRequest = require("./hook-request").HookRequest;
    const EthereumContract = require("./contract").EthereumContract;
    const BigNumber = require("./big-number").BigNumber;

    try {
      const hookRequest: HookRequest = new HookRequest(
        this.networkId,
        walletAddress
      );
      // eslint-disable-next-line no-eval
      const hookResponse = await eval(this.js)(hookRequest);
      return hookResponse as HookResponse;
    } catch (e) {
      console.error(e);
    }
  };
}
