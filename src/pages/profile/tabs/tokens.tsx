import { Button, Card, Input, Row } from "antd"
import { Form } from "antd";
import { TokenPicker } from "components/token-picker.tsx/token-picker";
import { NetworkId } from "lib/network";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "utils/contexts";

export const TokensTab: React.FC = observer( () => {
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");

  const [form] = Form.useForm();

  const {loading} = useContext(UserContext)!;

  const { setTokens, user, updateUser } = useContext(UserContext)!;

  if (!user) return null;

  const validateTokens = async () => {
    if (user.tokenIds.length < 1) {
      throw new Error(
        "At least one token should be used to interact with the smart contract, e.g: staked token"
      );
    }
  };

  const onSubmit = async (tokenIds: string[] ) => {
    updateUser(user);
  };

  return (
    <Card>
      <h2>Tokens</h2>
      <p>Select your preferred tokens</p>
      <Form
        form={form}
        layout="vertical"
        name="tokens-form"
        onFinish={() => {}}
      >
        <Form.Item
          label="Tokens"
          name="tokenIds"
          rules={[{ required: true, validator: validateTokens }]}
        >
          <TokenPicker
            values={user.tokenIds}
            networkId={networkId}
            onTokensChange={setTokens}
          />
        </Form.Item>
        
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="da-mr-sm-8 da-mr-16" onClick={() => onSubmit(user.tokenIds)} >
            Save
          </Button>
        </Form.Item>
      
      </Form>
    </Card>
  )
});