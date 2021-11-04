import React from "react";

import { Row, Col } from "antd";

import { UpgradePlanCardOneBg } from "../../widgets/upgrade-pan-card-one-bg";
import OrderColumnCardVertical from "../../widgets/order-column-card-vertical";
import ActiveUserCardVertical from "../../widgets/active-user-card-vertical";
import SubsColumnCardVertical from "../../widgets/subs-column-card-vertical";
import CustomerSupportCardVertical from "../../widgets/customer-support-card-vertical";
import { DownloadCard } from "../../widgets/download-card";
import EarningsCard from "../../widgets/earnings-card";
import BestTeamCard from "../../widgets/best-team-card";
import ExpensesCard from "../../widgets/expenses-card";
import AnalyticsProjectTableCard from "../../widgets/analytics-project-table-card";
import AnalyticsRevenueRadarCard from "../../widgets/analytics-revenue-radar-card";
import AnalyticsVisitersLineCard from "../../widgets/analytics-visiters-line-card";

export default function Dashboard() {
  return (
    <Row gutter={[32, 0]}>
      <Col span={24}>
        <h3>Welcome back, Edward 👋</h3>

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
}
