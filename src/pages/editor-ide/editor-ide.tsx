import { Col, Row, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { useHistory, useParams } from "react-router-dom";
import { Hook } from "../../lib/hook";
import { EditorContext, HookContext } from "../../utils/contexts";
import "./editor-ide.css";
import { IdeBody } from "./ide-body";
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
      <IdeBody />
    </>
  );
};

/*
 <Row gutter={[16,16]} wrap={false}>
        <Col flex="auto" >
          <EditorSandbox  />
        </Col>
        <Col flex="500px">
          <div  style={{ height: "calc(100vh - 128px)", marginBottom: "16px", display:"flex" , flexDirection: "column"}}>
          <MakePublicCard />
          <HookDetailsCard/>
          <RunTestCard/>
          </div>
          
        </Col>
      </Row>
*/
