import { Col, Row, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { EditorContext, HookContext } from "../../contexts";
import { Hook } from "../../lib/hook";
import { EditorSandbox } from "./editor-sandbox";
import { HookInfo } from "./hook-info";
import { PublishHook } from "./publish-hook";
import { HotKeys } from "react-hotkeys";

export const EditorIDE: React.FC = () => {
  const { setCurrentHook, saveChanges } = useContext(EditorContext)!;
  const { fetchHook } = useContext(HookContext)!;
  const [loading, setLoading] = useState<boolean>(true);
  const { hookId } = useParams<{ hookId: string }>();
  const history = useHistory();

  const handlers = {
    SAVE_HOOK: saveChanges,
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
    <HotKeys handlers={handlers}>
      <Row gutter={[32, 0]}>
        <Col span={16}>
          <EditorSandbox />
        </Col>
        <Col span={8}>
          <Row>
            <PublishHook />
          </Row>
          <Row>
            <HookInfo />
          </Row>
        </Col>
      </Row>
    </HotKeys>
  );
};
