//import { searchProduct, priceFilter } from '../../../../redux/ecommerce/ecommerceActions';
import { Card, Col, Row } from "antd";
import React, { ReactNode } from "react";
import { Hook } from "../../lib/hook";

export type HookCardRowProps = {
  hook: Hook;
  actionsRender: (hook: Hook) => ReactNode;
};

export const HookCardRow: React.FC<HookCardRowProps> = (props) => {
  const { hook, actionsRender } = props;

  return (
    <Col xl={24} md={24} xs={24} span={24} style={{ padding: "0px 16px" }}>
      <Card
        className="da-border-color-black-40 da-mb-16"
        bodyStyle={{ padding: "8px 24px" }}
      >
        <Row justify="space-between" align="middle">
          <Col span={10}>
            <h4 className="da-mb-4">
              {hook.title}
              <span
                style={{
                  display: "inline-block",
                  marginLeft: "8px",
                  verticalAlign: "sub",
                }}
              ></span>
            </h4>
          </Col>
          <Col span={10} className="da-pt-8">
            <p
              style={{ textAlign: "center" }}
              className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0"
            >
              Tokens
            </p>
            <div
              className="da-mb-12"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            ></div>
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {actionsRender(hook)}
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
