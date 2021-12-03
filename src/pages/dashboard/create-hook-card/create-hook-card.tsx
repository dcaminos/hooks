import React, { useContext } from "react";

import { Card, Row, Col, Button } from "antd";

import cardImg from "assets/images/dasboard/analytics-payment-bg.svg";
import cardImgDark from "assets/images/dasboard/analytics-payment-bg-dark.png";
import { observer } from "mobx-react-lite";
import { UIContext } from "components/router/contexts";

export const CreateHookCard: React.FC = observer((props) => {
  const { theme, showModal } = useContext(UIContext)!;

  return (
    <Card
      className="da-border-color-black-40 da-card-1 da-upgradePlanCardOne da-upgradePlanCardOne-bg"
      style={{
        backgroundImage: `url(${theme === "dark" ? cardImgDark : cardImg})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <Row align="middle" className="da-mt-8">
        <Col span={24} className="da-mb-4">
          <Row align="middle" justify="space-between">
            <Col flex="1">
              <h4 className="da-mb-8">
                Do you know you can create your own Hook?
              </h4>

              <p className="da-p1-body da-mb-0">
                You just need a smart contract address and write a small code...
              </p>
            </Col>

            <Button
              className="da-float-right da-mt-xs-16 da-text-color-primary-1 da-bg-dark-primary-1 da-border-color-dark-primary-1 da-text-color-dark-0"
              onClick={() => showModal("new-hook")}
            >
              Create Hook
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
});
