/* eslint-disable @typescript-eslint/no-unused-vars */

import typescript from "typescript";
import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";
import { HookRequest } from "./sdk/hook-request";
import { HookResponse } from "./sdk/hook-response";
import { NetworkId } from "./network";
import { networks } from "./config/networks";
import { tokens } from "./config/tokens";
import { Network as SdkNetwork } from "./sdk/network";
import { Token as SdkToken } from "./sdk/token";
import { getTokensPrices } from "../utils/utils";
import { getTokenBalance } from "./token";

const compilerOptions: typescript.CompilerOptions = {
  target: typescript.ScriptTarget.ES2020,
  esModuleInterop: true,
};

export type HookVersion = {
  version: number;
  releaseDate: Date;
  ts: string;
  js: string;
  notes: string;
};

export type HookD = {
  id: string;
  owner: string;
  title: string;
  networkId: NetworkId;
  tokenIds: string[];
  isPublic: boolean;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  versions: HookVersion[];
};

export class Hook {
  constructor(
    public id: string,
    public owner: string,
    public title: string,
    public networkId: NetworkId,
    public tokenIds: string[],
    public isPublic: boolean,
    public code: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

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

  getSdkNetwork = (): SdkNetwork => {
    const network = networks.find((n) => n.id === this.networkId);
    if (!network) {
      throw new Error("Imposible to find network");
    }

    return {
      id: network.id,
      name: network.name,
      url: network.url,
    };
  };

  getSdkTokens = async (): Promise<SdkToken[]> => {
    const tokenPrices = await getTokensPrices(this.tokenIds);
    const network = networks.find((n) => n.id === this.networkId);

    if (!network) {
      throw new Error("Imposible to find network");
    }

    return this.tokenIds.map((tokenId) => {
      const token = tokens.find((n) => n.id === tokenId);
      const price = tokenPrices[tokenId];

      if (!token) {
        throw new Error("Imposible to find token");
      }

      if (!price) {
        throw new Error("Imposible to find token price");
      }

      const address = token.contracts[this.networkId];
      if (!address) {
        throw new Error("Imposible to find token address");
      }

      return {
        id: token.id,
        symbol: token.symbol,
        name: token.name,
        address: address,
        price: price,
        balanceOf: (address: string) =>
          getTokenBalance(token, network, address),
      };
    });
  };

  run = async (walletAddress: string): Promise<HookResponse | undefined> => {
    const HookResponse = require("./sdk/hook-response").HookResponse;
    const HookRequest = require("./sdk/hook-request").HookRequest;
    const EthereumContract = require("./sdk/contract").EthereumContract;
    const BigNumber = require("./sdk/big-number").BigNumber;

    try {
      const hookNetwork = networks.find((n) => n.id === this.networkId);
      const hookTokens = tokens.filter((t) => this.tokenIds.includes(t.id));
      const jsCode = await this.compile();
      if (!jsCode || !hookNetwork || hookTokens.length === 0) {
        return;
      }
      const sdkTokens = await this.getSdkTokens();
      const hookRequest: HookRequest = new HookRequest(
        walletAddress,
        this.getSdkNetwork(),
        sdkTokens
      );
      // eslint-disable-next-line no-eval
      const hookResponse = await eval(jsCode)(hookRequest);
      return hookResponse as HookResponse;
    } catch (e) {
      console.error(e);
    }
  };
}
