import { Col, Row, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { useHistory, useParams } from "react-router-dom";
import SplitPane, { Pane } from "react-split-pane";
import { Hook } from "../../lib/hook";
import { EditorContext, HookContext } from "../../utils/contexts";
import "./editor-ide.scss";
import { IdeBody } from "./ide-body";
import { IdeBottomPanel } from "./ide-bottom-panel/ide-bottom-panel";
import { IdeLeftBar } from "./ide-left-bar";
import { IdeTopBar } from "./ide-top-bar";
export const EditorIDE: React.FC = () => {
  const { setCurrentHook, runTest, saveChanges } = useContext(EditorContext)!;
  const { fetchHook } = useContext(HookContext)!;
  const [loading, setLoading] = useState<boolean>(true);
  const { hookId } = useParams<{ hookId: string }>();
  const history = useHistory();

  // I had to do this because looks like @monaco-editor/react addCommand is not working: https://stackoverflow.com/questions/66041782/monaco-editor-react-addcommand-in-controllededitor
  document.addEventListener(
    "keydown",
    function (e) {
      if (
        e.keyCode === 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        saveChanges();
      }
    },
    false
  );

  const keyMap = {
    TEST_HOOK: ["ctrl+enter", "cmd+enter"],
  };
  const handlers = {
    TEST_HOOK: (e: any) => {
      if (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
      runTest();
    },
  };

  useEffect(() => {
    setLoading(true);
    if (!hookId) {
      history.push("/editor");
      return;
    }

    fetchHook(hookId).then((hook: Hook | undefined) => {
      if (!hook) {
        history.push("/editor");
        return;
      }
      setCurrentHook(hook);
      setLoading(false);
    });
  }, [fetchHook, setCurrentHook, history, hookId]);

  if (loading) {
    return (
      <Row justify="center">
        <Col>
          <Spin spinning={true} size="large" />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <IdeLeftBar />
      <IdeTopBar />
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
          minSize={100}
          maxSize={-40}
          defaultSize={
            localStorage.getItem("bottomPanelPos3")
              ? parseInt(localStorage.getItem("bottomPanelPos3") ?? "600", 10)
              : "80%"
          }
          onChange={(size) =>
            localStorage.setItem("bottomPanelPos", size.toString())
          }
        >
          <Pane className="">
            <IdeBody />
          </Pane>

          <Pane className="da-h-100">
            <IdeBottomPanel />
          </Pane>
        </SplitPane>
      </div>
    </>
  );
};
