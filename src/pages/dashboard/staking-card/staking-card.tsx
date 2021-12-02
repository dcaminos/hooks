import { Avatar, Card, Checkbox, Col, Dropdown, Menu, Row, Space } from "antd";
import BigNumber from "bignumber.js";
import { DashboardContext, UIContext } from "components/router/contexts";
import { NetworkId } from "lib/sdk/network";
import { Token } from "lib/sdk/token";
import { TokenBalanceResponse } from "lib/sdk/token-balance/token-balance-response";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RiMoreFill } from "react-icons/ri";

export const StakingCard: React.FC = observer((props) => {
  const { stakingResults } = useContext(DashboardContext)!;
  const { hideZeroBalance, setHideZeroBalance } = useContext(UIContext)!;

  const balances: Map<string, BigNumber> = new Map<string, BigNumber>();
  const tokens: Map<string, Token> = new Map<string, Token>();
  let total = new BigNumber(0);

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
              <h5 className="da-mb-32">Staking</h5>
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
          <Space
            className="da-w-100"
            align="baseline"
            style={{ justifyContent: "center" }}
          >
            <h2 className="">${total.toFormat(2)}</h2>
            <p className="da-p1-body da-text-color-black-60 da-text-color-dark-50 da-ml-2">
              USD
            </p>
          </Space>
        </Col>

        <Col span={24}>
          <Checkbox
            checked={hideZeroBalance}
            onChange={(e) => setHideZeroBalance(e.target.checked)}
          >
            Hide zero balances
          </Checkbox>
          {stakingResults.map((result) => {})}
        </Col>
      </Row>
    </Card>
  );
});
