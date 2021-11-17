import { Avatar, Tag } from "antd";
import { Network } from "../../lib/network";

export type NetworkTagProps = {
  className?: string;
  network: Network;
};

export const NetworkTag: React.FC<NetworkTagProps> = (props) => {
  const { className, network } = props;

  return (
    <Tag
      style={{
        height: 32,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      className={className}
      icon={<Avatar size={25} src={network.image} />}
      color="blue"
    >
      {network.name}
    </Tag>
  );
};
