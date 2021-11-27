import { Button, Col, Form, Input, Modal, Row } from "antd";
import { TokenPicker } from "components/token-picker.tsx/token-picker";
import { Hook, TokenBalanceData } from "lib/hook";
import { template } from "lib/sdk/token-balance/template";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ModalType } from "stores/ui-store";
import {
  HookContext,
  UIContext,
  UserContext,
} from "components/router/contexts";
import moment from "moment";

const modalType: ModalType = "new-token-balance";

export const NewTokenBalanceModal: React.FC = observer((props) => {
  const { isNewTokenBalanceModalVisible, showModal, hideModal } =
    useContext(UIContext)!;
  const { createHook, action } = useContext(HookContext)!;
  const { user } = useContext(UserContext)!;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [tokenId, setTokenId] = useState<string | undefined>();
  const [form] = Form.useForm();

  const onCreateHookAction = async () => {
    if (!user || !tokenId) {
      return;
    }

    const hook: Hook = {
      id: "",
      type: "token-balance",
      owner: user.id,
      title: title,
      data: {
        tokenId,
      } as TokenBalanceData,
      isPublic: false,
      code: template(tokenId),
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

        <Form.Item
          label="Token"
          name="token"
          rules={[
            {
              required: true,
              message: "Please select a token for your hook",
            },
          ]}
        >
          <TokenPicker value={tokenId} onChange={setTokenId} />
        </Form.Item>
      </Form>
    </Modal>
  );
});
