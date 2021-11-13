/* eslint-disable import/no-webpack-loader-syntax */
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import React, { useContext } from "react";
import { Card } from "antd";
import { observer } from "mobx-react-lite";
import { EditorContext, UIContext } from "../../utils/contexts";

const contractCode = require("!!raw-loader!./../../lib/contract").default;
const hookCode = require("!!raw-loader!./../../lib/hook").default;
const HookRequestCode =
  require("!!raw-loader!./../../lib/hook-request").default;
const HookResponseCode =
  require("!!raw-loader!./../../lib/hook-response").default;
const netowrkCode = require("!!raw-loader!./../../lib/network").default;
const tokenCode = require("!!raw-loader!./../../lib/token").default;
const userCode = require("!!raw-loader!./../../lib/user").default;
const bigNumberCode = require("!!raw-loader!./../../lib/big-number").default;

export const EditorSandbox: React.FC = observer((props) => {
  const { code, updateCode } = useContext(EditorContext)!;
  const { theme } = useContext(UIContext)!;

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
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      alert("SAVE pressed!");
    });
    editor.addCommand(monaco.KeyCode.KeyA, () => {
      alert("SAVE pressed! ");
    });
  };

  const handleEditorChange = (value: string | undefined, ev: any) => {
    if (value) {
      updateCode(value);
    }
  };

  return (
    <Card
      className="da-border-color-black-40 da-overflow-hidden da-mb-32 p-0"
      bodyStyle={{ padding: "20px 0px 0px 0px" }}
      style={{ height: "calc(100% - 32px)" }}
    >
      {/** This is the div which monaco is added into - careful, lots of changes happen here at runtime **/}
      <Editor
        defaultLanguage="typescript"
        theme={theme === "dark" ? "vs-dark" : "light"}
        defaultValue={code}
        height="80vh"
        beforeMount={beforeMount}
        onMount={onMount}
        onChange={handleEditorChange}
      />
    </Card>
  );
});
