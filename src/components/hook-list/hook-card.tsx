import { Card, Col, Row } from "antd";
import { NetworkTag } from "components/network-tag/network-tag";
import { NetworkContext, TokenContext } from "components/router/contexts";
import { TokenTag } from "components/token-tag/token-tag";
import React, { ReactNode } from "react";
import { useContext } from "react";
import {
  Hook,
  StakingData,
  TokenBalanceData,
  YieldFarmingData,
} from "../../lib/hook";

export type HookCardProps = {
  hook: Hook;
  actionsRender: (hook: Hook) => ReactNode;
};

export const HookCard: React.FC<HookCardProps> = (props) => {
  const { hook } = props;

  const renderHookCard = () => {
    switch (hook.type) {
      case "token-balance":
        return TokenBalanceCard(props);
      case "staking":
        return StakingCard(props);
      case "yield-farming":
        return FarmingCard(props);
    }
  };

  return (
    <Col xl={8} md={12} xs={24} span={24} style={{ padding: "0px 16px" }}>
      {renderHookCard()}
    </Col>
  );
};

export const TokenBalanceCard: React.FC<HookCardProps> = (props) => {
  const { hook, actionsRender } = props;

  const { getToken } = useContext(TokenContext)!;

  return (
    <Card className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne">
      <Row>
        <Col span={24}>
          <h3 style={{ textAlign: "center" }}>Token Balance</h3>

          <h4 className="da-mb-24">{hook.title}</h4>

          <div
            className="da-mb-24 "
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TokenTag
              token={getToken((hook.data as TokenBalanceData).tokenId)!}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {actionsRender(hook)}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export const StakingCard: React.FC<HookCardProps> = (props) => {
  const { hook, actionsRender } = props;

  const { getNetwork } = useContext(NetworkContext)!;
  const network = getNetwork((hook.data as StakingData).networkId)!;

  const { getToken } = useContext(TokenContext)!;
  const stakedToken = getToken((hook.data as StakingData).stakedTokenId)!;
  const rewardsToken = getToken((hook.data as StakingData).rewardsTokenId)!;

  return (
    <Card className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne">
      <Row>
        <Col span={24}>
          <h3 style={{ textAlign: "center" }}>Staking</h3>
          <div className="da-mb-24 " style={{ display: "flex" }}>
            <NetworkTag networks={[network]} />
          </div>
          <p className="da-mb-4 da-badge-text da-font-weight-400">
            {hook.createdAt.toString()}
          </p>
          <h4 className="da-mb-8">{hook.title}</h4>
          <p className="da-mb-24 da-badge-text da-font-weight-400">
            Last update: {hook.updatedAt.toLocaleString()}
          </p>

          <p
            style={{ textAlign: "center" }}
            className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0"
          >
            Token Staked
          </p>
          <div
            className="da-mb-12"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {<TokenTag token={stakedToken} />}
          </div>

          <p
            style={{ textAlign: "center" }}
            className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0"
          >
            Token Rewarded
          </p>
          <div
            className="da-mb-12"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {<TokenTag token={rewardsToken} />}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {actionsRender(hook)}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export const FarmingCard: React.FC<HookCardProps> = (props) => {
  const { hook, actionsRender } = props;

  const { getNetwork } = useContext(NetworkContext)!;
  const network = getNetwork((hook.data as YieldFarmingData).networkId)!;

  const { getToken } = useContext(TokenContext)!;
  const stakedToken0 = getToken(
    (hook.data as YieldFarmingData).stakedTokenId0
  )!;
  const stakedToken1 = getToken(
    (hook.data as YieldFarmingData).stakedTokenId1
  )!;
  const rewardsToken = getToken(
    (hook.data as YieldFarmingData).rewardsTokenId
  )!;

  return (
    <Card className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne">
      <Row>
        <Col span={24}>
          <h3 style={{ textAlign: "center" }}>Yield Farming</h3>
          <div className="da-mb-24 " style={{ display: "flex" }}>
            <NetworkTag networks={[network]} />
          </div>
          <p className="da-mb-4 da-badge-text da-font-weight-400">
            {hook.createdAt.toString()}
          </p>
          <h4 className="da-mb-8">{hook.title}</h4>
          <p className="da-mb-24 da-badge-text da-font-weight-400">
            Last update: {hook.updatedAt.toLocaleString()}
          </p>

          <p
            style={{ textAlign: "center" }}
            className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0"
          >
            Pair Staked
          </p>
          <div
            className="da-mb-12"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <TokenTag token={stakedToken0} />
            <TokenTag token={stakedToken1} />
          </div>

          <p
            style={{ textAlign: "center" }}
            className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0"
          >
            Token Rewarded
          </p>
          <div
            className="da-mb-12"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {<TokenTag token={rewardsToken} />}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {actionsRender(hook)}
          </div>
        </Col>
      </Row>
    </Card>
  );
};
