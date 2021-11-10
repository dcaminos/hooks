/* eslint-disable import/no-webpack-loader-syntax */
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import React, { useContext } from "react";
import { Card } from "antd";
import { observer } from "mobx-react-lite";
import { EditorContext } from "../..";

const contractCode = require("!!raw-loader!./../../lib/contract").default;
const hookCode = require("!!raw-loader!./../../lib/hook").default;
const HookRequestCode =
  require("!!raw-loader!./../../lib/hook-request").default;
const HookResponseCode =
  require("!!raw-loader!./../../lib/hook-response").default;
const netowrkCode = require("!!raw-loader!./../../lib/network").default;
const tokenCode = require("!!raw-loader!./../../lib/token").default;
const userCode = require("!!raw-loader!./../../lib/user").default;
const walletCode = require("!!raw-loader!./../../lib/wallet").default;
const bigNumberCode = require("!!raw-loader!./../../lib/big-number").default;

export const EditorSandbox: React.FC = observer((props) => {
  const { updateCode } = useContext(EditorContext);

  const initialCode = `
import { EthereumContract } from 'file:///contract'
import { HookRequest } from 'file:///hook-request'
import { HookResponse } from 'file:///hook-response'
import { BigNumber } from 'file:///big-number'

const contractAddress: string = "0x6f660C58723922c6f866a058199FF4881019B4B5"
const contractABI: string = \`[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"poolLimitPerUser","type":"uint256"}],"name":"NewPoolLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"NewRewardPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"NewStartAndEndBlocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"RewardsStop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SMART_CHEF_FACTORY","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyRewardWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hasUserLimit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"_stakedToken","type":"address"},{"internalType":"contract IBEP20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"},{"internalType":"address","name":"_admin","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLimitPerUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasUserLimit","type":"bool"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"}],"name":"updatePoolLimitPerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"}],"name":"updateStartAndEndBlocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]\`
const stakedToken: string = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
const rewardToken: string = "0xbe1a001fe942f96eea22ba08783140b9dcc09d28"

async function runIntegration(request: HookRequest): Promise<HookResponse> {
    const response: HookResponse = new HookResponse(request.networkId, request.walletAddress)
    const contract = new EthereumContract(request.getNetwork(), contractAddress, contractABI)
    const contractResponse = await contract.call( "userInfo", [request.walletAddress])
    
    response.pushStakingPosition({
        stakedAmount: BigNumber.from(contractResponse[0].toString()),
        stakedToken,
        rewardAmount: BigNumber.from(contractResponse[1].toString()),
        rewardToken
    })
        
    return response;
}
  `;

  const beforeMount = (monaco: Monaco) => {
    // validation settings
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    });

    // extra libraries
    monaco.editor.createModel(
      contractCode,
      "typescript",
      monaco.Uri.parse("file:///contract.ts")
    );
    monaco.editor.createModel(
      hookCode,
      "typescript",
      monaco.Uri.parse("file:///hook.ts")
    );
    monaco.editor.createModel(
      HookRequestCode,
      "typescript",
      monaco.Uri.parse("file:///hook-request.ts")
    );
    monaco.editor.createModel(
      HookResponseCode,
      "typescript",
      monaco.Uri.parse("file:///hook-response.ts")
    );
    monaco.editor.createModel(
      netowrkCode,
      "typescript",
      monaco.Uri.parse("file:///network.ts")
    );
    monaco.editor.createModel(
      tokenCode,
      "typescript",
      monaco.Uri.parse("file:///token.ts")
    );
    monaco.editor.createModel(
      userCode,
      "typescript",
      monaco.Uri.parse("file:///user.ts")
    );
    monaco.editor.createModel(
      walletCode,
      "typescript",
      monaco.Uri.parse("file:///wallet.ts")
    );
    monaco.editor.createModel(
      bigNumberCode,
      "typescript",
      monaco.Uri.parse("file:///big-number.ts")
    );
  };

  const onMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined, ev: any) => {
    if (value) {
      updateCode(value);
    }
  };

  return (
    <Card
      className="da-border-color-black-40 da-overflow-hidden da-mb-32 p-0"
      style={{ height: "calc(100% - 32px)" }}
    >
      {/** This is the div which monaco is added into - careful, lots of changes happen here at runtime **/}
      <Editor
        defaultLanguage="typescript"
        theme="vs-dark"
        defaultValue={initialCode}
        height="80vh"
        beforeMount={beforeMount}
        onMount={onMount}
        onChange={handleEditorChange}
      />
    </Card>
  );
});
