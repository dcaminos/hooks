import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { UIContext, UserContext } from "../../components/router/contexts";
import { HookRequestCard } from "./hook-request-card/hook-request-card";
import { NetWorthCard } from "./net-worth-card/net-worth-card";
import { StakingCard } from "./staking-card/staking-card";
import { TokenBalancesCard } from "./token-balances-card/token-balance-card";
import { YieldFarmingCard } from "./yield-farming-card/yield-farming-card";

export const Dashboard: React.FC = observer((props) => {
  const { user } = useContext(UserContext)!;
  const { showModal } = useContext(UIContext)!;

  if (user && user.profiles.length === 0) {
    showModal("first-profile");
  }

  return (
    <>
      <Row gutter={[32, 0]}>
        <Col span={24}>
          <h3>Welcome back {user?.email} 👋</h3>

          <p className="da-p1-body da-mb-0">
            Your current status and analytics are here
          </p>
        </Col>

        <Col span={24} className="da-mt-32">
          <Row gutter={[32, 0]}>
            <Col flex="1" className="da-overflow-hidden">
              <Row gutter={[32, 32]}>
                <Col span={24}>
                  <NetWorthCard />
                </Col>

                <Col span={24}>
                  <StakingCard />
                </Col>

                <Col span={24}>
                  <YieldFarmingCard />
                </Col>
              </Row>
            </Col>

            <Col className="da-analytics-col-2">
              <TokenBalancesCard />

              <HookRequestCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
});
