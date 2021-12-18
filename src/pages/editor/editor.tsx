import { Col, Row } from "antd";
import { HooksCard } from "components/hooks-card/hooks-card";
import { UserContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const EditorPage: React.FC = observer(() => {
  const { userHooks } = useContext(UserContext)!;

  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <h3>Editor</h3>

        <p className="da-p1-body da-mb-0">Create your own Hooks</p>
      </Col>

      <Col span={24}>
        <HooksCard hooks={userHooks} page="editor" />
      </Col>
    </Row>
  );
});
