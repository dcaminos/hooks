import { Avatar, Col, Row, Select, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { ReactNode, useContext, useEffect, useState } from "react";
import { NetworkId } from "../../lib/network";
import { TokenContext } from "../../contexts";
import { CustomTagProps } from "rc-select/lib/interface/generator";

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
        //label: ,
        label: (
          <Row align="middle">
            <Col>
              <Avatar src={token.image} size={20} />
            </Col>
            <Col style={{ marginLeft: 10 }}>
              {" "}
              {`${token.symbol.toUpperCase()} - ${token.name}`}
            </Col>
          </Row>
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
    console.log(props);
    const { label, closable, onClose } = props;

    /*const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };*/

    return (
      <Tag
        //onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
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
    />
  );
});
