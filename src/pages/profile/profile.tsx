import { Col, Row } from "antd";
import { HookContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { HooksCard } from "../../components/hooks-card/hooks-card";
import { WalletsCard } from "./wallets-card";

export const ProfilePage: React.FC = observer(() => {
  const { hooks } = useContext(HookContext)!;

  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <h3>Profile</h3>

        <p className="da-p1-body da-mb-0">Setup wallets and enable hooks</p>
      </Col>
      <Col span={24}>
        <WalletsCard />
      </Col>
      <Col span={24}>
        <HooksCard hooks={hooks} page="profile" />
      </Col>
    </Row>
  );
});
