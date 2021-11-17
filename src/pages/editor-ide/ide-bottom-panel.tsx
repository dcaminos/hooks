import { Button, Input, Space, Tabs } from "antd";
import SplitPane, { Pane } from "react-split-pane";
import "./editor-ide.css";
import { EditorSandbox } from "./editor-sandbox";

export const IdeBottomPanel: React.FC = () => {
  const extraContent = (
    <Space className="da-mr-16">
      <Input size="small" placeholder="Wallet address" style={{ width: 400 }} />
      <Button type="primary" size="small" disabled={false} onClick={() => {}}>
        Run Test
      </Button>
    </Space>
  );
  return (
    <div
      style={{
        backgroundColor: "#F0F2F4",
      }}
    >
      <Tabs
        className="run-test-flexible"
        defaultActiveKey="1"
        size="small"
        style={{ height: "100%" }}
        tabBarStyle={{ marginBottom: 0, marginLeft: 16 }}
        tabBarExtraContent={extraContent}
      >
        <Tabs.TabPane
          tab="Console"
          key="1"
          style={{ height: "100%", backgroundColor: "white", padding: 5 }}
        >
          {`> Starting hook test...`}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Preview"
          key="2"
          style={{ height: "100%", backgroundColor: "white", padding: 5 }}
        >
          Content of card tab 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
