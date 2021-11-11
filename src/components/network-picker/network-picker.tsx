import { Avatar, Select, Space } from "antd";
import { networks } from "../../lib/config/networks";
import { NetworkId } from "../../lib/network";

const { Option } = Select;

export type NetworkPickerProps = {
  value: NetworkId;
  onNetworkSelected: (networkId: NetworkId) => void;
};

export const defaultNetworkSelected: NetworkId = "ethereum";

export const NetworkPicker: React.FC<NetworkPickerProps> = (props) => {
  const { value, onNetworkSelected } = props;

  return (
    <Select
      defaultValue={defaultNetworkSelected}
      value={value}
      onChange={onNetworkSelected}
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
};
