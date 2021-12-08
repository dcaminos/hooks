import { Avatar, List, Space, Switch } from "antd";
import { HookIcon } from "components/hook-icon/hook-icon";
import { TokenContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import {
  Hook,
  StakingData,
  TokenBalanceData,
  YieldFarmingData,
} from "../../lib/hook";

export type HookRowProps = {
  hook: Hook;
  subscribed: boolean;
  setSubscription: (hookId: string, value: boolean) => Promise<void>;
};

export const HookRow: React.FC<HookRowProps> = (props) => {
  const { hook, subscribed, setSubscription } = props;
  const [loading, setLoading] = useState(false);

  const onChange = async (value: boolean) => {
    setLoading(true);
    await setSubscription(hook.id, value);
    setLoading(false);
  };

  let body = null;
  switch (hook.type) {
    case "token-balance":
      body = <TokenBalanceBody {...props} />;
      break;
    case "staking":
      body = <StakingBody {...props} />;

      break;
    case "yield-farming":
      body = <YieldFarmingBody {...props} />;
      break;
  }

  return (
    <List.Item
      className="hook-list-item"
      actions={[
        <Switch checked={subscribed} loading={loading} onChange={onChange} />,
      ]}
    >
      {body}
    </List.Item>
  );
};

const TokenBalanceBody: React.FC<HookRowProps> = observer((props) => {
  const { getToken } = useContext(TokenContext)!;
  const { hook } = props;
  const data = hook.data as TokenBalanceData;
  const token = getToken(data.tokenId);

  if (!token) {
    return null;
  }

  return (
    <Space>
      <HookIcon size={40} type={hook.type} />
      <Space direction="vertical" size={0} style={{ width: 400 }}>
        <h5 className="da-m-0">{hook.title}</h5>
        <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
          Token Balance
        </p>
      </Space>

      <Space align="center" style={{ verticalAlign: "middle" }}>
        <Avatar shape="square" src={token.image} size={40} />
        <Space direction="vertical" size={0}>
          <h5 className="da-m-0">{token.symbol.toUpperCase()}</h5>
          <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
            Token
          </p>
        </Space>
      </Space>
    </Space>
  );
});

const StakingBody: React.FC<HookRowProps> = observer((props) => {
  const { getToken } = useContext(TokenContext)!;
  const { hook } = props;
  const data = hook.data as StakingData;
  const stakedToken = getToken(data.stakedTokenId);
  const rewardsToken = getToken(data.rewardsTokenId);

  if (!stakedToken || !rewardsToken) {
    return null;
  }

  return (
    <Space>
      <HookIcon size={40} type={hook.type} />
      <Space direction="vertical" size={0} style={{ width: 400 }}>
        <h5 className="da-m-0">{hook.title}</h5>
        <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
          Staking
        </p>
      </Space>

      <Space align="center" style={{ verticalAlign: "middle", width: 250 }}>
        <Avatar shape="square" src={stakedToken.image} size={40} />
        <Space direction="vertical" size={0}>
          <h5 className="da-m-0">{stakedToken.symbol.toUpperCase()}</h5>
          <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
            Staked Token
          </p>
        </Space>
      </Space>

      <Space align="center" style={{ verticalAlign: "middle" }}>
        <Avatar shape="square" src={rewardsToken.image} size={40} />
        <Space direction="vertical" size={0}>
          <h5 className="da-m-0">{rewardsToken.symbol.toUpperCase()}</h5>
          <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
            Rewards Token
          </p>
        </Space>
      </Space>
    </Space>
  );
});

const YieldFarmingBody: React.FC<HookRowProps> = observer((props) => {
  const { getToken } = useContext(TokenContext)!;
  const { hook } = props;
  const data = hook.data as YieldFarmingData;
  const stakedToken0 = getToken(data.stakedTokenId0);
  const stakedToken1 = getToken(data.stakedTokenId1);
  const rewardsToken = getToken(data.rewardsTokenId);

  if (!stakedToken0 || !stakedToken1 || !rewardsToken) {
    return null;
  }

  return (
    <Space>
      <HookIcon size={40} type={hook.type} />
      <Space direction="vertical" size={0} style={{ width: 400 }}>
        <h5 className="da-m-0">{hook.title}</h5>
        <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
          Yield Farming
        </p>
      </Space>

      <Space align="center" style={{ verticalAlign: "middle", width: 250 }}>
        <Avatar shape="square" src={stakedToken0.image} size={40} />
        <Avatar shape="square" src={stakedToken1.image} size={40} />
        <Space direction="vertical" size={0}>
          <h5 className="da-m-0">
            {stakedToken0.symbol.toUpperCase()} -{" "}
            {stakedToken1.symbol.toUpperCase()}
          </h5>
          <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
            Staked LP
          </p>
        </Space>
      </Space>

      <Space align="center" style={{ verticalAlign: "middle" }}>
        <Avatar shape="square" src={rewardsToken.image} size={40} />
        <Space direction="vertical" size={0}>
          <h5 className="da-m-0">{rewardsToken.symbol.toUpperCase()}</h5>
          <p className="da-mb-0 da-text-color-dark-0 da-caption da-font-weight-400">
            Rewards Token
          </p>
        </Space>
      </Space>
    </Space>
  );
});
