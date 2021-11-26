/* eslint-disable import/no-webpack-loader-syntax */

import { Monaco } from "@monaco-editor/react";
import { HookType } from "lib/hook";

const sdkCode = `
import { EthereumContract } from 'file:///contract'
import { TokenBalanceRequest } from 'file:///token-balance-request'
import { TokenBalanceResponse } from 'file:///token-balance-response'
import { StakingRequest } from 'file:///staking-request'
import { StakingResponse } from 'file:///staking-response'
import { Network, NetworkId } from 'file:///network'
import { Token } from 'file:///token'
import { BigNumber } from 'file:///big-number'

export { TokenBalanceRequest, TokenBalanceResponse, StakingRequest, StakingResponse, BigNumber, Network, NetworkId, Token, EthereumContract }
`;

export const addHooksSDK = (monaco: Monaco, hookType: HookType) => {
  const sdkURI = monaco.Uri.parse("hooks-sdk.ts");

  if (monaco.editor.getModel(sdkURI) === null) {
    const libMap = [
      {
        lib: "staking-request",
        code: require("!!raw-loader!./../../lib/sdk/hooks/staking/staking-request")
          .default,
      },
      {
        lib: "staking-response",
        code: require("!!raw-loader!./../../lib/sdk/hooks/staking/staking-response")
          .default,
      },
      {
        lib: "token-balance-request",
        code: require("!!raw-loader!./../../lib/sdk/hooks/token-balance/token-balance-request")
          .default,
      },
      {
        lib: "token-balance-response",
        code: require("!!raw-loader!./../../lib/sdk/hooks/token-balance/token-balance-response")
          .default,
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
        lib: "contract",
        code: require("!!raw-loader!./../../lib/sdk/contract").default,
      },
      //{ lib: "token", code: require("!!raw-loader!./../../lib/token").default },
      //{ lib: "user", code: require("!!raw-loader!./../../lib/user").default },
      {
        lib: "big-number",
        code: require("!!raw-loader!./../../lib/sdk/big-number").default,
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
