import { Card, Col, Row } from "antd";
import { NetworkTag } from "components/network-tag/network-tag";
import { NetworkContext, TokenContext } from "components/router/contexts";
import { TokenTag } from "components/token-tag/token-tag";
import React, { ReactNode, useContext } from "react";
import { Hook, StakingData, TokenBalanceData, YieldFarmingData } from "../../lib/hook";

export type HookRowProps = {
  hook: Hook;
  actionsRender: (hook: Hook) => ReactNode;
};

export const HookRow: React.FC<HookRowProps> = (props) => {
  const { hook } = props;

  const renderHookRow = () => {
    switch (hook.type) {
      case "token-balance":
        return TokenBalanceHookRow(props)
      case "staking":
        return StakingHookRow(props)
      case "yield-farming":
        return YieldFarmingHookRow(props)
    } 
  }

  return (
    <Col xl={24} md={24} xs={24} span={24} style={{ padding: "0px 16px" }}>
      {renderHookRow()}
    </Col>
  );
};

export const TokenBalanceHookRow: React.FC<HookRowProps> = (props) => {
  const { hook, actionsRender } = props;

    const { getToken } = useContext(TokenContext)!;


  return (
    <Card
      className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne"
      bodyStyle={{ padding: "8px 24px" }}>
      <Row justify="space-between" align="middle">
        <Col span={10}>
          <h5 className="da-mb-4">
            {hook.title}
            <span
              style={{
                display: "inline-block",
                marginLeft: "8px",
                verticalAlign: "sub",
              }}></span>
          </h5>
        </Col>
        <Col span={10} className="da-pt-8">
                   <div className="da-mb-24 " style={{ display: "flex", justifyContent: 'center' }}>
            <TokenTag token={ getToken( (hook.data as TokenBalanceData).tokenId)! } />
          </div>
        </Col>
        <Col span={4}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {actionsRender(hook)}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export const StakingHookRow: React.FC<HookRowProps> = (props) => {
  const { hook, actionsRender } = props;

  const { getNetwork } = useContext(NetworkContext)!;
  const network = getNetwork( (hook.data as StakingData).networkId )!;

  const { getToken } = useContext(TokenContext)!;
  const stakedToken = getToken((hook.data as StakingData).stakedTokenId)!;
  const rewardsToken = getToken((hook.data as StakingData).rewardsTokenId)!;

  return (
    <Card
      className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne"
      bodyStyle={{ padding: "8px 24px" }}>

      <Row>
        <Col span={24}>
          <Row align="middle">
            <Col span={10}>
              <h3 style={{textAlign: 'center'}}>Staking</h3>
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
            </Col>
            <Col span={10}>

              <p style={{ textAlign: "center" }} className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0">
                  Token Staked
              </p>
              <div className="da-mb-12" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {<TokenTag token={stakedToken} />}
              </div>

              <p style={{ textAlign: "center" }} className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0">
                  Token Rewarded
              </p>
              <div className="da-mb-12" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {<TokenTag token={rewardsToken} />}
              </div>
            </Col>
            <Col span={4}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {actionsRender(hook)}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export const YieldFarmingHookRow: React.FC<HookRowProps> = (props) => {
  const { hook, actionsRender } = props;

  const { getNetwork } = useContext(NetworkContext)!;
  const network = getNetwork( (hook.data as YieldFarmingData).networkId )!;

  const { getToken } = useContext(TokenContext)!;
  const stakedToken0 = getToken( (hook.data as YieldFarmingData).stakedTokenId0)!
  const stakedToken1 = getToken( (hook.data as YieldFarmingData).stakedTokenId1)!
  const rewardsToken = getToken( (hook.data as YieldFarmingData).rewardsTokenId)!

  return (
    <Card
      className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne"
      bodyStyle={{ padding: "8px 24px" }}>

      <Row>
        <Col span={24}>
          <Row align="middle">
            <Col span={10}>
              <h3 style={{textAlign: 'center'}}>Yield Farming</h3>
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
            </Col>

            <Col span={10}>
              <p style={{ textAlign: "center" }} className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0">
                  Pair Staked
              </p>
              <div className="da-mb-12" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                <TokenTag token={stakedToken0} /> 
                <TokenTag token={stakedToken1} />
              </div>

              <p style={{ textAlign: "center" }} className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0">
                  Token Rewarded
              </p>
              <div className="da-mb-12" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {<TokenTag token={rewardsToken} />}
              </div>

            </Col>
            <Col span={4}>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {actionsRender(hook)}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </Card>
  );
};
