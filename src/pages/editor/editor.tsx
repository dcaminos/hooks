import { Col, Row } from "antd";
import { CreateHook } from "../../components/create-hook/create-hook";
import { EditorSandbox } from "./editor-sandbox";

export const Editor: React.FC = () => {
  return (
    <Row gutter={[32, 0]}>
      <Col span={16}>
        <EditorSandbox />
      </Col>
      <Col span={8}>
        <CreateHook />
      </Col>
    </Row>
  );
};
