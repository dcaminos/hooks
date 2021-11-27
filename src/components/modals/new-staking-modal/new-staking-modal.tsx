import { Button, Col, Form, Input, Modal, Row } from "antd";
import { NetworkPicker } from "components/network-picker/network-picker";
import {
  HookContext,
  UIContext,
  UserContext,
} from "components/router/contexts";
import { Hook, StakingData } from "lib/hook";
import { template } from "lib/sdk/staking/template";
import { NetworkId } from "lib/sdk/network";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ModalType } from "stores/ui-store";

const modalType: ModalType = "new-staking";

export const NewStakingModal: React.FC = observer((props) => {
  const { isNewStakingModalVisible, showModal, hideModal } =
    useContext(UIContext)!;
  const { createHook, action } = useContext(HookContext)!;
  const { user } = useContext(UserContext)!;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");
  const [stakedTokenId, setStakedTokenId] = useState<string | undefined>();
  const [rewardsTokenId, setRewardsTokenId] = useState<string | undefined>();
  const [form] = Form.useForm();

  const onCreateHookAction = async () => {
    if (!user || !stakedTokenId || !rewardsTokenId) {
      return;
    }

    const hook: Hook = {
      id: "",
      type: "staking",
      owner: user.id,
      title: title,
      data: {
        networkId,
        stakedTokenId,
        rewardsTokenId,
      } as StakingData,
      isPublic: false,
      code: template(),
      createdAt: moment(),
      updatedAt: moment(),
      versions: [],
    };

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

        {/*<Form.Item
          label="Tokens"
          name="tokenIds"
          rules={[{ required: true, validator: validateTokens }]}
        >
         
        </Form.Item>*/}
      </Form>
    </Modal>
  );
});
