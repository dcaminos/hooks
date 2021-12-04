import { Avatar, Space } from "antd";
import BigNumber from "bignumber.js";
import { Hook, TokenBalanceData } from "lib/hook";
import { UserWallet } from "lib/user";
import { Network } from "../network";
import { Token } from "../token";
import { TokenBalanceRequest } from "./token-balance-request";
import { TokenBalanceResponse } from "./token-balance-response";

export type TokenBalanceResult = {
  hook: Hook;
  wallet: UserWallet;
  request: TokenBalanceRequest;
  response: TokenBalanceResponse | undefined;
};

export class TokenBalanceFactory {
  static fromDashboard = (
    hook: Hook,
    tokens: Token[],
    walletAddress: string
  ): TokenBalanceRequest => {
    const token = tokens.find(
      (t) => t.id === (hook.data as TokenBalanceData).tokenId
    );
    if (!token) {
      throw new Error(
        `No token ${(hook.data as TokenBalanceData).tokenId} found`
      );
    }

    return new TokenBalanceRequest({ walletAddress, token });
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
    data: TokenBalanceResult,
    positionValue: BigNumber,
    networks: Network[]
  ) => {
    if (!data.response) {
      return undefined;
    }

    const token = data.response.token;
    const balances: any[] = [];
    data.response.balances.forEach((value, networkId) => {
      const network = networks.find((n) => n.id === networkId)!;
      if (network && value && !value.isZero()) {
        balances.push({
          key: `${token.id}-${networkId}`,
          field: (
            <Space>
              <Avatar shape="square" src={network.image} size={20} />{" "}
              {network.name}
            </Space>
          ),
          value:
            value.toFormat() +
            "   $ (" +
            value.times(token.price ?? 0).toFormat(2) +
            ")",
        });
      }
    });

    return [
      {
        key: 1,
        field: "Hook",
        value: <strong>{data.hook.title}</strong>,
        children: [
          {
            key: 10,
            field: "Type",
            value: "Token Balance Hook",
          },
          {
            key: 11,
            field: "Token",
            value: (
              <Space>
                <Avatar shape="square" src={token.image} size={20} />{" "}
                {token.name} {token.symbol.toUpperCase()}{" "}
                <strong>
                  {"$ "}
                  {token.price?.toFormat(2)}
                </strong>
              </Space>
            ),
          },
          {
            key: 12,
            field: "Created at",
            value: data.hook.createdAt.toString(),
          },
          {
            key: 13,
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
        children: balances,
      },
      {
        key: 5,
        field: "Position Value",
        value: <strong>$ {positionValue.toFormat(2)}</strong>,
      },
    ];
  };
}
