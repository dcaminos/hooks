import { Button, Col, Divider, Dropdown, Radio, Row, Switch } from "antd";
import { UIContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { GoSettings } from "react-icons/go";

export const HeaderConfigs: React.FC = observer((props) => {
  const { theme, setTheme } = useContext(UIContext)!;

  const notificationMenu = (
    <div className="da-py-16 da-bg-color-black-0 da-bg-color-dark-100 da-border-color-black-40 da-border-color-dark-80 da-border-radius da-border-1">
      <div className="da-px-16">
        <Row align="middle" justify="space-between">
          <Col className="da-p1-body da-font-weight-500 da-text-color-black-100 da-text-color-dark-10 da-text-color-dark-0 da-mr-64">
            Quick Settings
          </Col>
        </Row>
      </div>

      <Divider className="da-my-16 da-mx-0 da-bg-color-black-40 da-bg-color-dark-80" />

      <div className="da-px-16">
        <Row align="middle" justify="space-between">
          <Col className="da-mr-8 da-p1-body da-font-weight-500 da-text-color-black-100 da-text-color-dark-10 da-text-color-dark-0 da-mr-32">
            Dark Mode
          </Col>
          <Col className="da-mr-0" pull="right">
            <Switch
              checked={theme === "dark"}
              onChange={(value) => setTheme(value ? "dark" : "light")}
            />
          </Col>
        </Row>
      </div>

      <Divider className="da-my-16 da-mx-0 da-bg-color-black-40 da-bg-color-dark-80" />

      <div className="da-px-16">
        <Row align="middle">
          <Col className="da-mr-8 da-p1-body da-font-weight-500 da-text-color-black-100 da-text-color-dark-10 da-text-color-dark-0 da-mr-32">
            Currency
          </Col>
          <Col className="da-mr-0" pull="right">
            <Radio.Group
              options={[
                { label: "USD", value: "usd" },
                { label: "EUR", value: "eur" },
                { label: "BTC", value: "btc" },
              ]}
              size="small"
              onChange={() => {}}
              value={"usd"}
              optionType="button"
              buttonStyle="solid"
            />
          </Col>
        </Row>
      </div>
    </div>
  );

  return (
    <Col className="da-d-flex-center da-mr-sm-12 da-mr-16">
      <Button
        type="text"
        icon={
          <Dropdown overlay={notificationMenu} placement="bottomRight">
            <div className="da-position-relative">
              <GoSettings size={20} color="#b2bec3" />
            </div>
          </Dropdown>
        }
      />
    </Col>
  );
});
