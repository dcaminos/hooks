import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { UIContext, UserContext } from "../../components/router/contexts";
import ActiveUserCardVertical from "../../examples/active-user-card-vertical";
import CustomerSupportCardVertical from "../../examples/customer-support-card-vertical";
import { DownloadCard } from "../../examples/download-card";
import OrderColumnCardVertical from "../../examples/order-column-card-vertical";
import SubsColumnCardVertical from "../../examples/subs-column-card-vertical";
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

                <Col md={6} span={12} className="da-overflow-hidden">
                  <OrderColumnCardVertical />
                </Col>

                <Col md={6} span={12} className="da-overflow-hidden">
                  <ActiveUserCardVertical />
                </Col>

                <Col md={6} span={12} className="da-overflow-hidden">
                  <SubsColumnCardVertical />
                </Col>

                <Col md={6} span={12} className="da-overflow-hidden">
                  <CustomerSupportCardVertical />
                </Col>
              </Row>
            </Col>

            <Col className="da-analytics-col-2">
              <TokenBalancesCard />

              <DownloadCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
});
