/* eslint-disable import/no-webpack-loader-syntax */
import Editor, { Monaco } from "@monaco-editor/react";
import { observer } from "mobx-react-lite";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { useContext } from "react";
import { addHooksSDK } from "../../lib/sdk/sdk";
import { EditorContext, UIContext } from "../../components/router/contexts";

export const IdeBody: React.FC = observer((props) => {
  const { code, updateCode, runTest, setEditorErrors, currentHook } =
    useContext(EditorContext)!;
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

    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

    if (currentHook) {
      addHooksSDK(monaco, currentHook.type);
    }

    monaco.editor.registerCommand("save", () => {
      alert("SAVE pressed!");
    });
  };

  const onMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editor.focus();

    editor.addAction({
      id: "run-test",
      label: "Run this hook with a valid wallet address",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],

      contextMenuGroupId: "run",
      contextMenuOrder: 1.5,

      run: (ed: monaco.editor.ICodeEditor) => {
        runTest();
      },
    });
  };

  const handleEditorChange = (value: string | undefined, ev: any) => {
    if (value) {
      updateCode(value);
    }
  };

  const handleEditorValidate = (markers: monaco.editor.IMarker[]) => {
    const errors = markers
      .filter((m) => m.severity >= 8)
      .map((m) => ({
        code: typeof m.code === "object" ? m.code.value : m.code,
        line:
          m.startLineNumber !== m.endLineNumber
            ? `${m.startLineNumber} - ${m.endLineNumber}`
            : `${m.startLineNumber}`,
        message: m.message,
      }));
    setEditorErrors(errors);
  };

  return (
    <div style={{ marginLeft: 4, height: "100%" }}>
      <Editor
        defaultLanguage="typescript"
        theme={theme === "dark" ? "vs-dark" : "light"}
        defaultValue={code}
        beforeMount={beforeMount}
        onMount={onMount}
        onValidate={handleEditorValidate}
        onChange={handleEditorChange}
      />
    </div>
  );
});
