import { Avatar, Select, Space, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { ReactNode, useContext, useEffect, useState } from "react";
import { NetworkId } from "../../lib/network";
import { TokenContext } from "../../utils/contexts";

export type TokenPickerProps = {
  values: string[];
  networkId: NetworkId;
  onTokensChange: (tokenIds: any) => void;
};

type TokenPickerItem = {
  value: string;
  label: ReactNode;
  symbol: string;
  name: string;
  contract: string;
};

export const TokenPicker: React.FC<TokenPickerProps> = observer((props) => {
  const { getTokensPerNetwork } = useContext(TokenContext)!;
  const { values, networkId, onTokensChange } = props;
  const [tokens, setTokens] = useState<TokenPickerItem[]>([]);
  const [options, setOptions] = useState<TokenPickerItem[]>([]);

  useEffect(() => {
    setOptions(tokens.filter((token) => !values.includes(token.value)));
  }, [setOptions, tokens, values]);

  useEffect(() => {
    setTokens(
      getTokensPerNetwork(networkId).map((token) => ({
        value: token.id,
        label: (
          <Space align="center">
            <Avatar src={token.image} size={20} />
            {`${token.symbol.toUpperCase()} - ${token.name}`}
          </Space>
        ),
        symbol: token.symbol,
        name: token.name.toLocaleLowerCase(),
        contract: token.contracts[networkId] ?? "",
      }))
    );
    onTokensChange([]);
  }, [setTokens, getTokensPerNetwork, onTokensChange, networkId]);

  const filterOption = (input: string, option: any) => {
    const symbol: string = option.symbol ?? "";
    const name: string = option.name ?? "";
    const contract: string = option.contract ?? "";
    const search: string = input.toLocaleLowerCase();

    return (
      symbol.indexOf(search) >= 0 ||
      name.indexOf(search) >= 0 ||
      contract.indexOf(search) >= 0
    );
  };

  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;

    return (
      <Tag
        style={{ display: "flex", alignItems: "center", padding: "3px 8px" }}
        closable={closable}
        onClose={onClose}
      >
        {label}
      </Tag>
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
