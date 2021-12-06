import { Button, Card, Col, Row } from "antd";
import cardImgDark from "assets/images/dasboard/analytics-payment-bg-dark.png";
import cardImg from "assets/images/dasboard/analytics-payment-bg.svg";
import BigNumber from "bignumber.js";
import { DashboardContext, UIContext } from "components/router/contexts";
import { NetworkId } from "lib/sdk/network";
import { StakingResponse } from "lib/sdk/staking/staking-response";
import { TokenBalanceResponse } from "lib/sdk/token-balance/token-balance-response";
import { YieldFarmingResponse } from "lib/sdk/yield-farming/yield-farming-response";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RiAddCircleLine, RiSearch2Line } from "react-icons/ri";
import { useHistory } from "react-router";

export const NetWorthCard: React.FC = observer((props) => {
  const { action, results } = useContext(DashboardContext)!;
  const { theme, showModal } = useContext(UIContext)!;
  const history = useHistory();

  let total = new BigNumber(0);
  let claimed = new BigNumber(0);
  let tokenBalance = new BigNumber(0);
  let staking = new BigNumber(0);
  let yieldFarming = new BigNumber(0);
  results.forEach((r) => {
    switch (r.hook.type) {
      case "token-balance":
        const response = r.response as TokenBalanceResponse;
        response.balances.forEach((value: BigNumber, networkId: NetworkId) => {
          if (value) {
            const tokenBalanceValue = value.times(
              response.token.price ?? new BigNumber(0)
            );
            total = total.plus(tokenBalanceValue);
            tokenBalance = tokenBalance.plus(tokenBalanceValue);
          }
        });
        break;
      case "staking":
        const stakingResponse = r.response as StakingResponse;
        const stakingValue = stakingResponse.staked
          .times(stakingResponse.stakedToken.price ?? new BigNumber(0))
          .plus(
            stakingResponse.rewardPending.times(
              stakingResponse.rewardsToken.price ?? new BigNumber(0)
            )
          );
        total = total.plus(stakingValue);
        claimed = claimed.plus(
          stakingResponse.rewardPending.times(
            stakingResponse.rewardsToken.price ?? new BigNumber(0)
          )
        );
        staking = staking.plus(stakingValue);
        break;

      case "yield-farming":
        const yieldFarmingResponse = r.response as YieldFarmingResponse;
        const yieldFarmingValue = yieldFarmingResponse.staked
          .times(yieldFarmingResponse.lpValue ?? new BigNumber(0))
          .plus(
            yieldFarmingResponse.rewardPending.times(
              yieldFarmingResponse.rewardsToken.price ?? new BigNumber(0)
            )
          );
        total = total.plus(yieldFarmingValue);
        claimed = claimed.plus(
          yieldFarmingResponse.rewardPending.times(
            yieldFarmingResponse.rewardsToken.price ?? new BigNumber(0)
          )
        );
        yieldFarming = yieldFarming.plus(yieldFarmingValue);
        break;
      default:
        break;
    }
  });

  return (
    <Card
      className="da-border-color-black-40 da-card-1 da-upgradePlanCardOne da-upgradePlanCardOne-bg"
      style={{
        backgroundImage: `url(${theme === "dark" ? cardImgDark : cardImg})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
      loading={action !== undefined}
    >
      <Row align="middle" className="da-mt-8">
        <Col span={24}>
          <h1 className="da-mb-0 ">{`$ ${total.toFormat(2)}`}</h1>
          <span className="da-mb-16 da-p1-body da-d-block da-text-color-black-60 da-text-color-dark-50">
            NET WORTH
          </span>

          <Row align="bottom">
            <Col span={12}>
              <h2 className="da-mb-0">{`$ ${claimed.toFormat(2)}`}</h2>
              <span className="da-p1-body da-d-block da-text-color-black-60 da-text-color-dark-50">
                TO BE CLAIMED
              </span>
            </Col>
            <Col span={12}>
              <Button
                onClick={() => showModal("new-hook")}
                className="da-float-right da-ml-16 da-mt-32 da-border-color-primary-1 da-bg-color-black-0 da-bg-color-dark-primary-1 da-text-color-primary-1 da-text-color-dark-0"
                icon={
                  <div className="remix-icon">
                    <RiAddCircleLine size={20} />
                  </div>
                }
              >
                Create Hook
              </Button>
              <Button
                onClick={() => history.push("/profile")}
                className="da-float-right da-mt-32 da-border-color-primary-1 da-bg-color-black-0 da-bg-color-dark-primary-1 da-text-color-primary-1 da-text-color-dark-0"
                icon={
                  <div className="remix-icon">
                    <RiSearch2Line size={20} />
                  </div>
                }
              >
                Find Hooks
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
});
