import { Button, Card, Col, Form, Input, Row, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { EditorContext } from "../../utils/contexts";

export const RunTestCard: React.FC = observer(() => {
  const { testingAddress, setTestingAddress, runTest, runningTest } =
    useContext(EditorContext)!;
  const [form] = Form.useForm();
  return (
    <Card
      style={{ display: "flex", flexDirection: "column", flexGrow: 2 }}
      bodyStyle={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Row align="top">
        <Col md={17}>
          <Form form={form} layout="vertical" name="basic" onFinish={runTest}>
            <Form.Item
              name="testingAddress"
              className="da-mb-0"
              rules={[
                { type: "string", validateTrigger: "onSubmit" },
                {
                  required: true,
                  message: "Please input a valir wallet address!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <Input
                placeholder="Wallet adrress"
                value={testingAddress}
                onChange={(e) => setTestingAddress(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Col>

        <Col span={7} className="da-profile-action-btn da-text-right ">
          <Button type="primary" onClick={form.submit} loading={runningTest}>
            Run Test
          </Button>
        </Col>
      </Row>
      <div
        className=""
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Tabs
          className="run-test-flexible da-mt-16"
          defaultActiveKey="1"
          type="card"
          size="small"
          style={{ height: "100%" }}
        >
          <Tabs.TabPane tab="Raw" key="1" style={{ height: "100%" }}>
            Content of card tab 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Preview" key="2" style={{ height: "100%" }}>
            Content of card tab 2
          </Tabs.TabPane>

          <Tabs.TabPane tab="Console" key="3">
            Content of card tab 3
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Card>
  );
});
