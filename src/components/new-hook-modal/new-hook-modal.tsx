import { Button, Col, Form, Input, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { HookContext, UIContext } from "../../contexts";
import { NetworkId } from "../../lib/network";
import { ModalType } from "../../stores/ui-store";
import { NetworkPicker } from "../network-picker/network-picker";
import { TokenPicker } from "../token-picker.tsx/token-picker";

const modalType: ModalType = "new-hook";
export type NewHookModalProps = {};

export const NewHookModal: React.FC<NewHookModalProps> = observer((props) => {
  const { isNewHookModalVisible, hideModal } = useContext(UIContext)!;
  const { createNewHook } = useContext(HookContext)!;
  const [title, setTitle] = useState<string>("");
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [form] = Form.useForm();

  const onCreateHook = async () => {
    const hookId = await createNewHook(title, networkId, tokenIds);
    console.log(hookId);
    hideModal(modalType);
  };

  const validateTokens = async () => {
    if (tokenIds.length < 1) {
      throw new Error(
        "At least one token should be used to interact with the smart contract, e.g: staked token"
      );
    }
  };

  const modalHeader = (
    <>
      <h4>New Hook</h4>
      <p className="da-p1-body" style={{ margin: 0 }}>
        Connect with a smart contract and fetch data to see it in our dashboard.
      </p>
    </>
  );

  const modalFooter = (
    <Row gutter={[8, 8]} justify="end">
      <Col>
        <Button type="primary" htmlType="submit" onClick={form.submit}>
          Create Hook
        </Button>
      </Col>
    </Row>
  );

  return (
    <Modal
      title={modalHeader}
      destroyOnClose={true}
      width={1000}
      visible={isNewHookModalVisible}
      onCancel={() => hideModal(modalType)}
      footer={modalFooter}
      closeIcon={
        <RiCloseFill
          className="remix-icon da-text-color-black-100 da-text-color-dark-0"
          size={24}
        />
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="new-hook-form"
        onFinish={onCreateHook}
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
