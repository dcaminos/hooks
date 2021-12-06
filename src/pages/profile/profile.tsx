import { Col, Row } from "antd";
import { HooksCard } from "./hooks-card";
import { WalletsCard } from "./wallets-card";

export const ProfilePage: React.FC = () => {
  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <h1>Profile</h1>
        <WalletsCard />
      </Col>
      <Col span={24}>
        <HooksCard />
      </Col>
    </Row>
  );
};
