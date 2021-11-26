import { Avatar, Tag } from "antd";
import { Network } from "lib/sdk/network";

export type NetworkTagProps = {
  className?: string;
  networks: Network[];
  closable?: boolean;
  onClose?: () => void;
};

export const NetworkTag: React.FC<NetworkTagProps> = (props) => {
  const { className, networks, closable, onClose } = props;

  const network = networks[0];
  return (
    <Tag
      style={{
        height: 32,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0px 8px 0px 4px",
      }}
      className={className}
      icon={<Avatar shape="square" size={24} src={network.image} />}
      color="blue"
      closable={closable}
      onClose={onClose}
    >
      <div className="da-ml-8">{network.name}</div>
    </Tag>
  );
};
