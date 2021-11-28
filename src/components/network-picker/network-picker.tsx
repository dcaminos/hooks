import { Avatar, Select, Space } from "antd";
import { NetworkContext } from "components/router/contexts";
import { NetworkId } from "lib/sdk/network";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const { Option } = Select;

export type NetworkPickerProps = {
  value?: NetworkId | undefined;
  onChange?: (networkId: NetworkId) => void;
};

export const defaultNetworkSelected: NetworkId = "ethereum";

export const NetworkPicker: React.FC<NetworkPickerProps> = observer((props) => {
  const { value, onChange } = props;
  const { networks } = useContext(NetworkContext)!;

  return (
    <Select
      defaultValue={defaultNetworkSelected}
      value={value}
      onChange={onChange}
    >
      {networks.map((network) => {
        return (
          <Option key={`network-item-${network.id}`} value={network.id}>
            <Space align="center">
              <Avatar src={network.image} size={20} />
              {network.name}
            </Space>
          </Option>
        );
      })}
    </Select>
  );
});
