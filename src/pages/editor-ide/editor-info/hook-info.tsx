import { Button, Card, Col, Row } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditorSandbox } from "../editor-sandbox";

export const HookInfo: React.FC = () => {
  const listTitle = "da-p1-body";
  const listResult =
    "da-mt-sm-4 da-p1-body da-text-color-black-100 da-text-color-dark-0";

  return (
    <Row align="middle" justify="space-between">
      <Col md={12} span={24}>
        <h3>Hook details</h3>
      </Col>

      <Col md={12} span={24} className="da-profile-action-btn da-text-right">
        <Button type="primary" ghost onClick={() => {}}>
          Edit
        </Button>
      </Col>

      <Col span={24} className="da-profile-content-list da-mt-sm-8 da-mt-24">
        <ul>
          <li>
            <span className={listTitle}>Language</span>
            <span className={listResult}>English</span>
          </li>

          <li className="da-mt-18">
            <span className={listTitle}>Date Format</span>
            <span className={listResult}>YYY.d.M</span>
          </li>

          <li className="da-mt-18">
            <span className={listTitle}>Timezone</span>
            <span className={listResult}>Cairo (GMT+3)</span>
          </li>
        </ul>
      </Col>
    </Row>
  );
};
