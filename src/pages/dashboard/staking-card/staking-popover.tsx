import { Avatar, Popover, Space, Table } from "antd";
import BigNumber from "bignumber.js";
import { StakingResult } from "lib/sdk/staking/factory";
import { observer } from "mobx-react-lite";
import React from "react";
import "./staking-card.less";

export type StakingPopoverProps = {
  data: StakingResult;
  positionValue: BigNumber;
};

export const StakingPopover: React.FC<StakingPopoverProps> = observer(
  (props) => {
    const { children, data, positionValue } = props;

    const columns = [
      {
        title: "Field",
        dataIndex: "field",
        key: "field",

        width: "250px",
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: "400px",
      },
    ];

    if (!data.response) {
      return null;
    }

    const network = data.response.network;
    const stakedToken = data.response.stakedToken;
    const rewardsToken = data.response.rewardsToken;

    const tableData = [
      {
        key: 1,
        field: "Hook",
        value: <strong>{data.hook.title}</strong>,
        children: [
          {
            key: 10,
            field: "Type",
            value: "Yield Farming Hook",
          },
          {
            key: 11,
            field: "Network",
            value: (
              <Space>
                <Avatar shape="square" src={network.image} size={20} />{" "}
                {network.name}
              </Space>
            ),
          },

          {
            key: 12,
            field: "Staked Token",
            value: (
              <Space>
                <Avatar shape="square" src={stakedToken.image} size={20} />{" "}
                {stakedToken.name} {stakedToken.symbol.toUpperCase()}{" "}
                <strong>
                  {"$ "}
                  {stakedToken.price?.toFormat(2)}
                </strong>
              </Space>
            ),
          },
          {
            key: 14,
            field: "Reward Token",
            value: (
              <Space>
                <Avatar shape="square" src={rewardsToken.image} size={20} />{" "}
                {rewardsToken.name} {rewardsToken.symbol.toUpperCase()}{" "}
                <strong>
                  {"$ "}
                  {rewardsToken.price?.toFormat(2)}
                </strong>
              </Space>
            ),
          },
          {
            key: 15,
            field: "Created at",
            value: data.hook.createdAt.toString(),
          },
          {
            key: 16,
            field: "Current version",
            value: (
              <Space>
                {data.hook.versions[0].version} {"-"}{" "}
                {data.hook.versions[0].notes}
              </Space>
            ),
          },
        ],
      },
      {
        key: 2,
        field: "Wallet",
        value: data.wallet.name,
        children: [
          {
            key: 20,
            field: "Type",
            value: "Defi wallet",
          },
          {
            key: 21,
            field: "Address",
            value: data.wallet.address,
          },
        ],
      },
      {
        key: 3,
        field: "Hook Response",
        children: [
          {
            key: 31,
            field: "Farm APR",
            value: (data.response.apr?.toFormat(2) ?? "--.--") + "%",
          },
          {
            key: 32,
            field: "Farm Liquidity",
            value: "$ " + data.response.liquidity?.toFormat(2),
          },
          {
            key: 33,
            field: "Staked token info",
            children: [],
          },
          {
            key: 34,
            field: "Rewards info",
            children: [
              {
                key: 341,
                field: "Rewards per block",
                value: data.response.rewardsPerBlock?.toFormat(),
              },
              {
                key: 342,
                field: "Rewards value",
                value: <>$ {data.response.rewardsToken.price?.toFormat(2)}</>,
              },
              {
                key: 343,
                field: "Pending rewards",
                value: (
                  <>
                    {data.response.rewardPending.toFormat()}{" "}
                    <strong>
                      (${" "}
                      {data.response.rewardsToken.price
                        ?.times(data.response.rewardPending)
                        ?.toFormat(2)}
                      )
                    </strong>
                  </>
                ),
              },
              {
                key: 345,
                field: "Taken rewards",
                value: (
                  <>
                    {data.response.rewardTaken?.toFormat()}{" "}
                    <strong>
                      (${" "}
                      {data.response.rewardsToken.price
                        ?.times(data.response.rewardTaken ?? 0)
                        ?.toFormat(2)}
                      )
                    </strong>
                  </>
                ),
              },
            ],
          },
        ],
      },
      {
        key: 5,
        field: "Position Value",
        value: <strong>$ {positionValue.toFormat(2)}</strong>,
      },
    ];

    return (
      <Popover
        placement="left"
        overlayClassName="staking-popover"
        content={
          <Table
            showHeader={false}
            columns={columns}
            dataSource={tableData}
            pagination={false}
          />
        }
        trigger="click"
      >
        {children}
      </Popover>
    );
  }
);
