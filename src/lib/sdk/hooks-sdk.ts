/* eslint-disable import/no-webpack-loader-syntax */

import { Monaco } from "@monaco-editor/react";

const sdkCode = `
import { EthereumContract } from 'file:///contract'
import { HookRequest } from 'file:///hook-request'
import { HookResponse } from 'file:///hook-response'
import { BigNumber } from 'file:///big-number'
import { EthereumContract } from 'file:///contract'

export { HookRequest, HookResponse, BigNumber, EthereumContract }
`;

export const addHooksSDK = (monaco: Monaco) => {
  const sdkURI = monaco.Uri.parse("hooks-sdk.ts");
  if (monaco.editor.getModel(sdkURI) === null) {
    const libMap = [
      {
        lib: "contract",
        code: require("!!raw-loader!./../../lib/contract").default,
      },
      { lib: "hook", code: require("!!raw-loader!./../../lib/hook").default },
      {
        lib: "hook-request",
        code: require("!!raw-loader!./../../lib/hook-request").default,
      },
      {
        lib: "hook-response",
        code: require("!!raw-loader!./../../lib/hook-response").default,
      },
      {
        lib: "network",
        code: require("!!raw-loader!./../../lib/network").default,
      },
      { lib: "token", code: require("!!raw-loader!./../../lib/token").default },
      { lib: "user", code: require("!!raw-loader!./../../lib/user").default },
      {
        lib: "big-number",
        code: require("!!raw-loader!./../../lib/big-number").default,
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
