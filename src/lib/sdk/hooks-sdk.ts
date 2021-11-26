/* eslint-disable import/no-webpack-loader-syntax */

import { Monaco } from "@monaco-editor/react";
import { HookType } from "lib/hook";

const sdkCode = `
import { EthereumContract } from 'file:///contract'
import { HookRequest } from 'file:///hook-request'
import { HookResponse } from 'file:///hook-response'
import { Network, NetworkId } from 'file:///network'
import { Token } from 'file:///token'
import { BigNumber } from 'file:///big-number'

export { TokenBalanceRequest, TokenBalanceResponse, BigNumber, Network, NetworkId, Token, EthereumContract }
`;

export const addHooksSDK = (monaco: Monaco, hookType: HookType) => {
  const sdkURI = monaco.Uri.parse("hooks-sdk.ts");

  let hookRequestCode = "";
  let hookResponseCode = "";
  switch (hookType) {
    case "staking":
      hookRequestCode =
        require("!!raw-loader!./../../lib/sdk/hooks/staking/request").default;
      hookResponseCode =
        require("!!raw-loader!./../../lib/sdk/hooks/staking/response").default;
      break;
    case "token-balance":
      break;
    default:
      break;
  }

  if (monaco.editor.getModel(sdkURI) === null) {
    const libMap = [
      /*{
        lib: "contract",
        code: require("!!raw-loader!./../../lib/contract").default,
      },
      { lib: "hook", code: require("!!raw-loader!./../../lib/hook").default },*/
      {
        lib: "hook-request",
        code: hookRequestCode,
      },
      {
        lib: "hook-response",
        code: hookResponseCode,
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
