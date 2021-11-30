import { Avatar, Select, Space } from "antd";
import { TokenContext } from "components/router/contexts";
import { NetworkId } from "lib/sdk/network";
import { Token } from "lib/sdk/token";
import { observer } from "mobx-react-lite";
import { ReactNode, useContext, useEffect, useState } from "react";

export type TokenPickerProps = {
  value: string | undefined;
  onChange: (value: string) => void;
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

  return (
    <Select
      showSearch
      placeholder="Please select "
      value={value}
      onChange={onChange}
      options={options}
      filterOption={filterOption}
    />
  );
});
