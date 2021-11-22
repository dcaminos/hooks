import { Button, Card, Input, Row } from "antd"
import { Form } from "antd";
import { TokenPicker } from "components/token-picker.tsx/token-picker";
import { NetworkId } from "lib/network";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "utils/contexts";

export const TokensTab: React.FC = () => {
  const [networkId, setNetworkId] = useState<NetworkId>("ethereum");
  const [tokenIds, setTokenIds] = useState<string[]>([]);

  const [form] = Form.useForm();

  const {fetchingUser} = useContext(UserContext)!;

  const { setTokens, user } = useContext(UserContext)!;

  const validateTokens = async () => {
    if (tokenIds.length < 1) {
      throw new Error(
        "At least one token should be used to interact with the smart contract, e.g: staked token"
      );
    }
  };

  if (user && tokenIds.length === 0) {
    setTokenIds(user.tokenIds)
  }

  const onSubmit = async (tokenIds: string[] ) => {
    await setTokens(tokenIds);
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
            values={tokenIds}
            networkId={networkId}
            onTokensChange={setTokenIds}
          />
        </Form.Item>
        
        <Form.Item>
          <Button loading={fetchingUser} type="primary" htmlType="submit" className="da-mr-sm-8 da-mr-16" onClick={() => onSubmit(tokenIds)} >
            Save
          </Button>
        </Form.Item>
      
      </Form>
    </Card>
  )
}