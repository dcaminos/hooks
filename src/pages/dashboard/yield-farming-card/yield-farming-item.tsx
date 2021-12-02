import { Avatar, Button, Col, Row, Space } from "antd";
import BigNumber from "bignumber.js";
import { YieldFarmingResult } from "lib/sdk/yield-farming/factory";
import { observer } from "mobx-react-lite";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";
import { YieldFarmingPopover } from "./yield-farming-popover";

export type YieldFarmingItemProps = {
  data: YieldFarmingResult;
};

export const YieldFarmingItem: React.FC<YieldFarmingItemProps> = observer(
  (props) => {
    const { data } = props;

    if (data.response === undefined) {
      return null;
    }

    const total = data.response.staked
      .times(data.response.lpValue ?? new BigNumber(0))
      .plus(
        data.response.rewardPending.times(
          data.response.rewardsToken.price ?? new BigNumber(0)
        )
      );

    return (
      <Row
        key={`yield-farming-item`}
        align="middle"
        justify="space-between"
        className="da-mt-16"
      >
        <Col>
          <Space align="center" style={{ verticalAlign: "middle" }}>
            <Avatar
              shape="square"
              src={data.response.stakedToken0.image}
              size={40}
            />
            <Avatar
              shape="square"
              src={data.response.stakedToken1.image}
              size={40}
            />
            <Space direction="vertical" size={0}>
              <h5 className="da-m-0">
                {data.response.stakedToken0.symbol.toUpperCase()} -{" "}
                {data.response.stakedToken1.symbol.toUpperCase()}
              </h5>
              <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
                {data.response.staked.toFormat(4)} LPs{" "}
                <strong>
                  (${" "}
                  {data.response.staked
                    .times(data.response.lpValue ?? new BigNumber(0))
                    .toFormat(2)}
                  )
                </strong>
              </p>
            </Space>
          </Space>
        </Col>
        <Col>
          <Space align="center" style={{ verticalAlign: "middle" }}>
            <Avatar
              shape="square"
              src={data.response.rewardsToken.image}
              size={40}
            />
            <Space direction="vertical" size={0}>
              <h5 className="da-m-0">
                {data.response.rewardsToken.symbol.toUpperCase()}
              </h5>
              <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
                {data.response.rewardPending.toFormat(4)}{" "}
                {data.response.rewardsToken.symbol}{" "}
                <strong>
                  (${" "}
                  {data.response.rewardPending
                    .times(data.response.rewardsToken.price ?? new BigNumber(0))
                    .toFormat(2)}
                  )
                </strong>
              </p>
            </Space>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical" size={0} className="da-ml-8">
            <p className="da-p1-body da-text-color-dark-0 da-mb-0">
              APR: <strong>{data.response.apr?.toFormat(2) ?? "--.-"}%</strong>
            </p>
            <p className="da-p1-body da-text-color-dark-0 da-mb-0">
              TVL:{" "}
              <strong>
                $ {data.response.liquidity?.toFormat(2) ?? "--.-"}
              </strong>
            </p>
          </Space>
        </Col>

        <Col>
          <Space align="center">
            <h2 className="da-m-0">$ {total.toFormat(2)}</h2>
            <YieldFarmingPopover data={data} positionValue={total}>
              <Button
                type="text"
                icon={
                  <div style={{ marginTop: 3 }}>
                    <RiMore2Fill className="da-mt-1" size={20} />
                  </div>
                }
                onClick={() => {}}
              />
            </YieldFarmingPopover>
          </Space>
        </Col>

        <Col span={24}></Col>
      </Row>
    );
  }
);
