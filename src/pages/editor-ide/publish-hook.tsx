import { Button, Card, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import cardImgDark from "../../assets/images/dasboard/analytics-payment-bg-dark.png";
import cardImg from "../../assets/images/dasboard/analytics-payment-bg.svg";
import { UIContext } from "../../utils/contexts";

export const PublishHook: React.FC = observer(() => {
  const { theme } = useContext(UIContext)!;

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
              <h4 className="da-mb-8">Make it public!</h4>

              <p className="da-p1-body da-mb-0">
                by publishing this Hook to all the community
              </p>
            </Col>

            <Button className="da-float-right da-mt-xs-16 da-text-color-primary-1 da-bg-dark-primary-1 da-border-color-dark-primary-1 da-text-color-dark-0">
              Publish Now
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
});
