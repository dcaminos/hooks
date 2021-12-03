import { Space, Avatar } from "antd";
import BigNumber from "bignumber.js";
import { Hook, YieldFarmingData } from "lib/hook";
import { UserWallet } from "lib/user";
import { Network } from "../network";
import { Token } from "../token";
import { YieldFarmingRequest } from "./yield-farming-request";
import { YieldFarmingResponse } from "./yield-farming-response";

export type YieldFarmingResult = {
  hook: Hook;
  wallet: UserWallet;
  request: YieldFarmingRequest;
  response: YieldFarmingResponse | undefined;
};

export class YieldFarmingFactory {
  static fromDashboard = (
    hook: Hook,
    networks: Network[],
    tokens: Token[],
    walletAddress: string
  ): YieldFarmingRequest => {
    const data = hook.data as YieldFarmingData;
    const network = networks.find((n) => n.id === data.networkId);
    const stakedToken0 = tokens.find((t) => t.id === data.stakedTokenId0);
    const stakedToken1 = tokens.find((t) => t.id === data.stakedTokenId1);
    const rewardsToken = tokens.find((t) => t.id === data.rewardsTokenId);

    if (!network) {
      throw new Error(`No network ${data.networkId} found`);
    }

    if (!stakedToken0) {
      throw new Error(`No stakedToken ${data.stakedTokenId0} found`);
    }

    if (!stakedToken1) {
      throw new Error(`No stakedToken ${data.stakedTokenId1} found`);
    }

    if (!rewardsToken) {
      throw new Error(`No rewardsToken ${data.rewardsTokenId} found`);
    }

    return new YieldFarmingRequest({
      walletAddress,
      network,
      stakedToken0,
      stakedToken1,
      rewardsToken,
    });
  };

  static getPopoverColumns = () => {
    return [
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
  };

  static getPopoverData = (
    data: YieldFarmingResult,
    positionValue: BigNumber
  ) => {
    if (!data.response) {
      return undefined;
    }

    const network = data.response.network;
    const stakedToken0 = data.response.stakedToken0;
    const stakedToken1 = data.response.stakedToken1;
    const rewardsToken = data.response.rewardsToken;

    return [
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
            field: "Staked Token 0",
            value: (
              <Space>
                <Avatar shape="square" src={stakedToken0.image} size={20} />{" "}
                {stakedToken0.name} {stakedToken0.symbol.toUpperCase()}{" "}
                <strong>
                  {"$ "}
                  {stakedToken0.price?.toFormat(2)}
                </strong>
              </Space>
            ),
          },
          {
            key: 13,
            field: "Staked Token 1",
            value: (
              <Space>
                <Avatar shape="square" src={stakedToken1.image} size={20} />{" "}
                {stakedToken1.name} {stakedToken1.symbol.toUpperCase()}{" "}
                <strong>
                  {"$ "}
                  {stakedToken1.price?.toFormat(2)}
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
            field: "LP info",
            children: [
              {
                key: 331,
                field: "Total supply",
                value: data.response.lpTotalSupply?.toFormat() ?? "-.--------",
              },
              {
                key: 332,
                field: "LP Value",
                value: <>$ {data.response.lpValue?.toFormat(2)}</>,
              },
              {
                key: 333,
                field: "Staked",
                value: (
                  <>
                    {data.response.staked.toFormat()}{" "}
                    <strong>
                      (${" "}
                      {data.response.staked
                        .times(data.response.lpValue ?? new BigNumber(0))
                        .toFormat(2)}
                      )
                    </strong>
                  </>
                ),
              },
            ],
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
  };
}
