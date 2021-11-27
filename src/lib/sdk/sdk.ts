/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { request } from "http";
import { Hook } from "lib/hook";
import { StakingRequest } from "lib/sdk/staking/staking-request";
import { StakingResponse } from "lib/sdk/staking/staking-response";
import { TokenBalanceRequest } from "lib/sdk/token-balance/token-balance-request";
import { TokenBalanceResponse } from "lib/sdk/token-balance/token-balance-response";
import { Monaco } from "@monaco-editor/react";
import { HookType } from "lib/hook";

const sdkCode = `
import { BigNumber } from 'file:///big-number'
import { Contract, ContractType } from 'file:///contract'
import { Network, NetworkId } from 'file:///network'
import { Token } from 'file:///token'
import { Wallet, WalletType } from 'file:///wallet'

import { TokenBalanceRequest } from 'file:///token-balance-request'
import { TokenBalanceResponse } from 'file:///token-balance-response'
import { StakingRequest } from 'file:///staking-request'
import { StakingResponse } from 'file:///staking-response'
import { YieldFarmingRequest } from 'file:///yield-farming-request'
import { YieldFarmingResponse } from 'file:///yield-farming-response'

export { 
  BigNumber,
  Contract, ContractType,
  Network, NetworkId,
  Token,
  Wallet, WalletType,
  TokenBalanceRequest,
  TokenBalanceResponse, 
  StakingRequest, 
  StakingResponse,
  YieldFarmingRequest, 
  YieldFarmingResponse,
}`;

export const addHooksSDK = (monaco: Monaco, hookType: HookType) => {
  const sdkURI = monaco.Uri.parse("hooks-sdk.ts");

  if (monaco.editor.getModel(sdkURI) === null) {
    const libMap = [
      {
        lib: "big-number",
        code: require("!!raw-loader!./../../lib/sdk/big-number").default,
      },
      {
        lib: "contract",
        code: require("!!raw-loader!./../../lib/sdk/contract").default,
      },
      {
        lib: "network",
        code: require("!!raw-loader!./../../lib/sdk/network").default,
      },
      {
        lib: "token",
        code: require("!!raw-loader!./../../lib/sdk/token").default,
      },
      {
        lib: "wallet",
        code: require("!!raw-loader!./../../lib/sdk/wallet").default,
      },
      {
        lib: "token-balance-request",
        code: require("!!raw-loader!./../../lib/sdk/token-balance/token-balance-request")
          .default,
      },
      {
        lib: "token-balance-response",
        code: require("!!raw-loader!./../../lib/sdk/token-balance/token-balance-response")
          .default,
      },
      {
        lib: "staking-request",
        code: require("!!raw-loader!./../../lib/sdk/staking/staking-request")
          .default,
      },
      {
        lib: "staking-response",
        code: require("!!raw-loader!./../../lib/sdk/staking/staking-response")
          .default,
      },
      {
        lib: "yield-farming-request",
        code: require("!!raw-loader!./../../lib/sdk/yield-farming/yield-farming-request")
          .default,
      },
      {
        lib: "yield-farming-response",
        code: require("!!raw-loader!./../../lib/sdk/yield-farming/yield-farming-response")
          .default,
      },
    ];

    libMap.forEach(({ lib, code }) => {
      monaco.editor.createModel(
        code,
        "typescript",
        monaco.Uri.parse(`file:///${lib}.ts`)
      );
    });

    monaco.editor.createModel(sdkCode, "typescript", sdkURI);
  }
};

export type HookRquest = TokenBalanceRequest | StakingRequest;
export type HookResponse = TokenBalanceResponse | StakingResponse;

export const run = async (
  jsCode: string,
  request: HookRquest
): Promise<HookResponse | undefined> => {
  const BigNumber = require("lib/sdk/big-number").BigNumber;
  const Contract = require("lib/sdk/contract").Contract;
  const ContractType = require("lib/sdk/contract").ContractType;
  const Network = require("lib/sdk/network").Network;
  const NetworkId = require("lib/sdk/network").NetworkId;
  const Token = require("lib/sdk/token").Token;
  const Wallet = require("lib/sdk/wallet").Wallet;
  const WalletType = require("lib/sdk/wallet").WalletType;
  const TokenBalanceRequest =
    require("lib/sdk/token-balance/token-balance-request").TokenBalanceRequest;
  const TokenBalanceResponse =
    require("lib/sdk/token-balance/token-balance-response").TokenBalanceResponse;
  const StakingRequest =
    require("lib/sdk/staking/staking-request").StakingRequest;
  const StakingResponse =
    require("lib/sdk/staking/staking-response").StakingResponse;
  const YieldFarmingRequest =
    require("lib/sdk/yield-farming/yield-farming-request").YieldFarmingRequest;
  const YieldFarmingResponse =
    require("lib/sdk/yield-farming/yield-farming-response").YieldFarmingResponse;

  try {
    // eslint-disable-next-line no-eval
    const response = await eval(jsCode)(request);
    return response as TokenBalanceResponse;
  } catch (e) {
    console.error(e);
  }
};
