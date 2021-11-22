import { Form, FormInstance, Input } from "antd";
import { useState } from "react";
import { NetworkId } from "../../../lib/network";
import { NetworkPicker } from "../../network-picker/network-picker";
import { TokenPicker } from "../../token-picker.tsx/token-picker";

export type NewHookFromProps = {
  form: FormInstance;
  onSubmit: (title: string, networkId: NetworkId, tokenIds: string[]) => void;
};

export const NewHookFrom: React.FC<NewHookFromProps> = (props) => {
  const { form, onSubmit } = props;
  const [title, setTitle] = useState<string>("");
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");
  const [tokenIds, setTokenIds] = useState<string[]>([]);

  const validateTokens = async () => {
    if (tokenIds.length < 1) {
      throw new Error(
        "At least one token should be used to interact with the smart contract, e.g: staked token"
      );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="new-hook-form"
      onFinish={() => onSubmit(title, networkId, tokenIds)}
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
  );
};
