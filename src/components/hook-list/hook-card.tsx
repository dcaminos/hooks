//import { searchProduct, priceFilter } from '../../../../redux/ecommerce/ecommerceActions';
import { Card, Col, Row } from "antd";
import React, { ReactNode } from "react";
import { Hook } from "../../lib/hook";

export type HookCardProps = {
  hook: Hook;
  actionsRender: (hook: Hook) => ReactNode;
};

export const HookCard: React.FC<HookCardProps> = (props) => {
  const { hook, actionsRender } = props;

  return (
    <Col xl={6} md={12} xs={24} span={24} style={{ padding: "0px 16px" }}>
      <Card className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne">
        <Row>
          <Col span={24}>
            {/*<div className="da-mb-24 " style={{ display: "flex" }}>
              {hookNetworks.length > 0 && (
                <NetworkTag networks={hookNetworks} />
              )}
              </div>*/}

            <p className="da-mb-4 da-badge-text da-font-weight-400">
              {hook.createdAt.toString()}
            </p>
            <h4 className="da-mb-4">{hook.title}</h4>

            <p className="da-mb-24 da-badge-text da-font-weight-400">
              Last update: {hook.updatedAt.toLocaleString()}
            </p>

            <p
              style={{ textAlign: "center" }}
              className="da-badge-text da-mb-8 da-text-color-black-100 da-text-color-dark-0"
            >
              Tokens
            </p>
            <div
              className="da-mb-24"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            ></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {actionsRender(hook)}
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
