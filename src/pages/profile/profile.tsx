import { Col, Row } from "antd";
import { HooksTab } from "./tabs/hooks";
import { WalletsTab } from "./tabs/wallets";

export const ProfilePage: React.FC = () => {
  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <h1>Profile</h1>
        <WalletsTab />
        <HooksTab />
      </Col>

    </Row>
  );
};
