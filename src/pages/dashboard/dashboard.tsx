import React from "react";

import { Row, Col } from "antd";

import { UpgradePlanCardOneBg } from "../../examples/upgrade-pan-card-one-bg";
import OrderColumnCardVertical from "../../examples/order-column-card-vertical";
import ActiveUserCardVertical from "../../examples/active-user-card-vertical";
import SubsColumnCardVertical from "../../examples/subs-column-card-vertical";
import CustomerSupportCardVertical from "../../examples/customer-support-card-vertical";
import { DownloadCard } from "../../examples/download-card";
import EarningsCard from "../../examples/earnings-card";
import BestTeamCard from "../../examples/best-team-card";
import ExpensesCard from "../../examples/expenses-card";
import AnalyticsProjectTableCard from "../../examples/analytics-project-table-card";
import AnalyticsRevenueRadarCard from "../../examples/analytics-revenue-radar-card";
import AnalyticsVisitersLineCard from "../../examples/analytics-visiters-line-card";
import { useContext } from "react";
import { UserContext } from "../..";
import { observer } from "mobx-react-lite";

export const Dashboard: React.FC = observer( (props) => {
  
  const userStore = useContext(UserContext);
  const userEmail = userStore.user?.email;

  return (
    <Row gutter={[32, 0]}>
      <Col span={24}>
        <h3>Welcome back {userEmail} 👋</h3>

        <p className="da-p1-body da-mb-0">
          Your current status and analytics are here
        </p>
      </Col>

      <Col span={24} className="da-mt-32">
        <Row gutter={[32, 0]}>
          <Col flex="1" className="da-overflow-hidden">
            <Row gutter={[32, 32]}>
              <Col span={24}>
                <UpgradePlanCardOneBg />
              </Col>

              <Col span={24}>
                <AnalyticsVisitersLineCard />
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
            <ExpensesCard />

            <DownloadCard />

            <AnalyticsRevenueRadarCard />
          </Col>
        </Row>
      </Col>
    </Row>
  );
})