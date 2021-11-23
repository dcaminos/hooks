import { Col, Row, Tabs } from "antd";
import { useState } from "react";
import {
  RiLinksLine,
  RiMoneyDollarCircleLine,
  RiWallet2Line,
} from "react-icons/ri";
import { HooksTab } from "./tabs/hooks";
import { TokensTab } from "./tabs/tokens";
import { WalletsTab } from "./tabs/wallets";

const { TabPane } = Tabs;

export const ProfilePage: React.FC = () => {
  const [currentTab, setTab] = useState("wallets");

  const renderTab = (t: string) => {
    switch (t) {
      case "wallets":
        return <WalletsTab />;
      case "tokens":
        return <TokensTab />;
      case "hooks":
        return <HooksTab />;
    }
  };

  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <h1>Profile</h1>
        <Tabs
          className="da-faq-tabs da-border-radius da-bg-black-0 da-bg-dark-100 da-px-42"
          onChange={setTab}
        >
          <TabPane
            tab={
              <span className="da-d-flex-center">
                <RiWallet2Line
                  className="remix-icon da-text-color-black-80 da-text-color-dark-30"
                  size={20}
                />
                <span className="da-p1-body da-text-color-black-100 da-text-color-dark-0">
                  Wallets
                </span>
              </span>
            }
            key={"wallets"}
          ></TabPane>
          <TabPane
            tab={
              <span className="da-d-flex-center">
                <RiMoneyDollarCircleLine
                  className="remix-icon da-text-color-black-80 da-text-color-dark-30"
                  size={20}
                />
                <span className="da-p1-body da-text-color-black-100 da-text-color-dark-0">
                  Tokens
                </span>
              </span>
            }
            key={"tokens"}
          ></TabPane>
          <TabPane
            tab={
              <span className="da-d-flex-center">
                <RiLinksLine
                  className="remix-icon da-text-color-black-80 da-text-color-dark-30"
                  size={20}
                />
                <span className="da-p1-body da-text-color-black-100 da-text-color-dark-0">
                  Hooks
                </span>
              </span>
            }
            key={"hooks"}
          ></TabPane>
        </Tabs>
      </Col>
      <Col span={24}>{renderTab(currentTab)}</Col>
    </Row>
  );
};
