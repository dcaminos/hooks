import { Avatar, Button, Col, Row, Space } from "antd";
import BigNumber from "bignumber.js";
import { NetworkId } from "lib/sdk/network";
import { TokenBalanceResult } from "lib/sdk/token-balance/factory";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";
import { TokenBalancePopover } from "./token-balance-popover";

export type TokenBalanceItemProps = {
  data: TokenBalanceResult;
  hideZeroBalance: boolean;
};

export const TokenBalanceItem: React.FC<TokenBalanceItemProps> = (props) => {
  const { data, hideZeroBalance } = props;

  if (data.response === undefined) {
    return null;
  }

  const token = data.response?.token;
  let balance = new BigNumber(0);
  data.response.balances.forEach((value: BigNumber, networkId: NetworkId) => {
    if (value) {
      balance = balance.plus(
        value.times(data.response!.token.price ?? new BigNumber(0))
      );
    }
  });

  if (balance.isZero() && hideZeroBalance) {
    return null;
  }

  return (
    <Row
      key={`token-balance-row-${data.hook.id}`}
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
        <h5 className="da-mb-0 ">
          ${balance.times(token.price ?? new BigNumber(0)).toFormat(2)}
        </h5>
        <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
          {balance.toFormat(8)}
        </p>
      </Space>
      <TokenBalancePopover data={data} positionValue={balance}>
        <Button
          type="text"
          icon={
            <div style={{ marginTop: 3 }}>
              <RiMore2Fill className="da-mt-1" size={20} />
            </div>
          }
          onClick={() => {}}
        />
      </TokenBalancePopover>
    </Row>
  );
};
