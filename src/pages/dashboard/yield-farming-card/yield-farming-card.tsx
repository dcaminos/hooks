import { Card, Col, Dropdown, Menu, Row } from "antd";
import { DashboardContext, UIContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RiMoreFill } from "react-icons/ri";
import { useHistory } from "react-router";
import { YieldFarmingItem } from "./yield-farming-item";

export const YieldFarmingCard: React.FC = observer((props) => {
  const { action, yieldFarmingResults } = useContext(DashboardContext)!;
  const { showModal } = useContext(UIContext)!;
  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item onClick={() => showModal("new-yield-farming")}>
        New Yield Farming Hook
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/profile")}>
        Subscribe to another Hook
      </Menu.Item>
    </Menu>
  );

  return (
    <Card className="da-border-color-black-40" loading={action !== undefined}>
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
