import { Form, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useHistory } from "react-router";
import { HookContext, UIContext, UserContext } from "../../contexts";
import { NetworkId } from "../../lib/network";
import { ModalType } from "../../stores/ui-store";
import { NewHookFrom } from "../new-hook-form/new-hook-form";

const modalType: ModalType = "new-hook";

export const NewHookModal: React.FC = observer((props) => {
  const { user } = useContext(UserContext)!;
  const { isNewHookModalVisible, hideModal } = useContext(UIContext)!;
  const { createNewHook } = useContext(HookContext)!;
  const history = useHistory();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const submit = async (
    title: string,
    networkId: NetworkId,
    tokenIds: string[]
  ) => {
    const loggedUserId = user?.uid;
    if (!loggedUserId) {
      return;
    }
    setConfirmLoading(true);
    const hookId = await createNewHook(
      loggedUserId,
      title,
      networkId,
      tokenIds
    );
    hideModal(modalType);
    setConfirmLoading(false);
    history.push(`/editor/${hookId}`);
  };

  const modalHeader = (
    <>
      <h4>New Hook</h4>
      <p className="da-p1-body" style={{ margin: 0 }}>
        Connect with a smart contract and fetch data to see it in our dashboard.
      </p>
    </>
  );

  const closeIcon = (
    <RiCloseFill
      className="remix-icon da-text-color-black-100 da-text-color-dark-0"
      size={24}
    />
  );

  return (
    <Modal
      title={modalHeader}
      destroyOnClose={true}
      width={800}
      visible={isNewHookModalVisible}
      onCancel={() => hideModal(modalType)}
      okText={"Create Hook"}
      onOk={form.submit}
      closeIcon={closeIcon}
      confirmLoading={confirmLoading}
    >
      <NewHookFrom form={form} onSubmit={submit} />
    </Modal>
  );
});

/*

import { Form, Input, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useHistory } from "react-router";
import { HookContext, UIContext, UserContext } from "../../contexts";
import { NetworkId } from "../../lib/network";
import { ModalType } from "../../stores/ui-store";
import { NetworkPicker } from "../network-picker/network-picker";
import { TokenPicker } from "../token-picker.tsx/token-picker";

const modalType: ModalType = "new-hook";
export type NewHookModalProps = {};

export const NewHookModal: React.FC<NewHookModalProps> = observer((props) => {
  const { user } = useContext(UserContext)!
  const { isNewHookModalVisible, hideModal } = useContext(UIContext)!;
  const { createNewHook } = useContext(HookContext)!;
  const history= useHistory()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [form] = Form.useForm();

  const submit = async () => {
    const loggedUserId = user?.uid
    if(!loggedUserId) {
      return
    }
    setConfirmLoading(true)
    const hookId = await createNewHook(loggedUserId, title, networkId, tokenIds);
    hideModal(modalType);
    setConfirmLoading(false)
    history.push(`/editor/${hookId}`)
  };

  const cancel = async () => {
    setTitle('')
    setNetworkId('ethereum')
    setTokenIds([])
    hideModal(modalType)
  }

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

  return (
    <Modal
      title={modalHeader}
      destroyOnClose={true}
      width={800}
      visible={isNewHookModalVisible}
      onCancel={cancel}
      okText={'Create Hook'}
      onOk={form.submit}
      closeIcon={
        <RiCloseFill
          className="remix-icon da-text-color-black-100 da-text-color-dark-0"
          size={24}
        />
      }
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        layout="vertical"
        name="new-hook-form"
        onFinish={submit}
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

*/
