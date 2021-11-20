import { Button, Input, Space, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent, ReactNode, useContext, useEffect } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { EditorContext } from "../../../utils/contexts";
import { ConsoleTab } from "./console-tab";
import { ErrorsTab } from "./errors-tab";

export const IdeBottomPanel: React.FC = observer((props) => {
  const {
    currentHook,
    errors,
    runTest,
    testingAddress,
    setTestingAddress,
    runningTest,
  } = useContext(EditorContext)!;

  useEffect(() => {
    const value = localStorage.getItem(`${currentHook?.id}-testing-address`);
    if (value !== null) {
      setTestingAddress(value);
    }
  }, [setTestingAddress, currentHook?.id]);

  const onWalletAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(
      `${currentHook?.id}-testing-address`,
      event.target.value
    );
    setTestingAddress(event.target.value);
  };

  const extraContent = (
    <Space className="da-mr-16">
      <Input
        size="small"
        placeholder="Wallet address"
        style={{ width: 400 }}
        value={testingAddress}
        onChange={onWalletAddressChange}
      />
      <Button
        type="primary"
        size="small"
        disabled={errors.length > 0 || testingAddress.length < 15}
        onClick={runTest}
        loading={runningTest}
      >
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
          <ConsoleTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Preview" key="2"></Tabs.TabPane>
        <Tabs.TabPane tab={errorTabTitle} key="3">
          <ErrorsTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
});
