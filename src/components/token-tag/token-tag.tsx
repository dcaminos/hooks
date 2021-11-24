import { Avatar, Tag } from "antd";
import { Token } from "lib/token";

export type TokenTagProps = {
  className?: string;
  token: Token;
  closable?: boolean;
  onClose?: () => void;
};

export const TokenTag: React.FC<TokenTagProps> = (props) => {
  const { className, token, closable, onClose } = props;

  return (
    <Tag
      style={{
        height: 32,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0px 8px 0px 4px",
        marginTop: "2px",
        marginBottom: "2px",
      }}
      className={className}
      icon={<Avatar shape="square" size={24} src={token.image} />}
      color="magenta"
      closable={closable}
      onClose={onClose}
    >
      <div className="da-ml-8">{token.name}</div>
    </Tag>
  );
};
