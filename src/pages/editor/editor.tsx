import { Col, Row } from "antd";
import { EditorSandbox } from "./editor-sandbox";

export const Editor: React.FC = () => {
  return (
    <Row gutter={[32, 0]}>
      <Col span={24}>
        <EditorSandbox />
      </Col>
    </Row>
  );
};
