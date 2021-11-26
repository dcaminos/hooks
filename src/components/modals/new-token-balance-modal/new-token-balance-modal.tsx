import { Avatar, Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { networks } from "lib/config/networks";
import { Hook } from "lib/hook";
import { NetworkId } from "lib/sdk/network";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ModalType } from "stores/ui-store";
import { HookContext, UIContext, UserContext } from "utils/contexts";
import { template } from "lib/sdk/hooks/token-balance/token-balance";

const modalType: ModalType = "new-token-balance";

export const NewTokenBalanceModal: React.FC = observer((props) => {
  const { isNewTokenBalanceModalVisible, showModal, hideModal } =
    useContext(UIContext)!;
  const { createHook, action } = useContext(HookContext)!;
  const { user } = useContext(UserContext)!;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [contracts, setContracts] = useState<Map<NetworkId, string>>(
    new Map<NetworkId, string>()
  );
  const [form] = Form.useForm();

  const onCreateHookAction = async () => {
    if (!user) {
      return;
    }

    const hook = new Hook({
      id: "",
      type: "token-balance",
      owner: user.id,
      title: title,
      networkIds: [],
      tokenIds: [],
      isPublic: false,
      code: template(contracts),
      createdAt: new Date(),
      updatedAt: new Date(),
      versions: [],
    });

    const hookId = await createHook(hook);
    hideModal(modalType);
    history.push(`/editor/${hookId}`);
  };

  const modalFooter = (
    <Row gutter={[8, 8]} justify="end">
      <Col>
        <Button
          type="primary"
          ghost
          loading={action !== undefined}
          onClick={() => {
            hideModal(modalType);
            showModal("new-hook");
          }}
        >
          Back
        </Button>
      </Col>

      <Col>
        <Button
          type="primary"
          htmlType="submit"
          onClick={form.submit}
          loading={action !== undefined}
        >
          Create Hook
        </Button>
      </Col>
    </Row>
  );

  return (
    <Modal
      title={<h4 className="da-m-0">Craete Token Balance Hook</h4>}
      destroyOnClose={true}
      width={800}
      visible={isNewTokenBalanceModalVisible}
      onCancel={() => hideModal(modalType)}
      footer={modalFooter}
      confirmLoading={action !== undefined}
    >
      <Form
        form={form}
        layout="vertical"
        name="new-profile-form"
        onFinish={onCreateHookAction}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please set a title for your hook",
            },
          ]}
        >
          <Input
            placeholder="Token balance: BTC"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Contract addresses" name="contracts">
          <Space className="da-w-100" direction="vertical">
            {networks.map((network) => {
              return (
                <div
                  key={`network-address-${network.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar src={network.image} size={20} />
                  <div className="da-ml-8" style={{ width: 150 }}>
                    {network.name}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <Input
                      placeholder={`0X0123456789ABCDEF0123456789ABCDEF`}
                      value={contracts.get(network.id)}
                      onChange={(e) => {
                        contracts.set(network.id, e.target.value);
                        setContracts(contracts);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
