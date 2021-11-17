import SplitPane, { Pane } from "react-split-pane";
import "./editor-ide.css";
import { EditorSandbox } from "./editor-sandbox";
import { IdeBottomPanel } from "./ide-bottom-panel";

export const IdeBody: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        left: 60,
        width: "calc(100vw - 60px)",
        height: "calc(100vh - 60px)",
      }}
    >
      <SplitPane
        split="horizontal"
        minSize={50}
        defaultSize={parseInt(localStorage.getItem("splitPos") ?? "800", 10)}
        onChange={(size) => localStorage.setItem("splitPos", size.toString())}
      >
        <Pane>
          <EditorSandbox />
        </Pane>

        <Pane>
          <IdeBottomPanel />
        </Pane>
      </SplitPane>
    </div>
  );
};
