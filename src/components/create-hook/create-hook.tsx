import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { RiCodeSSlashLine } from "react-icons/ri";
import { NetworkId } from "../../lib/network";
import { NetworkPicker } from "../network-picker/network-picker";
import { TokenPicker } from "../token-picker.tsx/token-picker";

export const CreateHook: React.FC = (props) => {
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");
  const [tokens, setTokens] = useState<string[]>([]);

  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col className="da-mb-16" lg={12} span={20}>
          <h4>Create a new Hook</h4>
          <p className="da-p1-body">Basic usage example.</p>
        </Col>

        <Col lg={12} span={4} className="da-text-right">
          <Button
            onClick={() => {}}
            type="text"
            icon={<RiCodeSSlashLine className="da-text-color-black-80" />}
          />
        </Col>

        <Col xl={12} xs={24}>
          <Form
            layout="vertical"
            name="form-basic"
            initialValues={{ remember: true }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
          >
            <Form.Item
              label="Network"
              name="network"
              rules={[{ required: true, message: "Please select a netwrok!" }]}
            >
              <NetworkPicker
                value={networkId}
                onNetworkSelected={setNetworkId}
              />
            </Form.Item>

            <Form.Item label="Tokens" name="tokens" rules={[]}>
              <TokenPicker
                values={tokens}
                networkId={networkId}
                onTokensChange={setTokens}
              />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="basic-remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
