import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { UIContext, UserContext } from "../../components/router/contexts";
import ActiveUserCardVertical from "../../examples/active-user-card-vertical";
import AnalyticsProjectTableCard from "../../examples/analytics-project-table-card";
import AnalyticsRevenueRadarCard from "../../examples/analytics-revenue-radar-card";
import BestTeamCard from "../../examples/best-team-card";
import CustomerSupportCardVertical from "../../examples/customer-support-card-vertical";
import { DownloadCard } from "../../examples/download-card";
import EarningsCard from "../../examples/earnings-card";
import OrderColumnCardVertical from "../../examples/order-column-card-vertical";
import SubsColumnCardVertical from "../../examples/subs-column-card-vertical";
import { CreateHookCard } from "./create-hook-card/create-hook-card";
import { StakingCard } from "./staking-card/staking-card";
import { TokenBalancesCard } from "./token-balances-card/token-balances-card";
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
                  <CreateHookCard />
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

                <Col span={24}>
                  <BestTeamCard />
                </Col>

                <Col span={24}>
                  <EarningsCard />
                </Col>

                <Col span={24}>
                  <AnalyticsProjectTableCard />
                </Col>
              </Row>
            </Col>

            <Col className="da-analytics-col-2">
              <TokenBalancesCard />

              <DownloadCard />

              <AnalyticsRevenueRadarCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
});
