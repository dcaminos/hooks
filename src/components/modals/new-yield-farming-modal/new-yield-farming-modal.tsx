import { Button, Col, Form, Input, Modal, Row } from "antd";
import { NetworkPicker } from "components/network-picker/network-picker";
import {
  HookContext,
  UIContext,
  UserContext,
} from "components/router/contexts";
import { TokenPicker } from "components/token-picker.tsx/token-picker";
import { Hook, YieldFarmingData } from "lib/hook";
import { NetworkId } from "lib/sdk/network";
import { template } from "lib/sdk/staking/template";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ModalType } from "stores/ui-store";

const modalType: ModalType = "new-yield-farming";

export const NewYieldFarmingModal: React.FC = observer((props) => {
  const { isNewYieldFarmingModalVisible, showModal, hideModal } =
    useContext(UIContext)!;
  const { createHook, action } = useContext(HookContext)!;
  const { user } = useContext(UserContext)!;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [networkId, setNetworkId] = useState<NetworkId | undefined>();
  const [rewardsTokenId, setRewardsTokenId] = useState<string | undefined>();
  const [stakedTokenId0, setStakedTokenId0] = useState<string | undefined>();
  const [stakedTokenId1, setStakedTokenId1] = useState<string | undefined>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (form.__INTERNAL__.name !== undefined) {
      form.resetFields(["stakedTokenId", "rewardsTokenId"]);
    }
  }, [networkId, form]);

  const onCreateHookAction = async () => {
    if (!user || !stakedTokenId0 || !stakedTokenId1 || !rewardsTokenId) {
      return;
    }

    const hook: Hook = {
      id: "",
      type: "yield-farming",
      owner: user.id,
      title: title,
      data: {
        networkId,
        stakedTokenId0,
        stakedTokenId1,
        rewardsTokenId,
      } as YieldFarmingData,
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
      title={<h4 className="da-m-0">Craete Yield Farming Hook</h4>}
      destroyOnClose={true}
      width={800}
      visible={isNewYieldFarmingModalVisible}
      onCancel={() => hideModal(modalType)}
      footer={modalFooter}
      confirmLoading={action !== undefined}
    >
      <Form
        form={form}
        layout="vertical"
        name="new-profile-form"
        onFinish={onCreateHookAction}
        fields={[
          {
            name: "networkId",
            value: "ethereum",
          },
        ]}
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Network"
              name="networkId"
              rules={[
                {
                  required: true,
                  message: "You need to pick a Network",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <NetworkPicker value={networkId} onChange={setNetworkId} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Rewards Token"
              name="rewardsTokenId"
              rules={[
                {
                  required: true,
                  message: "You need to pick a Token for staking rewards",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <TokenPicker
                value={rewardsTokenId}
                onChange={setRewardsTokenId}
                networkId={networkId}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Staked Token 0"
              name="stakedTokenId0"
              rules={[
                {
                  required: true,
                  message: "You need to pick a Token for staking",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <TokenPicker
                value={stakedTokenId0}
                onChange={setStakedTokenId0}
                networkId={networkId}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Staked Token 1"
              name="stakedTokenId1"
              rules={[
                {
                  required: true,
                  message: "You need to pick a Token for staking",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <TokenPicker
                value={stakedTokenId1}
                onChange={setStakedTokenId1}
                networkId={networkId}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
