import { Avatar, Col, Row, Select } from "antd";
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
            <Row align="middle">
              <Col span={4}>
                <Avatar src={network.image} size={20} />
              </Col>
              <Col> {network.name}</Col>
            </Row>
          </Option>
        );
      })}
    </Select>
  );
};
