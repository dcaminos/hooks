import React from "react";

import { Row, Col, Divider, Form, Input, Button } from "antd";

export const PasswordProfile: React.FC = () => {
  const dividerClass = "da-border-color-black-40 da-border-color-dark-80";

  return (
    <Row>
      <Col span={24}>
        <h2>Change Password</h2>
        <p className="da-p1-body da-mb-0">
          Set a unique password to protect your account.
        </p>

        <Divider className={dividerClass} />
      </Col>

      <Col xxl={5} xl={10} md={15} span={24}>
        <Form layout="vertical" name="basic">
          <Form.Item
            label={
              <span className="da-input-label da-text-color-black-100 da-text-color-dark-0">
                Old Password :
              </span>
            }
            name="old-password"
          >
            <Input placeholder="Placeholder text" />
          </Form.Item>

          <Form.Item
            label={
              <span className="da-input-label da-text-color-black-100 da-text-color-dark-0">
                Old Password :
              </span>
            }
            name="new-password"
          >
            <Input placeholder="Placeholder text" />
          </Form.Item>

          <Form.Item
            label={
              <span className="da-input-label da-text-color-black-100 da-text-color-dark-0">
                Confirm New Password :
              </span>
            }
            name="confirm-new-password"
          >
            <Input placeholder="Placeholder text" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
