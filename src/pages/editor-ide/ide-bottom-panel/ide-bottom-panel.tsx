import { Button, Input, Space, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import { ReactNode, useContext } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { EditorContext } from "../../../utils/contexts";
import { ErrorsTab } from "./errors-tab";

export const IdeBottomPanel: React.FC = observer((props) => {
  const { errors } = useContext(EditorContext)!;

  const extraContent = (
    <Space className="da-mr-16">
      <Input size="small" placeholder="Wallet address" style={{ width: 400 }} />
      <Button type="primary" size="small" disabled={false} onClick={() => {}}>
        Run Test
      </Button>
    </Space>
  );

  let errorTabTitle: string | ReactNode = "Errors";
  if (errors.length !== 0) {
    errorTabTitle = (
      <>
        Errors ({errors.length})
        <RiErrorWarningFill
          className="da-ml-8 da-text-color-danger-1"
          type="error"
        />
      </>
    );
  }
  return (
    <div
      style={{
        height: "100%",
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
        <Tabs.TabPane tab="Console" key="1">
          {`> Starting hook test...`}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Preview" key="2">
          Content of card tab 2
        </Tabs.TabPane>
        <Tabs.TabPane tab={errorTabTitle} key="3">
          <ErrorsTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
});
