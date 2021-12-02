import { Card, Col, Dropdown, Menu, Row } from "antd";
import { DashboardContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RiMoreFill } from "react-icons/ri";
import { YieldFarmingItem } from "./yield-farming-item";

export const YieldFarmingCard: React.FC = observer((props) => {
  const { yieldFarmingResults } = useContext(DashboardContext)!;

  const menu = (
    <Menu>
      <Menu.Item>Last 28 Days</Menu.Item>
      <Menu.Item>Last Month</Menu.Item>
      <Menu.Item>Last Year</Menu.Item>
    </Menu>
  );

  return (
    <Card className="da-border-color-black-40 da-mb-32 ">
      <Row>
        <Col span={24}>
          <Row justify="space-between" align="top">
            <Col>
              <h5 className="da-mb-32">Yield Farming</h5>
            </Col>

            <Col>
              <Dropdown overlay={menu} trigger={["click"]}>
                <RiMoreFill
                  size={24}
                  onClick={(e) => e.preventDefault()}
                  className="da-text-color-dark-0"
                />
              </Dropdown>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          {yieldFarmingResults.map((result) => (
            <YieldFarmingItem data={result} />
          ))}
        </Col>
      </Row>
    </Card>
  );
});
