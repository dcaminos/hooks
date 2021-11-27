import { Avatar, Select, Space } from "antd";
import { TokenContext } from "components/router/contexts";
import { TokenTag } from "components/token-tag/token-tag";
import { NetworkId } from "lib/sdk/network";
import { Token } from "lib/sdk/token";
import { observer } from "mobx-react-lite";
import { ReactNode, useContext, useEffect, useState } from "react";

export type TokenPickerProps = {
  value: string | undefined;
  onChange: (tokenId: string) => void;
  networkId?: NetworkId;
};

type TokenPickerItem = {
  value: string;
  label: ReactNode;
  token: Token;
};

export const TokenPicker: React.FC<TokenPickerProps> = observer((props) => {
  const { getTokensPerNetwork } = useContext(TokenContext)!;
  const { value, networkId, onChange } = props;
  const [options, setOptions] = useState<TokenPickerItem[]>([]);

  useEffect(() => {
    setOptions(
      getTokensPerNetwork(networkId).map<TokenPickerItem>((token) => ({
        value: token.id,
        label: (
          <Space align="center">
            <Avatar shape="square" src={token.image} size={20} />
            {`${token.symbol.toUpperCase()} - ${token.name}`}
          </Space>
        ),
        token,
      }))
    );
  }, [setOptions, getTokensPerNetwork, onChange, networkId]);

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
      placeholder="Please select "
      value={value}
      tagRender={tagRender}
      onChange={onChange}
      options={options}
      filterOption={filterOption}
      maxTagCount={"responsive"}
    />
  );
});
