import { Avatar, Select, Space } from "antd";
import { TokenTag } from "components/token-tag/token-tag";
import { Token } from "lib/token";
import { observer } from "mobx-react-lite";
import { ReactNode, useContext, useEffect, useState } from "react";
import { NetworkId } from "../../lib/network";
import { TokenContext } from "../../utils/contexts";

export type TokenPickerProps = {
  values: string[];
  networkId?: NetworkId;
  onTokensChange: (tokenIds: any) => void;
};

type TokenPickerItem = {
  value: string;
  label: ReactNode;
  token: Token;
};

export const TokenPicker: React.FC<TokenPickerProps> = observer((props) => {
  const { getTokensPerNetwork } = useContext(TokenContext)!;
  const { values, networkId, onTokensChange } = props;
  const [options, setOptions] = useState<TokenPickerItem[]>([]);

  useEffect(() => {
    setOptions(
      getTokensPerNetwork(networkId).map<TokenPickerItem>((token) => ({
        value: token.id,
        label: (
          <Space align="center">
            <Avatar src={token.image} size={20} />
            {`${token.symbol.toUpperCase()} - ${token.name}`}
          </Space>
        ),
        token,
      }))
    );
  }, [setOptions, getTokensPerNetwork, onTokensChange, networkId]);

  const filterOption = (input: string, option: any) => {
    const symbol: string = option.token.symbol.toLowerCase();
    const name: string = option.token.name.toLowerCase();
    const contracts: string[] = Object.keys(option.token.contracts).map(
      (k) => option.token.contracts[k as NetworkId]?.toLowerCase() ?? ""
    );
    const search: string = input.toLowerCase();

    return (
      symbol.indexOf(search) >= 0 ||
      name.indexOf(search) >= 0 ||
      contracts.some((c) => c.indexOf(search) >= 0)
    );
  };

  const tagRender = (props: any) => {
    const { value, closable, onClose } = props;
    const option = options.find((o) => o.value === value);
    if (!option) {
      return <></>;
    }
    return (
      <TokenTag token={option.token} closable={closable} onClose={onClose} />
    );
  };

  return (
    <Select
      mode="multiple"
      placeholder="Please select "
      defaultValue={[]}
      value={values}
      tagRender={tagRender}
      onChange={onTokensChange}
      options={options}
      filterOption={filterOption}
      maxTagCount={"responsive"}
    />
  );
});
