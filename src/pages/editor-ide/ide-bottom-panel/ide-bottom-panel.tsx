import { Button, Input, Space, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent, ReactNode, useContext, useEffect } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { EditorContext, UIContext } from "components/router/contexts";
import { ConsoleTab } from "./console-tab";
import { ErrorsTab } from "./errors-tab";
import "./ide-bottom-panel.less";

export const IdeBottomPanel: React.FC = observer((props) => {
  const {
    currentHook,
    errors,
    runTest,
    testingAddress,
    setTestingAddress,
    action,
  } = useContext(EditorContext)!;

  const { showModal } = useContext(UIContext)!;
  /*const [ showReleasePropper, setShowReleasePropper ] = useState(true)*/

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

  /*const propperContent =  <Card
  className="da-border-color-black-40 da-card-1 da-upgradePlanCardOne da-upgradePlanCardOne-bg"
  style={{
    backgroundImage: `url(${theme === "dark" ? cardImgDark : cardImg})`,
    backgroundSize: "cover",
    backgroundPosition: "right",
    border: "none",
  }}
>
  <Row align="middle" className=" da-mt-8">
        <Col span={24} className="da-mb-4">
          <Row align="middle" justify="space-between">
            <Col flex="1">
              <h4 className="da-mb-8">
                Don't forget to release your hook
              </h4>

              <p className="da-p1-body da-mb-0">
                After make it work, make it public!
              </p>
            </Col>

            <Button onClick={() => setShowReleasePropper(false)} className="da-ml-32 da-float-right da-mt-xs-16 da-text-color-primary-1 da-bg-dark-primary-1 da-border-color-dark-primary-1 da-text-color-dark-0">
              I understand!
            </Button>
          </Row>
        </Col>
      </Row>
</Card>*/

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
        loading={action === "testing"}
      >
        Run Test
      </Button>
      {/*<Popover
        overlayClassName="release-popover"
        placement="topRight"
        content={propperContent}
        visible={showReleasePropper}
        trigger="click"
      >*/}
      <Button
        className="da-border-none da-bg-secondary-gradient da-border-0"
        type="primary"
        size="small"
        icon={<FiShare className="remix-icon" />}
        disabled={false}
        loading={false}
        onClick={() => showModal("publish-hook")}
      >
        Publish
      </Button>
      {/*</Popover>*/}
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
