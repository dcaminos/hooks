import { Button, Col, Form, Input, Modal, Row } from "antd";
import { NetworkPicker } from "components/network-picker/network-picker";
import { TokenPicker } from "components/token-picker.tsx/token-picker";
import { Hook } from "lib/hook";
import { template } from "lib/sdk/hooks/staking/staking";
import { NetworkId } from "lib/sdk/network";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ModalType } from "stores/ui-store";
import { HookContext, UIContext, UserContext } from "utils/contexts";

const modalType: ModalType = "new-staking";

export const NewStakingModal: React.FC = observer((props) => {
  const { isNewStakingModalVisible, showModal, hideModal } =
    useContext(UIContext)!;
  const { createHook, action } = useContext(HookContext)!;
  const { user } = useContext(UserContext)!;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setTokenIds([]);
  }, [networkId]);

  const onCreateHookAction = async () => {
    if (!user) {
      return;
    }

    const hook = new Hook({
      id: "",
      type: "staking",
      owner: user.id,
      title: title,
      networkIds: [networkId],
      tokenIds: tokenIds,
      isPublic: false,
      code: template(),
      createdAt: new Date(),
      updatedAt: new Date(),
      versions: [],
    });

    const hookId = await createHook(hook);
    hideModal(modalType);
    history.push(`/editor/${hookId}`);
  };

  const validateTokens = async () => {
    if (tokenIds.length < 1) {
      throw new Error(
        "At least one token should be used to interact with the smart contract, e.g: staked token"
      );
    }
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
      title={<h4 className="da-m-0">Craete Staking Hook</h4>}
      destroyOnClose={true}
      width={800}
      visible={isNewStakingModalVisible}
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
              message: "Please set a title for this hook!",
              validateTrigger: "onSubmit",
            },
            {
              min: 10,
              message: "Please, set a more descriptive title",
              validateTrigger: "onSubmit",
            },
          ]}
        >
          <Input
            placeholder="E.g: PancakeSwap ETH-CAKE pool"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Network"
          name="networkId"
          rules={[{ required: true, validator: async () => {} }]}
        >
          <NetworkPicker value={networkId} onNetworkSelected={setNetworkId} />
        </Form.Item>

        <Form.Item
          label="Tokens"
          name="tokenIds"
          rules={[{ required: true, validator: validateTokens }]}
        >
          <TokenPicker
            values={tokenIds}
            networkId={networkId}
            onTokensChange={setTokenIds}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
