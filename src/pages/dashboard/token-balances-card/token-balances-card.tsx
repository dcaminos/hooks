import { Avatar, Card, Checkbox, Col, Dropdown, Menu, Row, Space } from "antd";
import BigNumber from "bignumber.js";
import { DashboardContext, UIContext } from "components/router/contexts";
import { NetworkId } from "lib/sdk/network";
import { Token } from "lib/sdk/token";
import { TokenBalanceResponse } from "lib/sdk/token-balance/token-balance-response";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RiMoreFill } from "react-icons/ri";

export const TokenBalancesCard: React.FC = observer((props) => {
  const { tokenBalanceResults } = useContext(DashboardContext)!;
  const { hideZeroBalance, setHideZeroBalance } = useContext(UIContext)!;

  const balances: Map<string, BigNumber> = new Map<string, BigNumber>();
  const tokens: Map<string, Token> = new Map<string, Token>();
  let total = new BigNumber(0);
  tokenBalanceResults.forEach((tbr) => {
    if (tbr.response !== undefined) {
      const response = tbr.response as TokenBalanceResponse;
      response.balances.forEach((value: BigNumber, networkId: NetworkId) => {
        if (value) {
          const prev = balances.get(response.token.id) ?? new BigNumber(0);
          balances.set(response.token.id, prev.plus(value));
          tokens.set(response.token.id, response.token);
          total = total.plus(
            value.times(response.token.price ?? new BigNumber(0))
          );
        }
      });
    }
  });

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
              <h5 className="da-mb-32">Token Balances</h5>
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
          {Array.from(balances.keys()).map((k) => {
            const token = tokens.get(k)!;
            const balance = balances.get(k)!;
            if (balance.isZero() && hideZeroBalance) {
              return null;
            }
            return (
              <Row
                key={`token-balance-row-${k}`}
                align="middle"
                justify="space-between"
                className="da-mt-16"
              >
                <Col flex="0.9">
                  <Row align="middle">
                    <Col flex="1">
                      <Space align="center">
                        <Avatar shape="square" src={token.image} size={40} />
                        <Space direction="vertical" size={0}>
                          {token.symbol.toUpperCase()}
                          <p className="da-p1-body da-text-color-black-60 da-mb-0">
                            {token.name}
                          </p>
                        </Space>
                      </Space>
                    </Col>
                  </Row>
                </Col>

                <Space direction="vertical" size={0} align="end">
                  <p className="da-p1-body da-text-size-12 da-text-color-black-60 da-mb-0">
                    {balance.toFormat(8)}
                  </p>
                  <h5 className="">
                    $
                    {balance.times(token.price ?? new BigNumber(0)).toFormat(2)}
                  </h5>
                </Space>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Card>
  );
});
