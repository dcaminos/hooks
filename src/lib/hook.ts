import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";
import { networks } from "lib/config/networks";
import { tokens } from "lib/config/tokens";

import { run as hookStakingRun } from "lib/sdk/hooks/staking/run";
import { run as hookTokenBalanceRun } from "lib/sdk/hooks/token-balance/run";

import { Network, NetworkId } from "lib/sdk/network";
import { Token } from "lib/sdk/token";
import typescript from "typescript";
import { getTokensPrices } from "utils/utils";

const compilerOptions: typescript.CompilerOptions = {
  target: typescript.ScriptTarget.ES2020,
  esModuleInterop: true,
};

export type HookType = "token-balance" | "staking";

export type HookVersion = {
  version: number;
  releaseDate: Date;
  ts: string;
  js: string;
  notes: string;
};

export type HookD = {
  id: string;
  type: HookType;
  owner: string;
  title: string;
  networkIds: NetworkId[];
  tokenIds: string[];
  isPublic: boolean;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  versions: HookVersion[];
};

export class Hook {
  public id: string;
  public type: HookType;
  public owner: string;
  public title: string;
  public networkIds: NetworkId[];
  public tokenIds: string[];
  public isPublic: boolean;
  public code: string;
  public createdAt: Date;
  public updatedAt: Date;
  public versions: HookVersion[];

  constructor(hook: HookD) {
    this.id = hook.id;
    this.type = hook.type;
    this.owner = hook.owner;
    this.title = hook.title;
    this.networkIds = hook.networkIds;
    this.tokenIds = hook.tokenIds;
    this.isPublic = hook.isPublic;
    this.code = hook.code;
    this.createdAt = hook.createdAt;
    this.updatedAt = hook.updatedAt;
    this.versions = hook.versions;
  }

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

  getNetworks = (): Network[] => {
    return this.networkIds.map((networkId) => {
      const network = networks.find((n) => n.id === networkId);
      if (!network) {
        throw new Error("Imposible to find network");
      }

      return network;
    });
  };

  getTokens = async (): Promise<Token[]> => {
    const tokenPrices = await getTokensPrices(this.tokenIds);

    return this.tokenIds.map((tokenId) => {
      const token = tokens.find((n) => n.id === tokenId);
      const price = tokenPrices[tokenId];

      if (!token) {
        throw new Error("Imposible to find token");
      }

      if (!price) {
        throw new Error("Imposible to find token price");
      }

      token.price = price;
      return token;
    });
  };

  run = async (walletAdress: string) => {
    switch (this.type) {
      case "staking":
        return hookStakingRun(this, walletAdress);
      case "token-balance":
        return hookTokenBalanceRun(this, walletAdress);
      default:
        return undefined;
    }
  };
}
