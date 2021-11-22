//import { searchProduct, priceFilter } from '../../../../redux/ecommerce/ecommerceActions';
import { Button, Card, Col, Row } from "antd";
import React from "react";
import { networks } from "../../lib/config/networks";
import { tokens } from "../../lib/config/tokens";
import { Hook } from "../../lib/hook";
import { NetworkTag } from "../network-tag/network-tag";
import { TokenTag } from "../token-tag/token-tag";
import { HookListAction } from "./hook-list";

export type HookCardProps = {
  hook: Hook;
  actions?: HookListAction[];
};

export const HookCard: React.FC<HookCardProps> = (props) => {
  const { hook, actions } = props;

  const network = networks.find((n) => n.id === hook.networkId);
  const tokenTags = hook.tokenIds
    .map((tid) => tokens.find((t) => t.id === tid))
    .map((t) => t && <TokenTag key={`token-tag-${t.id}`} token={t} />);

  return (
    <Col xl={6} md={12} xs={24} span={24} style={{ padding: "0px 16px" }}>
      <Card className="da-border-color-black-40 da-mb-32 da-eCommerceCardOne">
        <Row>
          <Col span={24}>
            <div className="da-mb-24 " style={{ display: "flex" }}>
              {network && <NetworkTag network={network} />}
            </div>

            <p className="da-mb-4 da-badge-text da-font-weight-400">
              {hook.createdAt.toDateString()}
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
              style={{ display: "flex", justifyContent: "center" }}
            >
              {tokenTags}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {actions &&
                actions.length > 0 &&
                actions.map((action, index) => (
                  <Button
                    key={`hook-action-${hook.id}-${index}`}
                    className="da-mt-8"
                    type="primary"
                    style={{ width: `calc(${100 / actions.length}% - 8px)` }}
                    icon={action.icon}
                    onClick={() => action.onClick(hook.id)}
                  >
                    {action.label}
                  </Button>
                ))}
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
