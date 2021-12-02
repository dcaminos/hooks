import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "@firebase/firestore";
import moment, { Moment } from "moment";
import { pick } from "utils/utils";
import { NetworkId } from "./sdk/network";
import { StakingResult } from "./sdk/staking/factory";
import { StakingRequest } from "./sdk/staking/staking-request";
import { StakingResponse } from "./sdk/staking/staking-response";
import { TokenBalanceResult } from "./sdk/token-balance/factory";
import { TokenBalanceRequest } from "./sdk/token-balance/token-balance-request";
import { TokenBalanceResponse } from "./sdk/token-balance/token-balance-response";
import { YieldFarmingResult } from "./sdk/yield-farming/factory";
import { YieldFarmingRequest } from "./sdk/yield-farming/yield-farming-request";
import { YieldFarmingResponse } from "./sdk/yield-farming/yield-farming-response";

export type HookType = "token-balance" | "staking" | "yield-farming";

export type HookRequest =
  | TokenBalanceRequest
  | StakingRequest
  | YieldFarmingRequest;
export type HookResponse =
  | TokenBalanceResponse
  | StakingResponse
  | YieldFarmingResponse;

export type HookResult =
  | TokenBalanceResult
  | StakingResult
  | YieldFarmingResult;

export type HookVersion = {
  active: boolean;
  version: number;
  releaseDate: Moment;
  ts: string;
  js: string;
  notes: string;
};

export type TokenBalanceData = {
  tokenId: string;
};

export type StakingData = {
  networkId: NetworkId;
  stakedTokenId: string;
  rewardsTokenId: string;
};

export type YieldFarmingData = {
  networkId: NetworkId;
  stakedTokenId0: string;
  stakedTokenId1: string;
  rewardsTokenId: string;
};

export type HookData = TokenBalanceData | StakingData | YieldFarmingData;

export type Hook = {
  id: string;
  type: HookType;
  owner: string;
  title: string;
  data: HookData;
  isPublic: boolean;
  code: string;
  createdAt: Moment;
  updatedAt: Moment;
  versions: HookVersion[];
};

export const hookConverter = {
  toFirestore(hook: Hook): DocumentData {
    const obj = pick(
      hook,
      "type",
      "owner",
      "title",
      "data",
      "isPublic",
      "code",
      "createdAt",
      "updatedAt",
      "versions"
    ) as any;
    obj.createdAt = (obj.createdAt as Moment).toDate();
    obj.updatedAt = (obj.updatedAt as Moment).toDate();
    if (obj.versions) {
      obj.versions = Array.from(obj.versions).map((v: any) => ({
        ...v,
        releaseDate: (v.releaseDate as Moment).toDate(),
      }));
    }
    Object.keys(obj).forEach(
      (key) => obj[key] === undefined && delete obj[key]
    );
    return obj;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Hook {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      type: data.type,
      owner: data.owner,
      title: data.title,
      data: data.data,
      isPublic: data.isPublic,
      code: data.code,
      createdAt: data.createdAt
        ? moment((data.createdAt as Timestamp).toDate())
        : moment(),
      updatedAt: data.updatedAt
        ? moment((data.updatedAt as Timestamp).toDate())
        : moment(),
      versions: Array.from(data.versions).map((v: any) => ({
        ...v,
        releaseDate: v.releaseDate
          ? moment((v.releaseDate as Timestamp).toDate())
          : moment(),
      })),
    } as Hook;
  },
};

/*
import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";

import { run as hookStakingRun } from "lib/sdk/hooks/staking/staking";
import { run as hookTokenBalanceRun } from "lib/sdk/hooks/token-balance/token-balance";

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
      const tokenD = tokens.find((n) => n.id === tokenId);
      const price = tokenPrices[tokenId];

      if (!tokenD) {
        throw new Error("Imposible to find token");
      }

      if (!price) {
        throw new Error("Imposible to find token price");
      }

      const token = new Token(tokenD);
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
*/
