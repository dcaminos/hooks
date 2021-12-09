import { Col, Row } from "antd";
import { HooksTab } from "./tabs/hooks";
import { WalletsTab } from "./tabs/wallets";

export const ProfilePage: React.FC = () => {
  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <h3>Profile</h3>
        <p className="da-p1-body da-mb-0">
          Here you can see your current wallets and hooks asociated.
        </p>
      </Col>
      <Col span={24}>
        <WalletsTab />
        <HooksTab />
      </Col>
    </Row>
  );
};
